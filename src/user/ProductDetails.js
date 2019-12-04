import React, { useState, useEffect, Fragment } from "react";
import Layout from "../core/Layout";
import ProductCard from "./format/product/ProductCard";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";

const ProductDetails = () => {
  const showProductMain = () => {
    return (
      <Fragment>
        <Container className="border border-black rounded p-5">
          {/* Stack the columns on mobile by making one full-width and the other half-width */}
          <Row>
            <Col xs={6} md={4}>
              <Image
                className="border"
                src="https://titansupertools.com/wp-content/uploads/2019/08/Pipe-Tools.jpg"
                rounded
                width="100%"
                height="300px"
              />
            </Col>
            <Col xs={12} md={8}>
              <span>
                <h3>Pipe Tools</h3>
              </span>
              <span>
                <h6>
                  Category: <a href="">Pipe Tools</a>
                </h6>
              </span>
              <hr />
              <h4>
                ₱ <span>5000</span>
              </h4>
              <Form className="mt-5">
                <Form.Group as={Row} controlId="formPlaintextPassword">
                  <Form.Label column sm="2">
                    Quantity
                  </Form.Label>
                  <Col sm="2">
                    <Form.Control type="number" />
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

  const showDetails = () => {
    return (
      <Fragment>
        <Container className="border border-black rounded p-5 mt-4">
          <h5>Pipe Tools Details</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <Image
            className="border"
            src="https://titansupertools.com/wp-content/uploads/2018/09/YJ-26RH3-WEB-BANNER-Rotary-Hammer-Drill-052519.jpg"
            rounded
            width="100%"
            height="300px"
          />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
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
      {showDetails()}
      {showRelatedProduct()}
    </Layout>
  );
};

export default ProductDetails;
