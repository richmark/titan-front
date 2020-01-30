import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../core/Layout';
import { Container, Row, Col, Image, Form, Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import { getCart, emptyCart, removeItem, updateCount, getProductCount } from '../core/client/cartHelpers';
import { Redirect } from 'react-router-dom';
import { getProduct } from '../core/admin/products/productsApi';
import { isAuthenticated } from '../auth/authUtil';
import { getBraintreeClientToken, processPayment, initiatePaymayaCheckout } from '../core/client/checkoutApi';
import { sendOrderData } from '../core/client/orderApi';
import oQuery from 'query-string';
import BasicFormInput from './format/BasicFormInput';
import BasicAlert from './format/BasicAlert';
import { oValidatorLibrary } from '../libraries/validatorLibrary';
import { APP_URL } from '../config';


const Checkout = ({location}) => {
    const [aProduct, setProduct] = useState([]);
    const [bForbidden, setForbidden] = useState(false);
    const [oRealProduct, setRealProduct] = useState(false);
    const [iRun, setRun] = useState(getCart());
    const { user, sToken } = isAuthenticated();
    const [mRedirect, setRedirect] = useState(false);
    const [modalPaymaya, setModalPaymaya] = useState(false);
    const [mLoader, setLoader] = useState('none');
    const [bEnable, setEnable] = useState(true);
    const oBuyNow = oQuery.parse(location.search);

    // For Shipping and Billing Details Init
    var oDetail = false;
    if (user) {
        oDetail = {
            name   : `${user.first_name} ${user.last_name}`,
            address: user.address,
            contact: user.mobile_number
        }
    }

    const [oBilling, setBilling] = useState(oDetail);
    const [oShipping, setShipping] = useState(oDetail);

    // Modals
    const [modalBilling, setModalBilling] = useState(false);
    const [modalShipping, setModalShipping] = useState(false);

    // Product Stock Adjustment
    var bOnlyOnce = false;

    const init = () => {
        var aCart = getCart();
        initializeCheckout(aCart);
    };

    const initializeCheckout = (aCart) => {
        setProduct(aCart);
        getRealPrice(aCart);
    }

    useEffect(() => {
        if (oBuyNow.sType !== 'buyNow') {
            init();
            return;
        }
        setEnable(false);
        var aCart = [decodeData(oBuyNow.id)];
        initializeCheckout(aCart);
    }, []);

    const decodeData = (sData) => {
        return JSON.parse(atob(sData));
    }
    
    const getRealPrice = (aReal) => {
        var iLoop = 1;
        var oTemp = {};
        aReal.length > 0 && aReal.map((oProduct, iIndex) => {
            getProduct(oProduct._id).then(oData => {
                oData = oData.data;
                oTemp[oData._id] = {
                    price : oData.price,
                    stock : oData.stock,
                    sold_out : oData.sold_out,
                    display  : oData.display
                };
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
        setLoader(true);
        props.onHide();
        var oTotal = calculateTotal();
        var oOrder = {
            customer: user,
            billing_address: oBilling.address,
            shipping_address: oShipping.address,
            billing: btoa(JSON.stringify(oBilling)),
            shipping: btoa(JSON.stringify(oShipping)),
            amount: oTotal.total,
            shipping_fee: oTotal.fee,
            products: [],
            bBuyNow: bEnable
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
                if (oData.error = 'insufficient_stock') {
                    alert('There was an error on stock count. Please try again');
                    setRedirect(`${APP_URL}/checkout`);
                } else {
                    console.log(oData.error);
                }
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

    const adjustCart = () => {
        if (bOnlyOnce === false) {
            bOnlyOnce = true;
            aProduct.map((oProduct) => {
                if (oRealProduct[oProduct._id].stock < oProduct.count || oRealProduct[oProduct._id].sold_out === 'T' || oRealProduct[oProduct._id].display === 'F') {
                    removeItem(oProduct._id);
                    var aCart = getCart();
                    setRun(aCart);
                    setProduct(aCart);
                }
            });
        }
    }

    const updateItem = (sId, bIncrease, iProductCount) => oEvent => {
        oEvent.preventDefault();
        var oCount = getProductCount(sId, iProductCount);
        if (bIncrease === true && oCount.bCount === false) {
            alert('Cannot add product anymore, product has reach stock limit');
            return;
        }
        updateCount(sId, bIncrease);
        var aCart = getCart();
        setRun(aCart);
        setProduct(aCart);
    };

    const singleProduct = (oProduct) => {
        oRealProduct && adjustCart();
        return oRealProduct && (
            <div className="border rounded p-4 mb-2">
                <Row>
                    <Col xs={1} md={1} className="align-middle text-center">
                        {bEnable && <Button variant="light" style={{marginTop:'35px'}} onClick={deleteItem(oProduct._id)}>
                            <i className="fas fa-trash-alt" style={{fontSize:'24px'}}></i>
                        </Button>}
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
                                {bEnable && <Button variant="outline-warning" className="mr-2 ml-2 btn-sm" onClick={updateItem(oProduct._id, false, oRealProduct[oProduct._id].stock)}>
                                    -
                                </Button>}
                                <span> {oProduct.count}</span>
                                {bEnable && <Button variant="outline-warning" className="mr-2 ml-2 btn-sm" onClick={updateItem(oProduct._id, true, oRealProduct[oProduct._id].stock)}>
                                    +
                                </Button>}
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
            if (oProduct.count <= 0 || oProduct.price !== oRealProduct[oProduct._id].price) {
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

    const showDeliveryDetails = () => {
        if (user) {
            return (
                <Fragment>
                    {showDetails('Billing', oBilling, setModalBilling)}
                    <br />
                    {showDetails('Shipping', oShipping, setModalShipping)}
                    {showPlaceOrder()}
                </Fragment>
            );
        }
        return showLoginButton();    
    }

    const showDetails = (sName, oParam, oFunction) => {
        return (
            <Fragment>
                <h5>{sName} Details<span className="float-right"><Button variant="outline-warning" onClick={() => oFunction(true)}>Edit</Button></span></h5>
                <div id={`name-${sName}`} className="mt-4">
                    <i className="fa fa-user-circle"></i> <span className="font-weight-bold">{oParam.name}</span>
                </div>
                <div id={`address-${sName}`} className="mt-2">
                    <span className="font-weight-bold">
                        <i className="fas fa-map-marker-alt"></i> {oParam.address}
                    </span>
                </div>
                <div id={`contact-${sName}`} className="mt-2 mb-2">
                    <span className="font-weight-bold">
                        <i className="fas fa-phone-alt"></i> {oParam.contact}
                    </span>
                </div>
            </Fragment>
        );
    }

    const EditModal = (oProps) => {
        const oSetState = {
            'Billing'  : setBilling,
            'Shipping' : setShipping
        }
        const oState = oProps.data;
        const sType = oProps.type;
        const aFormLabel = [3,0];
        const iFormLength = 8;
        const oEmpty = () => {};
        const oData = {
            name : '',
            address : '',
            contact : ''
        }
        const [danger, setDanger] = useState(oData);
        const [message, setMessage] = useState('');
        const [success, setSuccess] = useState(false);

        const [detail, setDetail] = useState({
            name: oState.name,
            address: oState.address,
            contact: oState.contact
        });

        const oUseState = {
            detail,
            oSetDetail : setDetail
        }

        const closeModal = (props) => {
            if (success !== false) {
                setTimeout(() => {
                    props.onHide();
                    oSetState[sType](detail);
                }, 1000);
                return BasicAlert('success', 'Update Successful!');
            }
        };

        return (
            <Modal
                {...oProps}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {`${oProps.type} Details`}
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitDetails(setDanger, setMessage, oData, oUseState, setSuccess, sType)}>
                <Modal.Body>
                    <Fragment>
                        {BasicFormInput('Full Name', 'text', `formName-${sType}`, oEmpty, aFormLabel, iFormLength, danger.name, oState.name)}
                        {BasicFormInput('Address', 'text', `formAddress-${sType}`, oEmpty, aFormLabel, iFormLength, danger.address, oState.address)}
                        {BasicFormInput('Mobile Number', 'text', `formContact-${sType}`, oEmpty, aFormLabel, iFormLength, danger.contact, oState.contact)}
                        {message !== '' ? BasicAlert('danger', message) : ''}
                        {closeModal(oProps)}
                    </Fragment>            
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="m-1" type="submit">Save</Button>
                    <Button variant="secondary" onClick={oProps.onHide}>Close</Button>
                </Modal.Footer>
                </Form>
            </Modal>
        );
    };

    const submitDetails = (oDanger, oMessage, oInitial, oUseState, oSuccess, sId) => (oEvent) => {
        oEvent.preventDefault();
        oDanger(oInitial);
        oMessage('');
        const oData = {
            name    : getValue(`formName-${sId}`),
            address : getValue(`formAddress-${sId}`),
            contact : getValue(`formContact-${sId}`)
        }
        if (checkSameData(oData, oUseState.detail) === true) {
            oSuccess(true);
            return;
        }
        var oValidator = oValidatorLibrary();
        oValidator.message('name', oData.name, 'required|alpha_space');
        oValidator.message('address', oData.address, 'required|alpha_num_dash_space|max:254');
        oValidator.message('contact', oData.contact, 'required|contact_number');
        if (oValidator.allValid()) {
            oUseState.oSetDetail(oData);
            oSuccess(true);
            return;
        }
        // error messages goes here
        var oError = oValidator.getErrorMessages();
        var sMessage = setErrorMessage(oError);
        oMessage(sMessage);
        oDanger({
            name    : setErrorBorder(oError.name),
            address : setErrorBorder(oError.address),
            contact : setErrorBorder(oError.contact)
        });
    };

    const getValue = (sValue) => {
        return document.getElementById(sValue).value.trim()
    }

    const setErrorBorder = (sName) => {
        return (sName === null) ? '' : 'border-danger';
    };

    const setErrorMessage = (oError) => {
        var aMessage = [];
        Object.keys(oError).map(mKey => {
            aMessage.push((typeof oError[mKey] === 'object') ? '' : oError[mKey]); 
        });
        return aMessage;
    };

    const checkSameData = (oCheck, oParam) => {
        const oData = {
            name : oParam.name,
            address : oParam.address,
            contact : oParam.contact
        }
        if (JSON.stringify(oData) === JSON.stringify(oCheck)) {
            return true;
        }
        return false;
    }

    const showPlaceOrder = () => {
        return (
            <Fragment>
                <InputGroup className="mb-2 mt-5" >
                    <FormControl
                    placeholder="Coupon Code"
                    aria-label="Coupon Code"
                    aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                        <Button variant="outline-warning">Apply</Button>
                    </InputGroup.Append>
                </InputGroup>
                <div id="place-order" className="mt-4 text-center">
                    <Button variant="outline-warning" size="lg" block onClick={() => setModalPaymaya(true)}>
                        Place Order
                    </Button>
                </div>
            </Fragment>
        );
    }

    const showLoginButton = () => {
        return (
            <Fragment>
                <div className='text-center mt-5'>
                    <h5>Do you want to checkout?</h5>
                    <Button variant='warning' className='mt-3' href='/login'>Please Log In</Button>
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
                        {showDeliveryDetails()}
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
        <Layout run={iRun} loader={mLoader}>
            {showProductMain()}
            {redirectForbidden()}
            {redirectUser()}
            <LaunchModal 
                show={modalPaymaya}
                onHide={() => setModalPaymaya(false)}
            />
            <EditModal 
                show={modalBilling}
                onHide={() => setModalBilling(false)}
                data={oBilling}
                type='Billing'
            />
            <EditModal 
                show={modalShipping}
                onHide={() => setModalShipping(false)}
                data={oShipping}
                type='Shipping'
            />
        </Layout>
    );
};

export default Checkout;
