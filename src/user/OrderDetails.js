import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { Container, Row, Col, Card, ProgressBar, Table, Image  } from 'react-bootstrap';
import { getOrderById } from '../core/admin/orders/ordersApi';
import { isAuthenticated } from '../auth/authUtil';
import { IMAGE_API } from '../config';

const OrderDetails = ({match}) => {
    const [oOrder, setOrder] = useState(false);
    const [oBilling, setBilling] = useState(false);
    const [oShipping, setShipping] = useState(false);
    const { sToken, user } = isAuthenticated();
    const oProgressBar = {
        'Not Processed' : 5,
        'Processing'    : 33,
        'Shipped'       : 63,
        'Delivered'     : 100
    }

    const init = () => {
        getOrderById(user._id, sToken, match.params.orderId).then((oData) => {
            if (oData.error) {
                console.log(oData.error);
                return;
            }
            const oDetail = oData.data;
            setOrder(oDetail);
            setBilling(oDetail.billing[0]);
            setShipping(oDetail.shipping[0]);
        });
    }

    useEffect(() => {
        init();
    }, []);

    const showReview = (oProduct) => {
        if (oProduct.reviewed === false) {
            return (
                <Fragment>
                    <Link to={`/product/review/${oOrder._id}/${oProduct._id}`}>Write Review</Link>
                </Fragment>
            );
        }
        return <Fragment>Review Submitted</Fragment>
    }

    const showProductRow = (aProduct) => {
        return aProduct.length > 0 && aProduct.map((oProduct, iIndex) => {
            return (
                <Fragment key={iIndex}>
                <tr>
                    <td className="align-middle"><strong>{oProduct.product_name}</strong></td>
                    <td className="align-middle">
                        <Link to={`/product/details/${oProduct._id}`}>
                            <Image src={`${IMAGE_API}/images/products/${oProduct.image}`} rounded style={{height: "100px", width: "100px"}}></Image>
                        </Link>
                    </td>
                    <td className="align-middle"><strong>Qty:</strong> <span>{oProduct.count}</span></td>
                    <td className="align-middle">₱ <span>{oProduct.price * oProduct.count}</span></td>
                    <td className="align-middle">
                        {showReview(oProduct)}
                    </td>
                </tr>
                </Fragment>
            );
        });            
    }

    const showDetails = () => {
        return oOrder && (
            <Container>
                <h2>Order Details</h2>
                <Card className="mt-2">
                    <Row>
                        <Col sm={{span: 6}}>
                            <Container className="m-2">
                               <strong>Order No:</strong> <span>{oOrder._id}</span><br/>
                               <strong>Date Ordered:</strong> <span>{oOrder.createdAt}</span>
                            </Container>
                        </Col>
                        <Col sm={{span: 6}}>
                            <Container className="m-2">
                                <strong>Total:</strong> ₱ <span>{oOrder.amount}</span>
                            </Container>
                        </Col>
                    </Row>
                    <hr/>
                    <Container className="p-5">
                        {/* 
                        Payment = 5,
                        Processing = 33,
                        Shipped = 63,
                        Delivered = 100.
                         */}
                        <ProgressBar variant="warning" now={oProgressBar[oOrder.status]} />
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
                                {showProductRow(oOrder.products)}
                            </tbody>
                        </Table>
                    </Container>
                    <Container>
                        <Row>
                            <Col sm={{span: 6}}>
                                <Container className="m-2">
                                    <h5>Billing Details</h5>
                                    <strong>Name:</strong> <span>{oBilling.name}</span><br/>
                                    <strong>Phone:</strong> <span>{oBilling.contact}</span><br/>
                                    <strong>Address:</strong> <span>{oBilling.address}</span>
                                </Container>
                            </Col>
                            <Col sm={{span: 6}}>
                                <Container className="m-2">
                                    <h5>Shipping Details</h5>
                                    <strong>Name:</strong> <span>{oShipping.name}</span><br/>
                                    <strong>Phone:</strong> <span>{oShipping.contact}</span><br/>
                                    <strong>Address:</strong> <span>{oShipping.address}</span>
                                </Container>
                            </Col>
                            <Col sm={{span: 6}}>
                                <Container className="m-2 mb-4">
                                    <h5>Payment Summary</h5>
                                    <strong>Subtotal</strong> <span className="float-right">₱ <span>{oOrder.amount - oOrder.shipping_fee}</span></span><br/>
                                    <strong>Shipping Fee</strong> <span className="float-right">₱ <span>{oOrder.shipping_fee}</span></span><br/>
                                    <hr/>
                                    <strong>Total (with VAT)</strong> <span className="float-right">₱ <span>{oOrder.amount}</span></span>
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