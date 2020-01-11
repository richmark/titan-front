import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../core/Layout';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import { getCart, emptyCart, removeItem, updateCount } from '../core/client/cartHelpers';
import { Redirect } from 'react-router-dom';
import { getProduct } from '../core/admin/products/productsApi';
import { isAuthenticated } from '../auth/authUtil';
import { getBraintreeClientToken, processPayment, initiatePaymayaCheckout } from '../core/client/checkoutApi';
import { sendOrderData } from '../core/client/orderApi';
import { Modal } from 'react-bootstrap';
import DropIn from 'braintree-web-drop-in-react';


const Checkout = () => {

    const [aProduct, setProduct] = useState([]);
    const [bForbidden, setForbidden] = useState(false);
    const [oRealProduct, setRealProduct] = useState(false);
    const [iRun, setRun] = useState(getCart());
    const [sClientToken, setClientToken] = useState(false);
    const [bPayment, setPayment] = useState(false);
    const [oInstance, setInstance] = useState({});
    const { user, sToken } = isAuthenticated();
    const [mRedirect, setRedirect] = useState(false);
    const [modalPaymaya, setModalPaymaya] = useState(false);

    const init = () => {
        var aCart = getCart();
        setProduct(aCart);
        getRealPrice(aCart);
        getToken(user._id, sToken);
    };

    useEffect(() => {
        init();
    }, []);
    
    const getToken = (sUserId, sToken) => {
        getBraintreeClientToken(sUserId, sToken).then(oData => {
            if (oData.error) {
                console.log(oData.error);
            } else {
                setClientToken(oData.data.clientToken);
            }
        }); 
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

    const LaunchModal = (props) => {
        return (
            <Modal
              {...props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Checkout
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  Do you want to checkout? If yes, you will be redirected to our payment merchant.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={runPaymaya(user, props)} className="m-1">Checkout</Button>
                <Button variant="secondary" onClick={props.onHide}>Cancel</Button>
              </Modal.Footer>
            </Modal>
          );
    }

    const runPaymaya = (user, props) => oEvent => {
        oEvent.preventDefault();
        props.onHide();
        var oTotal = calculateTotal();
        var oOrder = {
            customer: user,
            order_address: user.address,
            amount: oTotal.total,
            shipping_fee: oTotal.fee,
            products: []
        }

        aProduct.map((oProduct, iIndex) => {
            var oSingleProduct = {
                id: oProduct._id,
                name: oProduct.product_name,
                description: oProduct.description,
                price: oProduct.price,
                count: oProduct.count
            };
            oOrder.products.push(oSingleProduct); 
        });
        initiatePaymayaCheckout(user._id, sToken, oOrder).then((oData) => {
            if (oData.error) {
                console.log(oData.error);
                return;
            }
            setRedirect(oData.data.redirectUrl);
        });
    }

    const redirectUser = () => {
        if (mRedirect !== false) {
            window.location.href = mRedirect;
            return;
        }
    };

    const showDropIn = () => {
        return (
            <div onBlur={() => {
                
            }}>
                {sClientToken !== false && aProduct.length > 0 ? (
                    <div>
                        <DropIn options={{
                                    authorization: sClientToken,
                                    paypal: {
                                        flow: 'vault'
                                    }
                                }} 
                                onInstance={instance => (oInstance.instance = instance)} 
                        />
                        <Button onClick={buyCart} variant="success" block>Pay</Button>
                        <Button onClick={() => setPayment(false)} variant="secondary" block>Cancel</Button>
                    </div>
                ) : null}
            </div>
        );
    };

    const buyCart = () => {
        var oTotal = calculateTotal();
        // send the nonce to your server
        // nonce = data.instance.requestPaymentMethod()
        let oNonce;
        let getNonce = oInstance.instance.requestPaymentMethod().then(oData => {
            oNonce = oData.nonce;
            // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
            // and also total to be charged
            const oPaymentData = {
                paymentMethodNonce: oNonce,
                amount: oTotal.total
            }

            processPayment(user._id, sToken, oPaymentData).then(oResponse => {
                var oOrder = {
                    user: user._id,
                    order_address: user.address,
                    transaction_id: oResponse.data.transaction.id,
                    amount: oResponse.data.transaction.amount,
                    shipping_fee: oTotal.fee,
                    products: []
                }

                aProduct.map((oProduct, iIndex) => {
                    var oSingleProduct = {
                        product: oProduct._id,
                        price: oProduct.price,
                        count: oProduct.count
                    };
                    oOrder.products.push(oSingleProduct); 
                });
                sendOrder(oOrder);

            }).catch(oError => {
                console.log('dropin error: ', oError);    
            }); 
                
        });
    };


    const sendOrder = (oOrder) => {
        sendOrderData(user._id, sToken, oOrder).then(oData => {
            if (oData.error) {
                console.log(oData.error)
            }

            if (oData.data) {
                alert('Order Success!');
                setProduct([]);
                emptyCart();
                setRun(getCart());
            }
        });
    }


    

    const redirectForbidden = () => {
        if (bForbidden === true) {
            return <Redirect to="/forbidden" />;
        }   
    }

    const deleteItem = (sId) => oEvent => {
        oEvent.preventDefault();
        if (window.confirm('Do you want to delete this item?') === true) {
            removeItem(sId);
            var aCart = getCart();
            setRun(aCart);
            setProduct(aCart);
        }
    };

    const updateItem = (sId, bIncrease) => oEvent => {
        oEvent.preventDefault();
        updateCount(sId, bIncrease);
        var aCart = getCart();
        setRun(aCart);
        setProduct(aCart);
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
                                <Button variant="outline-warning" className="mr-2 ml-2 btn-sm" onClick={updateItem(oProduct._id, false)}>
                                    -
                                </Button>
                                <span>{oProduct.count}</span>
                                <Button variant="outline-warning" className="mr-2 ml-2 btn-sm" onClick={updateItem(oProduct._id, true)}>
                                    +
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

    const calculateTotal = () => {
        var oTotal = {};
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
        oTotal = {
            price : iPrice,
            fee   : iShipFee,
            total : iTotal
        }
        return oTotal;
    }

    const showTotal = () => {
        var oTotal = calculateTotal();
        return (
            <div className="border rounded p-4 mt-2">
                <Row>
                    <Col xs={4} md={4}>
                        <p className="font-weight-bold">Subtotal</p>
                        <p className="font-weight-bold">Shipping Fee</p>
                        <p className="font-weight-bold">Total</p>
                    </Col>
                    <Col xs={8} md={8} className="text-right">
                        <p className="font-weight-bold "> ₱ <span>{oTotal.price}</span></p>
                        <p className="font-weight-bold "> ₱ <span>{oTotal.fee}</span></p>
                        <p>VAT included, when applicable <span className="font-weight-bold"> ₱ <span>{oTotal.total}</span></span></p>
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
                    <Button variant="outline-warning" size="lg" block onClick={() => setModalPaymaya(true)}>
                        Place Order
                    </Button>
                </div>
            </Fragment>
        );
    }

    const showProductMain = () => {
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
            {redirectUser()}
            <LaunchModal 
                show={modalPaymaya}
                onHide={() => setModalPaymaya(false)}
            />
        </Layout>
    );
};

export default Checkout;
