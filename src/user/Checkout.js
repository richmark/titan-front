import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../core/Layout';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import { getCart, emptyCart, removeItem, updateCount } from '../core/client/cartHelpers';
import { Redirect } from 'react-router-dom';
import { getProduct } from '../core/admin/products/productsApi';
import { isAuthenticated } from '../auth/authUtil';


const Checkout = () => {

    const [aProduct, setProduct] = useState([]);
    const [bForbidden, setForbidden] = useState(false);
    const [oRealProduct, setRealProduct] = useState(false);
    const [iRun, setRun] = useState(getCart());
    const { user } = isAuthenticated();
    
    const init = () => {
        var aCart = getCart();
        setProduct(aCart);
        getRealPrice(aCart);
    };

    const getRealPrice = (aReal) => {
        var iLoop = 1;
        var oTemp = {};
        aReal.length > 0 && aReal.map((oProduct, iIndex) => {
            getProduct(oProduct._id).then(oData => {
                oData = oData.data;
                oTemp[oData._id] = oData.price;
                if (iLoop === aReal.length) {
                    setRealProduct(oTemp);
                }
                iLoop++
            });
            ;
        }); 
    };

    useEffect(() => {
        init();
    }, [iRun]);

    const redirectForbidden = () => {
        if (bForbidden === true) {
            return <Redirect to="/forbidden" />;
        }   
    }

    const deleteItem = (sId) => oEvent => {
        oEvent.preventDefault();
        if (window.confirm('Do you want to delete this item?') === true) {
            removeItem(sId);
            setRun(getCart());
        }
    };

    const updateItem = (sId, bIncrease) => oEvent => {
        oEvent.preventDefault();
        updateCount(sId, bIncrease);
        setRun(getCart());
    };

    const singleProduct = (oProduct) => {
        return (
            <div className="border rounded p-4 mb-2">
                <Row>
                    <Col xs={1} md={1} className="align-middle text-center">
                        <Button variant="light" style={{marginTop:'35px'}} onClick={deleteItem(oProduct._id)}>
                            <i className="fas fa-trash-alt" style={{fontSize:'24px'}}></i>
                        </Button>
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
                            <div className="float-right font-weight-bold">Qty: 
                            <Button variant="light" style={{fontSize:'15px'}} onClick={updateItem(oProduct._id, false)}>
                                <i className="far fa-minus-square" style={{fontSize:'15px'}}></i>
                            </Button>
                            <span>{oProduct.count}</span>
                            <Button variant="light" style={{fontSize:'15px'}} onClick={updateItem(oProduct._id, true)}>
                                <i className="far fa-plus-square" style={{fontSize:'15px'}}></i>
                            </Button>
                            </div>
                            ₱ <span>{oProduct.price}</span>
                        </div>
                        
                    </Col>
                </Row>
            </div>
        );
    }

    const showProducts = () => {
        return aProduct.length > 0 && (
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
        aProduct.length > 0 && oRealProduct !== false && aProduct.map((oProduct, iIndex) => {
            if (oProduct.count <= 0 || oProduct.price !== oRealProduct[oProduct._id]) {
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
                    <i className="fas fa-map-marker-alt"></i> <span className="font-weight-bold">{user.first_name} {user.last_name}</span>
                    <div id="address-info">
                        <span className="font-weight-light">
                            {user.address}
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
                        <i className="fas fa-phone-alt"></i> {user.mobile_number}
                    </span>
                </div>
                <div id="email" className="mt-2">
                    <span className="font-weight-bold">
                        <i className="fas fa-at"></i> {user.email}
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
        console.log(oRealProduct);
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
        <Layout run={iRun}>
            {showProductMain()}
            {redirectForbidden()}
        </Layout>
    );
};

export default Checkout;
