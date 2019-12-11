import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../core/Layout';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import { getCart, emptyCart } from '../core/client/cartHelpers';
import { Redirect } from 'react-router-dom';
import { getProduct } from '../core/admin/products/productsApi';


const Checkout = () => {

    const [aProduct, setProduct] = useState([]);
    const [bForbidden, setForbidden] = useState(false);
    
    const init = () => {
        setProduct(getCart());
    };

    useEffect(() => {
        init();
    }, []);

    const redirectForbidden = () => {
        if (bForbidden === true) {
            return <Redirect to="/forbidden" />;
        }   
    }

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

    const showTotal = () => {
        var iPrice = 0;
        var iShipFee = 100;
        aProduct.length > 0 && aProduct.map((oProduct, iIndex) => {
            if (oProduct.count <= 0) {
                setProduct([]);
                setForbidden(true);
                emptyCart();
            }
            iPrice += (oProduct.price * oProduct.count);
        });
        
        var iTotal = iPrice + iShipFee;
        return (
            <div className="border rounded p-4 mt-2">
                <Row>
                    <Col xs={4} md={4}>
                        <p className="font-weight-bold">Subtotal</p>
                        <p className="font-weight-bold">Shipping Fee</p>
                        <p className="font-weight-bold">Total</p>
                    </Col>
                    <Col xs={8} md={8} className="text-right">
                        <p className="font-weight-bold "> ₱ <span>{iPrice}</span></p>
                        <p className="font-weight-bold "> ₱ <span>{iShipFee}</span></p>
                        <p>VAT included, when applicable <span className="font-weight-bold"> ₱ <span>{iTotal}</span></span></p>
                    </Col>
                </Row>
            </div>
        );
    }

    const showBilling = () => {
        return (
            <Fragment>
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
            </Fragment>
        );
    }

    const showProductMain = () => {
        console.log(aProduct);
       
        const checkProduct = () => {
            var oDisplay = (aProduct.length === 0) ? displayEmpty() : displayCheckout();
            return (
                <Fragment>
                    {oDisplay}
                </Fragment>
            );
        }

        const displayEmpty = () => {
            return (
                <Fragment>
                    <Col xs={12} className="border rounded border-left-dark p-4">
                        Cart is Empty!
                    </Col>
                </Fragment>
            );
        }

        const displayCheckout = () => {
            return (
                <Fragment>
                    <Col xs={12} md={8}>
                            {showProducts()} 
                            {showTotal()}
                    </Col>
                    <Col xs={6} md={4} className="border rounded border-left-dark p-4">
                        {showBilling()}
                    </Col>
                </Fragment>
            );
        }

        return (
            <Fragment>
                <Container className='rounded p-5'>
                    <Row>
                        {checkProduct()}
                    </Row>
                </Container>
            </Fragment>
        );
    };

    return (
        <Layout>
            {showProductMain()}
            {redirectForbidden()}
        </Layout>
    );
};

export default Checkout;
