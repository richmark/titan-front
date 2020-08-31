import React, { useState, useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { Container, Row, Col, Card, ProgressBar, Table, Image  } from 'react-bootstrap';
import { getOrderById } from '../core/admin/orders/ordersApi';
import { isAuthenticated } from '../auth/authUtil';
import { IMAGE_API } from '../config';
import Receipt from './Receipt';
import oMoment from 'moment';

const OrderDetails = ({match}) => {
    const [oOrder, setOrder] = useState(false);
    const [oBilling, setBilling] = useState(false);
    const [oShipping, setShipping] = useState(false);
    const { sToken, user } = isAuthenticated();
    const [bForbidden, setForbidden] = useState(false);
    const oProgressBar = {
        'Not Processed' : 5,
        'Processing'    : 33,
        'Shipped'       : 63,
        'Delivered'     : 100
    }

    const init = () => {
        getOrderById(user._id, sToken, match.params.orderId).then((oData) => {
            if (oData.error || oData.data.user !== user._id) {
                console.log(oData.error);
                setForbidden(true);
                return;
            }
            const oDetail = oData.data;
            setOrder(oDetail);
            setBilling(oDetail.billing[0]);
            setShipping(oDetail.shipping[0]);
        });
    }

    useEffect(() => {
        if (user) {
            init();
        } else {
            setForbidden(true);
        }
    }, []);

    const redirectForbidden = () => {
        if (bForbidden === true) {
            return <Redirect to="/forbidden" />;
        }   
    }

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

    /**
     * Maps order history in order details
     */
    const showOrderHistory = () => {
        return (
            <Container className="p-5">
                <Card className="p-3">
                    <ul>
                        {oOrder.history.map((oHistory, iIndex) => {
                            return (
                                <Fragment key={iIndex}>
                                    <li className="tst-current">[{oMoment(oHistory.process_time).format('MM/DD/YYYY HH:mm')}] - {oHistory.note} {oHistory.status === 'Shipped' ? showShippingLink() : ''}</li>
                                </Fragment>
                            );
                        })} 
                    </ul>
                </Card>
            </Container>
        );
    }

    /**
     * Show Shipper Link
     * If order is "shipped" link of tracking website should be provided
     */
    const showShippingLink = () => {
        return (
            <a href={oOrder.shipper.shipper_website}  target='_blank'>(Tracking Website)</a>
        );
    }

    const showDetails = () => {
        return oOrder && (
            <Container>
                <h2>Order Details</h2>
                <Card className="my-2">
                    <Row>
                        <Col sm={{span: 6}}>
                            <Container className="m-2">
                               <strong>Order ID:</strong> <span>{oOrder._id}</span><br/>
                               <strong>Payment Reference:</strong> <span>{oOrder.reference_number}</span><br/>
                               <strong>Date Ordered:</strong> <span>{oMoment(oOrder.createdAt).format('MM/DD/YYYY HH:mm')}</span>
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
                    <hr/>
                    {showOrderHistory()}
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
                                    {showSubTotal()}
                                    {showDiscount()}
                                    <strong>Shipping Fee</strong> <span className="float-right">₱ <span>{oOrder.shipping_fee}</span></span><br/>
                                    <hr/>
                                    <strong>Total (with VAT)</strong> <span className="float-right">₱ <span>{parseFloat(oOrder.amount, 10).toFixed(2)}</span></span>
                                </Container>
                            </Col>
                            <Col sm={{span: 6}}>
                                <Container className="m-2 mb-4">
                                    <button id='SubmitPrint' onClick={printReceipt}>Print Receipt</button>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </Card>
                <div id='PrintOrder' style={{display: 'none'}}>
                <Receipt order={oOrder}/>
                </div>
            </Container>
        );
    };

    const printReceipt = (oEvent) => {
        oEvent.preventDefault();
        var oRestorePage = window.document.body.innerHTML;
        window.document.getElementById('PrintOrder').style.display = '';
        var oPrintContent = window.document.getElementById('PrintOrder').outerHTML;
        window.document.body.innerHTML = oPrintContent;
        window.print();
        window.document.body.innerHTML = oRestorePage;
        window.document.getElementById('SubmitPrint').addEventListener('click', printReceipt);
    };

    const showSubTotal = () => {
        var oSubTotal = parseFloat(oOrder.amount, 10) - parseFloat(oOrder.shipping_fee, 10) + parseFloat(oOrder.discount_fee, 10);
        return (
            <Fragment>
                <strong>Subtotal</strong> <span className="float-right">₱ <span>{parseFloat(oSubTotal, 10).toFixed(2)}</span></span><br/>
            </Fragment>
        );
    }

    const showDiscount = () => {
        if (oOrder.discount_fee > 0) {
            return (
                <Fragment>
                    <strong>Discount</strong> <span className="float-right">₱ <span>({parseFloat(oOrder.discount_fee).toFixed(2)})</span></span><br/>
                </Fragment>
            );
        }
    }

	return (
        <Layout>
            {showDetails()}
            {redirectForbidden()}
        </Layout>
    );
};

export default OrderDetails;
