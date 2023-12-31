import React, { useState, useEffect, Fragment } from "react";
import Layout from "../core/Layout";
import ProductCard from "./format/product/ProductCard";
import ProductAdditionalInfo from "./format/product/ProductAdditionalInfo";
import { Redirect, Link } from "react-router-dom";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import { getProduct } from "../core/admin/products/productsApi";
import { getRelatedProduct } from "../core/client/productApi";
import { getCategory } from "../core/admin/categories/categoriesApi";
import { IMAGE_API } from "../config";
import { addItem, getTotalCount, getProductCount } from '../core/client/cartHelpers';
import CommentCard from "./format/comment/CommentCard";

const ProductDetails = ({match}) => {
  const [iRun, setRun] = useState(getTotalCount());
  const [previewImage, setPreviewImage] = useState('');
  const [bBundle, setRedirectBundle] = useState(false);
  const [oRelatedProducts, setRelatedProducts] = useState([]);
  const [oProduct, setProduct] = useState({
    image : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS",
    additional_images: false,
    product_name: "My Product",
    _id: match.params.productId,
    price: '',
    description: ''
  });

  const [oInfo, setInfo] = useState([]);

  const [oCategory, setCategory] = useState({
    _id : '',
    name: ''
  });
  const [iCount, setCount] = useState(1);

  const [bProduct, setBoolProduct] = useState(true);
  
  const { image, additional_images, product_name, price, description, _id, discount_sale, display_sale } = oProduct;

  // Product Stock and Redirect
  const [iStock, setStock] = useState(false);
  const [bRedirect, setRedirect] = useState(false);

  const addToCart = () => {
    var oCount = getProductCount(oProduct._id, oProduct.stock);
    if (oCount.bCount === false) {
        alert('Cannot add product, item is out of stock or item stock is added in cart');
        return;
    }
    setStock(iStock - iCount < 0 ? 0 : iStock - iCount);
    addItem(oProduct, iCount, () => {
      alert('Item added!');
      setRun(getTotalCount())
    });
  };

  const init = () => {
    getProduct(match.params.productId).then(oData => {
      if (oData.error) {
        console.log(oData.error);
        setBoolProduct(false);
      } else if (oData.data.bundle_product && oData.data.bundle_product.length > 0) {
        setTimeout(() => setRedirectBundle(true), 250);
      } else {
        oData = oData.data;
        setInfo(oData.additional_info);
        setProduct({
          ...oProduct,
          image : `${IMAGE_API}/images/products/${oData.image}`,
          additional_images: oData.additional_images && oData.additional_images.map(sImage => `${IMAGE_API}/images/products/${sImage}`) || false,
          product_name: oData.product_name,
          price: oData.price,
          description: oData.description,
          stock: oData.stock,
          sold_out : oData.sold_out,
          display: oData.display,
          delivery_price: oData.delivery_price,
          discount_sale: oData.discount_sale,
          display_sale: oData.display_sale
        });
        calculateCartStock(oData._id, oData.stock);
        setPreviewImage(`${IMAGE_API}/images/products/${oData.image}`);
        oData.category && fetchCategory(oData.category);
        }
    });
  };

  const calculateCartStock = (sProductId, iValue) => {
    var oCount = getProductCount(sProductId, iValue);
    var iCart = iValue - (oCount.iCount === undefined ? 0 : oCount.iCount);
    setStock(iCart < 0 ? 0 : iCart);
  }

  const fetchCategory = sId => {
    getCategory(sId).then(oData => {
      if (oData.error) {
        console.log(oData.error);
      } else {
        setCategory({
          _id : oData.data._id,
          name: oData.data.name
        });
        fetchRelatedProducts();
      }
    });
  };

  const fetchRelatedProducts = () => {
    getRelatedProduct(_id).then(oData => {
      if (oData.error) {
        console.log(oData.error);
      } else {
        setRelatedProducts(oData);
      }
    });
  }
  
  useEffect(() => {
    init();
  }, []);

  const handleCount = oEvent => {
    if (oEvent.target.value > iStock) {
      alert(`This product only has ${iStock} stock/s left. Please check your cart`);
      oEvent.target.value = iStock;
      return;
    }
    var iValue = oEvent.target.value < 1 ? 1 : parseInt(oEvent.target.value, 10);
    setCount(iValue);
  };

  const checkProduct = bProduct => {
    if (bProduct === false) {
        return (
            <Redirect to="/forbidden"/>
        );
    }
  };

  /**
   * Redirect to bundle details
   */
  const redirectBundle = () => {
    if (bBundle === true) {
        return (
            <Redirect to={`/bundles/${match.params.productId}`}/>
        );
    }
  };

  const changeImage = sImage => oEvent => {
    setPreviewImage(sImage);
  };

  const setImageList = () => {
    if (additional_images) {
      const aImages = [image, ...additional_images];
      const iLength = aImages.length;
      const aColumn = [];
      aImages.map((sImage, iIndex) => {
        aColumn.push(iLength < 5 ?
          (<Col onMouseEnter={changeImage(sImage)} key={iIndex} xs={3} md={3}><Image className="border mx-auto product-detail-additional" src={sImage} rounded  /></Col>) :
          (<Col onMouseEnter={changeImage(sImage)} key={iIndex}><Image className="border mx-auto product-detail-additional" src={sImage} rounded /></Col>));
      });
      return aColumn;
    }
    return (<Col><Image className="border mx-auto" src={image} rounded width="100%" height="100%" /></Col>);
  };

  const showProductMain = () => {
    return oCategory._id !== '' && (
      <Fragment>
        <Container className="border border-black rounded p-5">
          {/* Stack the columns on mobile by making one full-width and the other half-width */}
          <Row>
            <Col xs={6} lg={5} xl={4}>
              {showSaleFeature()}
              {checkIfSoldOut()}
              <Image
                className="border mx-auto product-detail-image"
                src={previewImage}
                rounded
              />
              <div>
                <Row className="mt-2">
                  {setImageList()}
                </Row>
              </div>
            </Col>
            <Col xs={12} lg={7} xl={8}>
              <span>
                <h3><strong>{product_name}</strong></h3>
              </span>
              <span>
                <h6>
                  Category: <Link to={`/categories/${oCategory._id}`} className="titan-link" style={{textDecoration: 'none'}}>{oCategory.name}</Link>
                </h6>
              </span>
              <hr />
              <h4>
                ₱ <span>{calculateSalePrice(oProduct)}</span>
              </h4>
              {showAddCartButton()}
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  };

  const showAddCartButton = () => {
    if (oProduct.stock === 0 || oProduct.sold_out === 'T') {
      return (
        <Fragment>
          ITEM IS SOLD OUT
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Form className="mt-5">
            <Form.Group as={Row} controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Quantity
              </Form.Label>
              <Col sm="2">
                <Form.Control type="number" value={iCount} onChange={handleCount}/>
              </Col>
              <Form.Label column sm="6">
                {showStock()}
              </Form.Label>
            </Form.Group>
          </Form>
          <hr />
          <Button className='mr-2' style={{fontSize: '1rem',fontWeight : 'bold', color : '#ff6900', cursor: 'pointer', border : '1px solid rgba(0,0,0,.125)', borderRadius : '.25rem', backgroundColor: 'white'}} onClick={runBuyNow}>Buy Now</Button>
          <Button style={{fontSize: '1rem', cursor: 'pointer', border: '1px solid #ff6900', backgroundColor: '#ff6900', borderRadius : '.25rem'}} onClick={addToCart}>Add to Cart</Button>
        </Fragment>
      );
    }
    
  }

  const showSaleFeature = () => {
    if (oProduct.display_sale === 'T' && oProduct.discount_sale > 0) {
      return (
        <Fragment>
          <div className='px-2 py-1 product-detail-sale'
              style={{
                  fontSize: '.6rem',  
                  zIndex : 10,
                  backgroundColor: 'red',
                  color: 'white',
                  borderRadius : '.25rem',
                  fontWeight: 'bold'
              }} 
            >Save {oProduct.discount_sale}%</div>
      </Fragment>
      );
    }
  };

  const checkIfSoldOut = () => {
    if (oProduct.stock === 0 || oProduct.sold_out === 'T') {
      return (
        <Fragment>
          <div className='p-1 product-detail-soldout'
              style={{
                  fontSize: '.6rem',
                  zIndex : 10,
                  backgroundColor: 'black',
                  color: 'white',
                  borderRadius : '.25rem',
                  fontWeight: 'bold'
              }} 
          >Sold Out</div>
      </Fragment>
      );
    }
  };

  /**
   * Calculate Sale Price
   */
  const calculateSalePrice = (oProduct) => {
    if (oProduct.display_sale === 'T' && oProduct.discount_sale !== 0) {
        return (oProduct.price - (oProduct.price * (oProduct.discount_sale / 100))).toFixed(2);
    }
    return parseFloat(oProduct.price, 10).toFixed(2);
  }

  const runBuyNow = () => {
    if (iStock > 0) {
      setRedirect(true);
    } else {
      alert('Cannot buy product, item is out of stock or item stock is added in cart');
    }
  }

  const redirectBuyNow = () => {
    if (bRedirect === true) {
      return (
        <Redirect to={`/checkout?sType=buyNow&id=${encodeData(oProduct)}`}/>
      );
    }
  }

  const showStock = () => {
    return iStock >= 0 && (
      <Fragment>
        <p style={{fontSize: '14px'}}>
          This product only has {iStock} stock/s left
        </p>
      </Fragment>
    );
  }

  const encodeData = (oData) => {
    oData.count = iCount;
    return btoa(JSON.stringify(oData));
  }

  const showAdditionalInfo = () => {
    if (oInfo !== undefined && oInfo.length !== 0) {
      return (
        <Fragment>
          <Container className="border border-black rounded p-5 mt-4">
            <h5>Additional Information</h5>
              {ProductAdditionalInfo(oInfo)}
          </Container>
        </Fragment>
      );
    }
  };

  const showDetails = () => {
    return (
      <Fragment>
        <Container className="border border-black rounded p-5 my-4">
          <h5>{product_name} Details</h5>
          <p>
            {description}
          </p>
        </Container>
      </Fragment>
    );
  };

  const showRelatedProduct = () => {
    if (oRelatedProducts.data && oRelatedProducts.data.length > 0) {
      return (
        <Fragment>
            {ProductCard(oRelatedProducts.data, setRun, 'RELATED PRODUCTS', true)}
        </Fragment>
      );
    }
  };

  return (
    <Layout run={iRun}>
      {showProductMain()}
      {showAdditionalInfo()}
      {showDetails()}
      {showRelatedProduct()}
      {checkProduct(bProduct)}
      {redirectBuyNow()}
      {redirectBundle()}
      {CommentCard(_id)}
    </Layout>
  );
};

export default ProductDetails;
