import React, { useState, useEffect, Fragment } from "react";
import Layout from "../core/Layout";
import ProductCard from "./format/product/ProductCard";
import ProductAdditionalInfo from "./format/product/ProductAdditionalInfo";
import { Redirect, Link } from "react-router-dom";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import { getProduct, getRelatedProduct } from "../core/admin/products/productsApi";
import { getCategory } from "../core/admin/categories/categoriesApi";
import { IMAGE_API } from "../config";
import { addItem, getTotalCount, getProductCount } from '../core/client/cartHelpers';
import CommentCard from "./format/comment/CommentCard";

const ProductDetails = ({match}) => {
  const [iRun, setRun] = useState(getTotalCount());
  const [previewImage, setPreviewImage] = useState('');
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
  
  const { image, additional_images, product_name, price, description, _id } = oProduct;

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
          display: oData.display
        });
        calculateCartStock(oData._id, oData.stock);
        setPreviewImage(`${IMAGE_API}/images/products/${oData.image}`);
        fetchCategory(oData.category);
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
          (<Col onMouseEnter={changeImage(sImage)} key={iIndex} xs={3} md={3}><Image className="border mx-auto" src={sImage} rounded width="100%" height="100%" /></Col>) :
          (<Col onMouseEnter={changeImage(sImage)} key={iIndex}><Image className="border mx-auto" src={sImage} rounded width="100%" height="100%" /></Col>));
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
            <Col xs={6} md={4}>
              <Image
                className="border mx-auto"
                src={previewImage}
                rounded
                width="100%"
                height="300px"
              />
              <div>
                <Row className="mt-2">
                  {setImageList()}
                </Row>
              </div>
            </Col>
            <Col xs={12} md={8}>
              <span>
                <h3>{product_name}</h3>
              </span>
              <span>
                <h6>
                  Category: <Link to={`/categories/${oCategory._id}`}>{oCategory.name}</Link>
                </h6>
              </span>
              <hr />
              <h4>
                ₱ <span>{price}</span>
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
          <Button variant="primary" onClick={runBuyNow}>Buy Now</Button>{" "}
          <Button variant="primary" onClick={addToCart}>Add to Cart</Button>
        </Fragment>
      );
    }
    
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
        <p style={{fontSize: '10px'}}>
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
        <Container className="border border-black rounded p-5 mt-4">
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
          <Container className="border border-black rounded p-5 mt-4">
            <h5>Related Product</h5>
            {ProductCard(oRelatedProducts.data, setRun)}
          </Container>
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
      {CommentCard(_id)}
    </Layout>
  );
};

export default ProductDetails;
