import React, { useState, useEffect, Fragment } from "react";
import Layout from "../core/Layout";
import ProductCard from "./format/product/ProductCard";
import { Redirect, Link } from "react-router-dom";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import { getProduct } from "../core/admin/products/productsApi";
import { getCategory } from "../core/admin/categories/categoriesApi";
import { IMAGE_API } from "../config";

const ProductDetails = ({match}) => {
  
  const [oProduct, setProduct] = useState({
    image : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS",
    product_name: "My Product",
    price: '',
    description: ''
  });

  const [oCategory, setCategory] = useState({
    _id : '',
    name: ''
  });

  const [iCount, setCount] = useState(1);

  const [bProduct, setBoolProduct] = useState(true);

  const init = () => {
    getProduct(match.params.productId).then(oData => {
      if (oData.error) {
        console.log(oData.error);
        setBoolProduct(false);
      } else {
        setProduct({
          image : `${IMAGE_API}/images/products/${oData.image}`,
          product_name: oData.product_name,
          price: oData.price,
          description: oData.description
        });

        fetchCategory(oData.category);
      }
    });
  };

  const fetchCategory = sId => {
    getCategory(sId).then(oData => {
      if (oData.error) {
        console.log(oData.error);
      } else {
        setCategory({
          _id : oData._id,
          name: oData.name
        });
      }
    });
  };
  
  useEffect(() => {
    init();
  }, []);

  const handleCount = oEvent => {
    setCount(oEvent.target.value < 1 ? 1 : oEvent.target.value);
  };

  const checkProduct = bProduct => {
    if (bProduct === false) {
        return (
            <Redirect to="/forbidden"/>
        );
    }
};

  
  const showProductMain = () => {

    return (
      <Fragment>
        <Container className="border border-black rounded p-5">
          {/* Stack the columns on mobile by making one full-width and the other half-width */}
          <Row>
            <Col xs={6} md={4}>
              <Image
                className="border mx-auto"
                src={oProduct.image}
                rounded
                width="100%"
                height="300px"
              />
            </Col>
            <Col xs={12} md={8}>
              <span>
                <h3>{oProduct.product_name}</h3>
              </span>
              <span>
                <h6>
                  Category: <Link to="/">{oCategory.name}</Link>
                </h6>
              </span>
              <hr />
              <h4>
                ₱ <span>{oProduct.price}</span>
              </h4>
              <Form className="mt-5">
                <Form.Group as={Row} controlId="formPlaintextPassword">
                  <Form.Label column sm="2">
                    Quantity
                  </Form.Label>
                  <Col sm="2">
                    <Form.Control type="number" value={iCount} onChange={handleCount}/>
                  </Col>
                </Form.Group>
              </Form>
              <hr />
              <Button variant="primary">Buy Now</Button>{" "}
              <Button variant="primary">Add to Cart</Button>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  };

  const showAdditionalInfo = () => {
    return (
      <Fragment>
        <Container className="border border-black rounded p-5 mt-4">
          <h5>Additional Information</h5>
          <p>
            {oProduct.additional_info}
          </p>
        </Container>
      </Fragment>
    );
  };

  const showDetails = () => {
    return (
      <Fragment>
        <Container className="border border-black rounded p-5 mt-4">
          <h5>{oProduct.product_name} Details</h5>
          <p>
            {oProduct.description}
          </p>
        </Container>
      </Fragment>
    );
  };

  const showRelatedProduct = () => {
    return (
      <Fragment>
        <Container className="border border-black rounded p-5 mt-4">
          <h5>Related Product</h5>
          {ProductCard()}
        </Container>
      </Fragment>
    );
  };

  return (
    <Layout title="ProductDetails" description="Sign up here">
      {showProductMain()}
      {showAdditionalInfo()}
      {showDetails()}
      {showRelatedProduct()}
      {checkProduct(bProduct)}
    </Layout>
  );
};

export default ProductDetails;
