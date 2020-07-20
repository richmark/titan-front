import React, { useState, useEffect, Fragment } from "react";
import Layout from "../../../core/Layout";
import { Redirect, Link } from "react-router-dom";
import { Container, Row, Col, Image, Form, Button, Card } from "react-bootstrap";
import { getBundleById, getRelatedBundle } from "../../../core/admin/bundles/bundlesApi";
import { IMAGE_API } from "../../../config";
import { addItem, getTotalCount, getProductCount } from '../../../core/client/cartHelpers';
import CommentCard from '../comment/CommentCard';
import BundleCard from '../bundle/BundleCard';

const BundleDetails = ({match}) => {
  const [iRun, setRun] = useState(getTotalCount());
  const [relatedBundles, setRelatedBundles] = useState([]);
  const [bundle, setBundle] = useState({
    _id: match.params.bundleId,
    product_name: '',
    stock: '',
    price: '',
    bundle_product: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS'
  });

  const {
    _id,
    product_name,
    stock,
    price,
    bundle_product,
    image
  } = bundle;

  const [iCount, setCount] = useState(1);

  const [bProduct, setBoolProduct] = useState(true);

  // Product Stock and Redirect
  const [iStock, setStock] = useState(false);
  const [bRedirect, setRedirect] = useState(false);

  const getListBundles = () => {
    getRelatedBundle(_id).then(oData => {
      if (oData.error) {
        console.log(oData.error);
      } else {
        setRelatedBundles(oData);
      }
    });
  }

  const redirectBuyNow = () => {
    if (bRedirect === true) {
      return (
        <Redirect to={`/checkout?sType=buyNow&id=${encodeData(bundle)}`}/>
      );
    }
  }

  const addToCart = () => {
    var oCount = getProductCount(_id, stock);
    if (oCount.bCount === false) {
        alert('Cannot add product, item is out of stock or item stock is added in cart');
        return;
    }
    setStock(iStock - iCount < 0 ? 0 : iStock - iCount);
    addItem(bundle, iCount, () => {
      alert('Item added!');
      setRun(getTotalCount())
    });
  };

  const init = () => {
    getBundleById(match.params.bundleId).then(oData => {
      if (oData.error) {
        console.log(oData.error);
        setBoolProduct(false);
      } else {
        var oBundle = oData.data;
        setBundle({
          ...bundle,
          image : `${IMAGE_API}/images/products/${oBundle.image}`,
          product_name: oBundle.product_name,
          price: oBundle.price,
          description: oBundle.description,
          stock: oBundle.stock,
          sold_out : oBundle.sold_out,
          display: oBundle.display,
          bundle_product: oBundle.bundle_product,
          delivery_price: oBundle.delivery_price
        });
        calculateCartStock(oBundle._id, oBundle.stock);
        getListBundles();
      }
    });
  };

  /**
   * Redirects to forbidden if invalid product id
   */
  const checkProduct = bProduct => {
    if (bProduct === false) {
        return (
            <Redirect to="/forbidden"/>
        );
    }
  };

  const calculateCartStock = (sProductId, iValue) => {
    var oCount = getProductCount(sProductId, iValue);
    var iCart = iValue - (oCount.iCount === undefined ? 0 : oCount.iCount);
    setStock(iCart < 0 ? 0 : iCart);
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
    return bundle.image !== '' && (
      <Fragment>
        <Container className="border border-black rounded p-5">
          {/* Stack the columns on mobile by making one full-width and the other half-width */}
          <Row>
            <Col xs={6} md={4}>
              {checkIfSoldOut()}
              <Image
                className="border mx-auto"
                src={image}
                rounded
                width="100%"
                height="300px"
              />
            </Col>
            <Col xs={12} md={8}>
              <span>
                <h3>{product_name}</h3>
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
    if (bundle.stock === 0 || bundle.sold_out === 'T') {
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
    if (bundle.stock === 0 || bundle.sold_out === 'T') {
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
    return iStock >= 0 && (
      <Fragment>
        <p style={{fontSize: '14px'}}>
          This bundle only has {iStock} stock/s left
        </p>
      </Fragment>
    );
  }

  const encodeData = (oData) => {
    oData.count = iCount;
    return btoa(JSON.stringify(oData));
  }

  const showDetails = () => {
    if (bundle_product.length > 0 && bundle_product.length === 5) {
      return (
        <Fragment>
          <Container className="border border-black rounded p-5 mt-4">
              <h5>Bundled Items</h5>
              <Row className="mt-3 text-center">
                {bundle_product.map((oItem, iKey) => {
                  return (
                    <Col key={iKey}>
                      <a href={`/product/details/${oItem.product._id}`}>
                        <Image
                          className="border mx-auto"
                          src={`${IMAGE_API}/images/products/${oItem.product.image}`}
                          rounded
                          width="150px"
                          height="150px"
                        />
                        <p>{oItem.product.product_name}</p>
                      </a>
                    </Col>
                  );
                })}
              </Row>
          </Container>
        </Fragment>
      );
    }

    if (bundle_product.length > 0 && bundle_product.length < 5) {
      return (
        <Fragment>
          <Container className="border border-black rounded p-5 mt-4">
              <h5>Bundled Items</h5>
              <Row className="mt-3 text-center">
                {bundle_product.map((oItem, iKey) => {
                  return (
                    <Col key={iKey} sm={3}>
                      <a href={`/product/details/${oItem.product._id}`}>
                        <Image
                          className="border mx-auto"
                          src={`${IMAGE_API}/images/products/${oItem.product.image}`}
                          rounded
                          width="200px"
                          height="200px"
                        />
                        <p>{oItem.product.product_name}</p>
                      </a>
                    </Col>
                  );
                })}
              </Row>
          </Container>
        </Fragment>
      );
    }
  };

  /**
   * Show Related Bundle
   * Uses Bundle Card
   */
  const showRelatedBundle = () => {
    if (relatedBundles.data && relatedBundles.data.length > 0) {
      return (
        <Fragment>
          <Container className="border border-black rounded p-5 mt-4">
            {BundleCard(relatedBundles)}
          </Container>
        </Fragment>
      );
    }
  };

  /**
   * Show bundle details
   */
  const showBundleDetails = () => {
    return (
      <Fragment>
        <Container className="border border-black rounded p-5 mt-4">
          <h5>{bundle.product_name} Details</h5>
          <p>
            {bundle.description}
          </p>
        </Container>
      </Fragment>
    );
  };

  return (
    <Layout run={iRun}>
      {showBundleMain()}
      {showBundleDetails()}
      {showDetails()}
      {showRelatedBundle()}
      {checkProduct(bProduct)}
      {CommentCard(match.params.bundleId)}
      {redirectBuyNow()}
    </Layout>
  );
};

export default BundleDetails;
