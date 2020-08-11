import React, { useState, useEffect, Fragment } from "react";
import Layout from "../core/Layout";
import { Container, Row, Col, Image, Form, Button, Card } from "react-bootstrap";
import { IMAGE_API } from "../config";

const ContactUs = () => {

  const showContactMain = () => {
    return (
      <Fragment>
        <Container className="border border-black rounded p-5">
            <h3>Contact us</h3>
            <p>
                <i
                className="fas fa-phone-alt"
                style={{ color: "#ffc044" }}
                ></i>{" "}
                (02)285-7337 0916-2927228
            </p>
            <p>
                <i
                className="fas fa-paper-plane"
                style={{ color: "#ffc044" }}
                ></i>{" "}
                sales.tsthardware@gmail.com
            </p>
        </Container>
      </Fragment>
    );
  };

  return (
    <Layout>
      {showContactMain()}
    </Layout>
  );
};

export default ContactUs;
