import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { Container, Row, Col, Card, ProgressBar, Table, Image, Form, Button  } from 'react-bootstrap';
import { IMAGE_API } from '../config';

const ProductReview = () => {

    const showProductReview = () => {
        return (
            <Container className="mt-5">
                <h2>Write Review</h2>
                <Card className="mt-2">
                    <Row>
                        <Col sm={{span: 6}}>
                            <Container className="m-2">
                               <strong>Date Delivered:</strong> <span>08/12/19</span><br/>
                               <strong>Rate and Review Product</strong>
                            </Container>
                        </Col>
                    </Row>
                    <hr/>
                    <Container className="text-center p-5">
                        <div>
                            <Row>
                                <Col className="text-right">
                                    <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS" rounded style={{height: "200px", width: "200px"}}></Image>
                                </Col>
                                <Col className="text-left">
                                    <p style={{position: "relative", top: "50%", transform: "translateY(-50%)"}}>Product Name</p>
                                </Col>
                            </Row> 
                        </div>
                        <div id="rating" class="text-center mt-3">
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                        </div>
                        <div className="mt-4">
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" rows="3" />
                            </Form.Group>
                        </div>
                        <div>
                            <Button variant="warning">Submit Review</Button>
                        </div>
                    </Container>
                </Card>
            </Container>            
        );
    };
    
	return (
        <Layout>
            {showProductReview()}
        </Layout>
    );
};

export default ProductReview;