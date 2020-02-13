import React, { useState, useEffect, Fragment } from "react";
import Layout from "../core/Layout";
import { Container, Row, Col, Image, Form, Button, Card } from "react-bootstrap";
import { IMAGE_API } from "../config";

const AboutUs = () => {

  const showBundleMain = () => {
    return (
      <Fragment>
        <Container className="border border-black rounded p-5">
          <h3>About us</h3>
        </Container>
      </Fragment>
    );
  };

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
    <Layout>
      {showBundleMain()}
      {showDetails()}
      {showRelatedBundle()}
      {showComment()}
    </Layout>
  );
};

export default AboutUs;
