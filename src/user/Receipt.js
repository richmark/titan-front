import React, { Fragment } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import oMoment from 'moment';

const Receipt = ({order}) => {

    const oBilling = order.billing[0];
    const oShipping = order.shipping[0];

    const showDetails = () => {
        return order && (
            <Container>
                <h2>Titan Supertools - Official Receipt</h2>
                <Card className="mt-2">
                    <Row>
                        <Col sm={{span: 6}}>
                            <Container className="m-2">
                               <strong>Order ID:</strong> <span>{order._id}</span><br/>
                               <strong>Payment Reference:</strong> <span>{order.reference_number}</span><br/>
                               <strong>Date Ordered:</strong> <span>{oMoment(order.createdAt).format('L')}</span>
                            </Container>
                        </Col>
                        <Col sm={{span: 6}}>
                            <Container className="m-2">
                                <strong>Total:</strong> ₱ <span>{order.amount}</span><br/>
                                <strong>Status</strong> <span>{order.status}</span>
                            </Container>
                        </Col>
                    </Row>
                    <hr/>
                    <Container>
                        <Row>
                            <Container>
                                <style>
                                    {`table {
                                        border-collapse: collapse;
                                        width: 80%;
                                    }

                                    td, th {
                                        border: 1px solid #dddddd;
                                        text-align: left;
                                        padding: 8px;
                                    }

                                    tr:nth-child(even) {
                                        background-color: #eeeeee;
                                    }`
                                    }
                                </style>
                                <h5>Ordered Product(s)</h5>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Product Count</th>
                                            <th>Product Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.products.length > 0 && order.products.map((oProduct, iIndex) => {
                                            return (
                                                <tr key={iIndex}>
                                                    <td><strong>{oProduct.product_name}</strong></td>
                                                    <td><strong>Qty:</strong> <span>{oProduct.count}</span></td>
                                                    <td>₱ <span>{oProduct.price * oProduct.count}</span></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </Container>
                        </Row>
                    </Container>
                    <hr/>
                    <Container>
                        <Row>
                            <Container className="m-2">
                                <h5>Billing Details</h5>
                                <strong>Name:</strong> <span>{oBilling.name}</span><br/>
                                <strong>Phone:</strong> <span>{oBilling.contact}</span><br/>
                                <strong>Address:</strong> <span>{oBilling.address}</span>
                            </Container>
                        </Row>
                    </Container>
                    <hr />
                    <Container className="m-2">
                        <Row>
                            <Container>
                                <h5>Shipping Details</h5>
                                <strong>Name:</strong> <span>{oShipping.name}</span><br/>
                                <strong>Phone:</strong> <span>{oShipping.contact}</span><br/>
                                <strong>Address:</strong> <span>{oShipping.address}</span>
                            </Container>
                        </Row>
                    </Container>
                    <hr />
                    <Container>
                        <Row>
                            <Container className="m-2 mb-4">
                                <h5>Payment Summary</h5>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Sub Total</td>
                                            <td>
                                                ₱ {order.discount_fee > 0 ? order.amount - order.shipping_fee + order.discount_fee : order.amount - order.shipping_fee}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Shipping Fee</td>
                                            <td>₱ {order.shipping_fee}</td>
                                        </tr>
                                        {order.discount_fee > 0 && 
                                        <tr>
                                            <td>Discount</td>
                                            <td>
                                                ₱ {order.discount_fee}
                                            </td>
                                        </tr>
                                        }
                                        <tr>
                                            <td>Total (with VAT)</td>
                                            <td>₱ {order.amount}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Container>
                        </Row>
                    </Container>
                </Card>
            </Container>            
        );
    };

	return (
        <Fragment>
            {showDetails()}
        </Fragment>
    );
};

export default Receipt;