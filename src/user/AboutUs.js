import React, { useState, useEffect, Fragment } from "react";
import Layout from "../core/Layout";
import { Container, Row, Col, Image, Form, Button, Card } from "react-bootstrap";
import { IMAGE_API } from "../config";

const AboutUs = () => {

  const showAboutMain = () => {
    return (
      <Fragment>
        <Container className="mb-3">
          <Image 
              src={`${IMAGE_API}/images/others/aboutus.jpg`}
              style={{width: '1110px', height: 'auto'}}
          />
        </Container>
      </Fragment>
    );
  };

  return (
    <Layout>
      {showAboutMain()}
    </Layout>
  );
};

export default AboutUs;
