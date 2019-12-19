import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../core/Layout';
import { Container, Row, Col, Card, ProgressBar, Table, Image  } from 'react-bootstrap';


const OrderDetails = () => {
    const showDetails = () => {
        return (
            <Container>
                <h2>Order Details</h2>
                <Card className="mt-2">
                    <Row>
                        <Col sm={{span: 6}}>
                            <Container className="m-2">
                               <strong>Order No:</strong> <span>202154321542</span><br/>
                               <strong>Date Ordered:</strong> <span>05/02/19</span>
                            </Container>
                        </Col>
                        <Col sm={{span: 6}}>
                            <Container className="m-2">
                                <strong>Total:</strong> ₱ <span>15,000</span>
                            </Container>
                        </Col>
                    </Row>
                    <hr/>
                    <Container className="p-5">
                        {/* 
                        Payment = 0,
                        Processing = 33,
                        Shipped = 63,
                        Delivered = 100
                         */}
                        <ProgressBar variant="warning" now={63} />
                        <Row>
                            <Col>
                                <Container className="m-2">
                                    <strong className="float-left">Payment</strong>
                                </Container>
                            </Col>
                            <Col>
                                <Container className="m-2">
                                    <strong>Processing</strong>
                                </Container>
                            </Col>
                            <Col>
                                <Container className="m-2">
                                    <strong className="ml-5">Shipped</strong>
                                </Container>
                            </Col>
                            <Col>
                                <Container className="m-2">
                                    <strong className="float-right">Delivered</strong>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                    <Container className="mt-2 mb-4">
                        <Table borderless responsive="sm" className="text-center">
                            <tbody style={{height: "100px"}}>
                                <tr>
                                    <td className="align-middle"><strong>Product Name</strong></td>
                                    <td className="align-middle">
                                        <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS" rounded style={{height: "100px", width: "100px"}}></Image>
                                    </td>
                                    <td className="align-middle"><strong>Qty:</strong> <span>1</span></td>
                                    <td className="align-middle">₱ <span>15,000</span></td>
                                    <td className="align-middle">
                                        <a href="">Write Review</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="align-middle"><strong>Product Name</strong></td>
                                    <td className="align-middle">
                                        <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS" rounded style={{height: "100px", width: "100px"}}></Image>
                                    </td>
                                    <td className="align-middle"><strong>Qty:</strong> <span>1</span></td>
                                    <td className="align-middle">₱ <span>15,000</span></td>
                                    <td className="align-middle">
                                        <a href="">Write Review</a>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Container>
                    <Container>
                        <Row>
                            <Col sm={{span: 6}}>
                                <Container className="m-2">
                                    <h5>Billing Details</h5>
                                    <strong>Name:</strong> <span>Juan Dela Cruz</span><br/>
                                    <strong>E-mail:</strong> <span>juan@gmail.com</span><br/>
                                    <strong>Phone:</strong> <span>09213605548</span><br/>
                                    <strong>Address:</strong> <span>Cubao, Quezon City</span>
                                </Container>
                            </Col>
                            <Col sm={{span: 6}}>
                                <Container className="m-2">
                                    <h5>Shipper Details</h5>
                                    <strong>Name:</strong> <span>Delivery Company</span><br/>
                                    <strong>Address:</strong> <span>Cubao, Quezon City</span><br/>
                                    <strong>Tracking No. :</strong> <span>123456778</span>
                                </Container>
                            </Col>
                            <Col sm={{span: 6}}>
                                <Container className="m-2 mb-4">
                                    <h5>Payment Summary</h5>
                                    <strong>Subtotal</strong> <span className="float-right">₱ <span>15,000</span></span><br/>
                                    <strong>Shipping Fee</strong> <span className="float-right">₱ <span>15,000</span></span><br/>
                                    <hr/>
                                    <strong>Total (with VAT)</strong> <span className="float-right">₱ <span>15,000</span></span>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </Card>
            </Container>            
        );
    };
    
	return (
        <Layout>
            {showDetails()}
        </Layout>
    );
};

export default OrderDetails;