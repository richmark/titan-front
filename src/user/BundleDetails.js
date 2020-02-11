import React, { useState, useEffect, Fragment } from "react";
import Layout from "../core/Layout";
import ProductCard from "./format/product/ProductCard";
import ProductAdditionalInfo from "./format/product/ProductAdditionalInfo";
import { Redirect, Link } from "react-router-dom";
import { Container, Row, Col, Image, Form, Button, Card } from "react-bootstrap";
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

  const showBundleMain = () => {
    return (
      <Fragment>
        <Container className="border border-black rounded p-5">
          {/* Stack the columns on mobile by making one full-width and the other half-width */}
          <Row>
            <Col xs={6} md={4}>
              {checkIfSoldOut()}
              <Image
                className="border mx-auto"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS"
                rounded
                width="100%"
                height="300px"
              />
            </Col>
            <Col xs={12} md={8}>
              <span>
                <h3>Sample Bundle</h3>
              </span>
              <hr />
              <h4>
                ₱ <span>5000</span>
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
          <Button variant="outline-warning" onClick={runBuyNow}>Buy Now</Button>{" "}
          <Button variant="outline-warning" onClick={addToCart}>Add to Cart</Button>
        </Fragment>
      );
    }
    
  }

  const checkIfSoldOut = () => {
    if (oProduct.stock === 0 || oProduct.sold_out === 'T') {
      return (
        <Fragment>
          <Image 
            src={`${IMAGE_API}/images/others/soldout.png`}
            style={{width: "80px", height: "35px", position: 'absolute', top: '15px', left: '245px'}} 
          />
        </Fragment>
      );
    }
  };

  const runBuyNow = () => {
    if (iStock > 0) {
      setRedirect(true);
    } else {
      alert('Cannot buy product, item is out of stock or item stock is added in cart');
    }
  }

  const showStock = () => {
    return (
      <Fragment>
        <p style={{fontSize: '14px'}}>
          This bundle only has 1 stock/s left
        </p>
      </Fragment>
    );
  }

  const encodeData = (oData) => {
    oData.count = iCount;
    return btoa(JSON.stringify(oData));
  }

  const showDetails = () => {
    return (
      <Fragment>
        <Container className="border border-black rounded p-5 mt-4">
            <h5>Bundled Items</h5>
            <Row className="mt-3 text-center">
                <Col>
                    <Image
                        className="border mx-auto"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS"
                        rounded
                        width="100%"
                        height="150px"
                    />
                    <p>Product Name</p>
                </Col>
                <Col>
                    <Image
                        className="border mx-auto"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS"
                        rounded
                        width="100%"
                        height="150px"
                    />
                    <p>Product Name</p>
                </Col>
                <Col>
                    <Image
                        className="border mx-auto"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS"
                        rounded
                        width="100%"
                        height="150px"
                    />
                    <p>Product Name</p>
                </Col>7
                <Col>
                    <Image
                        className="border mx-auto"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS"
                        rounded
                        width="100%"
                        height="150px"
                    />
                    <p>Product Name</p>
                </Col>
                <Col>
                    <Image
                        className="border mx-auto"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS"
                        rounded
                        width="100%"
                        height="150px"
                    />
                    <p>Product Name</p>
                </Col>
            </Row>
        </Container>
      </Fragment>
    );
  };

  const showRelatedBundle = () => {
    const oStyle = {
        color: 'white', 
        background: `url(${IMAGE_API}/images/others/Button.png) no-repeat 0px 2px`
    }
    return (
    <Fragment>
        <Container className="border border-black rounded p-5 mt-4">
        <div className="category-tab mb-5" style={{background: `url(${IMAGE_API}/images/others/CategoryTab.png) no-repeat 0 -27px`, height: '57px'}}><strong><p className="mb-0 absolute" style={{position: 'relative', top: '16px', left: '16px', fontSize : '20px'}}>Related Bundles</p></strong></div>
            <Container>
                <Row className="mt-2 ml-3 mr-2">
                    <Col sm={{offset:0, span: 12}}>
                        <Row className="mb-2">
                            <Col sm={3} className="pl-0">
                                <Card className="pt-3 ml-3 border-0"  style={{background: 'transparent'}}> 
                                    <Row>
                                        <Col>
                                            <a href="#" className="mx-auto">
                                                <Image 
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS"
                                                    style={{width: "200px", height: "200px"}} 
                                                />
                                            </a>
                                        </Col>
                                    </Row>
                                    <div className="border-bottom border-white mt-2 ml-2 mr-5 boder" style={{width: '180px'}}></div>
                                    <Row className=" mt-2">
                                        <Col>
                                        <button className="default-button  text-center" style={oStyle}>
                                            <p className="ellipsis-button mb-0" style={{color: 'black', fontSize: "12px"}}>Add to Cart</p>
                                            <p className="ellipsis-button mb-0" style={{fontSize: "14px"}}>Product Name</p>
                                            <p className="ellipsis-button mb-0" style={{fontSize: "14px"}}>{`₱ 5000`}</p>
                                        </button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col sm={3} className="pl-0">
                                <Card className="pt-3 ml-3 border-0"  style={{background: 'transparent'}}> 
                                    <Row>
                                        <Col>
                                            <a href="#" className="mx-auto">
                                                <Image 
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS"
                                                    style={{width: "200px", height: "200px"}} 
                                                />
                                            </a>
                                        </Col>
                                    </Row>
                                    <div className="border-bottom border-white mt-2 ml-2 mr-5 boder" style={{width: '180px'}}></div>
                                    <Row className=" mt-2">
                                        <Col>
                                        <button className="default-button  text-center" style={oStyle}>
                                            <p className="ellipsis-button mb-0" style={{color: 'black', fontSize: "12px"}}>Add to Cart</p>
                                            <p className="ellipsis-button mb-0" style={{fontSize: "14px"}}>Product Name</p>
                                            <p className="ellipsis-button mb-0" style={{fontSize: "14px"}}>{`₱ 5000`}</p>
                                        </button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col sm={3} className="pl-0">
                                <Card className="pt-3 ml-3 border-0"  style={{background: 'transparent'}}> 
                                    <Row>
                                        <Col>
                                            <a href="#" className="mx-auto">
                                                <Image 
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS"
                                                    style={{width: "200px", height: "200px"}} 
                                                />
                                            </a>
                                        </Col>
                                    </Row>
                                    <div className="border-bottom border-white mt-2 ml-2 mr-5 boder" style={{width: '180px'}}></div>
                                    <Row className=" mt-2">
                                        <Col>
                                        <button className="default-button  text-center" style={oStyle}>
                                            <p className="ellipsis-button mb-0" style={{color: 'black', fontSize: "12px"}}>Add to Cart</p>
                                            <p className="ellipsis-button mb-0" style={{fontSize: "14px"}}>Product Name</p>
                                            <p className="ellipsis-button mb-0" style={{fontSize: "14px"}}>{`₱ 5000`}</p>
                                        </button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col sm={3} className="pl-0">
                                <Card className="pt-3 ml-3 border-0"  style={{background: 'transparent'}}> 
                                    <Row>
                                        <Col>
                                            <a href="#" className="mx-auto">
                                                <Image 
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS"
                                                    style={{width: "200px", height: "200px"}} 
                                                />
                                            </a>
                                        </Col>
                                    </Row>
                                    <div className="border-bottom border-white mt-2 ml-2 mr-5 boder" style={{width: '180px'}}></div>
                                    <Row className=" mt-2">
                                        <Col>
                                        <button className="default-button  text-center" style={oStyle}>
                                            <p className="ellipsis-button mb-0" style={{color: 'black', fontSize: "12px"}}>Add to Cart</p>
                                            <p className="ellipsis-button mb-0" style={{fontSize: "14px"}}>Product Name</p>
                                            <p className="ellipsis-button mb-0" style={{fontSize: "14px"}}>{`₱ 5000`}</p>
                                        </button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Container>
    </Fragment>
    );
  };

  const showComment = () => {
    return (
        <Container className="border border-black rounded p-5 mt-4">
          <h5 className="mb-4">Comments</h5>
            <Card className='mb-3'>
            <Card.Body>
                <Card.Title></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                Sample User - Verified Purchase
                <span className="ml-2">
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                </span>
                </Card.Subtitle>
                <Card.Text>
                Sample comment lorem ipsum dolor
                </Card.Text>
            </Card.Body>
            </Card>
        </Container>
    );
  };

  return (
    <Layout run={iRun}>
      {showBundleMain()}
      {showDetails()}
      {showRelatedBundle()}
      {showComment()}
    </Layout>
  );
};

export default ProductDetails;
