import React, { useState, useEffect, Fragment } from "react";
import Layout from "../core/Layout";
import { Container, Row, Col, Image, Form, Button, Card } from "react-bootstrap";
import { IMAGE_API } from "../config";

const AboutUs = () => {

  const showAboutMain = () => {
    return (
      <Fragment>
        <Container className="border border-black rounded p-5">
            <h3>About us</h3>
            <p>
                Tital Supertools Hardware is a company that carries multipe
                brands fot the assortment of the clients to choose from at an
                affordable price
            </p>

            <p><strong>STORE INFORMATION</strong></p>
            <p>273 Rizal Avenue Extension, Caloocan City</p>
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
      {showAboutMain()}
    </Layout>
  );
};

export default AboutUs;
