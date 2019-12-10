import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../core/Layout';
import ProductCard from './format/product/ProductCard';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import { getCart } from '../core/client/cartHelpers';


const Checkout = () => {

    const [aProduct, setProduct] = useState([]);

    const init = () => {
        setProduct(getCart());
    };

    useEffect(() => {
        init();
    }, []);

    const singleProduct = (oProduct) => {
        return (
            <div className="border rounded p-4 mb-2">
                <Row>
                    <Col xs={1} md={1} className="align-middle text-center">
                        <i className="fas fa-trash-alt" style={{fontSize:'24px', marginTop:'35px'}}></i>
                    </Col>
                    <Col xs={3} md={3} className="text-center">
                        <Image
                            className="border"
                            src={oProduct.image}
                            rounded
                            width="100px"
                            height="100px"
                        />
                    </Col>
                    <Col xs={6} md={6}>
                        <div className="mt-2">
                        <p>{oProduct.product_name}</p>
                            <div className="float-right font-weight-bold">
                                Qty: <span>{oProduct.count}</span>
                            </div>
                            ₱ <span>{oProduct.price}</span>
                        </div>
                        
                    </Col>
                </Row>
            </div>
        );
    }

    const showProducts = () => {
        return aProduct !== [] && (
            <Fragment>
                {aProduct.map((oProduct, iIndex) => {
                    return (
                        <Fragment key={iIndex}>
                            {singleProduct(oProduct)}                               
                        </Fragment>
                    );
                })}
            </Fragment>
        );
    };

    const showProductMain = () => {
        console.log(aProduct);
        return (
            <Fragment>
                <Container className='rounded p-5'>
                    {/* Stack the columns on mobile by making one full-width and the other half-width */}
                    <Row>
                        <Col xs={12} md={8}>
                            {showProducts()}
                            
                            <div id="product-summary" className="border rounded p-4 mt-2">
                                <Row>
                                    <Col xs={4} md={4}>
                                        <p className="font-weight-bold">Shipping Fee</p>
                                        <p className="font-weight-bold">Total</p>
                                    </Col>
                                    <Col xs={8} md={8} className="text-right">
                                        <p className="font-weight-bold "> ₱ <span>5000</span></p>
                                        <p>VAT included, when applicable <span className="font-weight-bold"> ₱ <span>5000</span></span></p>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col xs={6} md={4} className="border rounded border-left-dark p-4">
                            <h5>Shipping & Billing <span className="float-right"><a href="">Edit</a></span></h5>
                            <div id="basic-info" className="mt-4">
                                <i className="fas fa-map-marker-alt"></i> <span className="font-weight-bold">Juan Dela Cruz</span>
                                <div id="address-info">
                                    <span className="font-weight-light">
                                    6F Suntree, 13 Meralco Avenue Ortigas Center San Antonio, Pasig City, Metro Manila~Pasig
                                    </span>
                                </div>
                            </div>
                            <div id="billing-address" className="mt-2">
                                <span className="font-weight-bold">
                                    <i className="fas fa-sticky-note"></i> Bill to the same address
                                </span>
                            </div>
                            <div id="contact-number" className="mt-2">
                                <span className="font-weight-bold">
                                    <i className="fas fa-phone-alt"></i> 09213609963
                                </span>
                            </div>
                            <div id="email" className="mt-2">
                                <span className="font-weight-bold">
                                    <i className="fas fa-at"></i> juandelacruz@gmail.com
                                </span>
                            </div>

                            <div id="place-order" className="mt-4 text-center">
                                <Button variant="outline-warning" size="lg" block>
                                    Place Order
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    };

    return (
        <Layout title='ProductDetails' description='Sign up here'>
            {showProductMain()}
            {/* {showDetails()}
            {showRelatedProduct()} */}
        </Layout>
    );
};

export default Checkout;
