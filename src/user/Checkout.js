import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../core/Layout';
import { Container, Row, Col, Image, Form, Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import { getCart, emptyCart, removeItem, updateCount, getProductCount } from '../core/client/cartHelpers';
import { Redirect } from 'react-router-dom';
import { getProduct } from '../core/admin/products/productsApi';
import { isAuthenticated } from '../auth/authUtil';
import { getBraintreeClientToken, processPayment, initiatePaymayaCheckout } from '../core/client/checkoutApi';
import oQuery from 'query-string';
import BasicFormInput from './format/BasicFormInput';
import BasicAlert from './format/BasicAlert';
import { oValidatorLibrary } from '../libraries/validatorLibrary';
import { APP_URL } from '../config';
import { checkCouponCode } from '../core/admin/coupons/couponsApi';
import { getUserData } from '../core/client/userApi';
import { getAllLevels } from '../core/admin/levels/levelsApi';
import { getSettings } from '../core/admin/orders/ordersApi';


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

    // For Discount (Dynamic/Coupon-Wholesaler)
    const [iDiscount, setDiscount] = useState(0);
    const [sCouponCode, setCouponCode] = useState(false);
    const [sLevel, setLevel] = useState(false);
    const [aLevel, setDiscountLevel] = useState(false);
    const [bStart, setStart] = useState(false);

    // For Delivery Settings
    const [iDeliveryFee, setDeliveryFee] = useState(100);
    
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

    // For Check Role and Admin verification
    const iWholeSaler = 4;
    const [iRole, setRole] = useState(false);
    const [bVerify, setVerify] = useState(false);

    // Product Stock Adjustment
    var bOnlyOnce = false;

    const init = () => {
        var aCart = getCart();
        initializeCheckout(aCart);
    };

    /**
     * Function that validates the role of the user
     * Hack-proof
     */
    const checkRole = () => {
        getUserData(user._id, sToken).then(oData => {
            if (oData.error) {
                console.log(oData.error);
            } else {
                implementRole(oData);
            }
        });
    }

    /**
     * Function that changes the alert message
     * Alert message is based on coupon or wholesale discount
     * Sets the role
     * Must be admin verified
     * Gets the Level Data (Gold, Silver, Bronze)
     */
    const implementRole = (oParam) => {
        var iParam = oParam.role;
        if (iParam === 4 && oParam.verified_admin === true) {
            getAllLevels().then(oData => {
                if (oData.error) {
                    console.log(oData.error);
                } else {
                    populateDiscountLevel(oData.data);
                }
            });
        }
        setRole(iParam);
        setVerify(oParam.verified_admin);
    }

    /**
     * Populate Discount Level
     * Sets the threshold and discount per level 
     */
    const populateDiscountLevel = (aData) => {
        var oDiscount = {};
        aData.map((oLevel, iIndex) => {
            oDiscount[oLevel.level] = {
                level      : oLevel.level,
                threshold  : oLevel.price_threshhold,
                percentage : oLevel.percent_discount
            }
        });
        setDiscountLevel(oDiscount);
    }

    const initializeCheckout = (aCart) => {
        setProduct(aCart);
        getRealPrice(aCart);
    }

    useEffect(() => {
        user && checkRole();
        getSettings().then(oData => {
            if (oData.error) {
                console.log(oData.error);
            } else if (oData.data.length > 0) {
                setDeliveryFee(oData.data[0].delivery_fee);
            }
        })
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
    
    /**
     * Gets the real price of the product
     * Hack-proof
     */
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
                <Button variant="warning" onClick={runPaymaya(user, props)} className="m-1">Checkout</Button>
                <Button variant="outline-warning" onClick={props.onHide}>Cancel</Button>
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
            discount: iDiscount,
            coupon_code: sCouponCode,
            products: [],
            bBuyNow: bEnable
        }
        sCouponCode === false && delete oOrder.coupon_code;
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
            checkDiscount();
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
        checkDiscount();
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
        var iShipFee = parseInt(iDeliveryFee, 10);
        aProduct.length > 0 && oRealProduct !== false && aProduct.map((oProduct, iIndex) => {
            if (oProduct.count <= 0 || oProduct.price !== oRealProduct[oProduct._id].price) {
                setProduct([]);
                setForbidden(true);
                emptyCart();
            }
            iPrice += (oProduct.price * oProduct.count);
        });
        var iTotal = iPrice + iShipFee - iDiscount;
        oTotal = {
            price   : iPrice,
            fee     : iShipFee,
            discount: iDiscount,
            total   : iTotal
        }
        return oTotal;
    }

    /**
     * Applies Level Discount
     */
    const applyLevelDiscount = (iData) => {
        var oBronze = aLevel.Bronze;
        var oSilver = aLevel.Silver;
        var oGold = aLevel.Gold;
        if (iData <= oBronze.threshold) {
            sLevel !== false && alert('No discount applied');
            disableDiscount();
            setLevel(false);
        } else if (iData > oBronze.threshold && iData < oSilver.threshold) {
            runLevelDiscount(oBronze);
        } else if (iData >= oSilver.threshold && iData < oGold.threshold) {
            runLevelDiscount(oSilver);
        } else if (iData >= oGold.threshold) {
            runLevelDiscount(oGold);
        }
    }

    /**
     * Apply level discount logic
     */
    const runLevelDiscount = (oDiscount) => {
        var sMessage = 'Level Discount Applied!';
        sLevel !== oDiscount.level && alert(`${oDiscount.level} ${sMessage}`);
        setLevel(oDiscount.level);
        calculateDiscountRate(oDiscount.percentage);
    }

    const showTotal = () => {
        var oTotal = calculateTotal();
        if (iRole === 4 && aLevel && bStart === false) {
            setStart(true);
            applyLevelDiscount(oTotal.price);
        }
        return (
            <div className="border rounded p-4 mt-2">
                <Row>
                    <Col xs={4} md={4}>
                        <p className="font-weight-bold">Subtotal</p>
                        {oTotal.discount > 0 && <p className="font-weight-bold">Discount {iRole === 4 && `(${sLevel})`}</p>}
                        <p className="font-weight-bold">Shipping Fee</p>
                        <p className="font-weight-bold">Total</p>
                    </Col>
                    <Col xs={8} md={8} className="text-right">
                        <p className="font-weight-bold "> ₱ <span>{oTotal.price}</span></p>
                        {oTotal.discount > 0 && <p className="font-weight-bold "> ₱ <span>({oTotal.discount})</span></p>}
                        <p className="font-weight-bold "> ₱ <span>{oTotal.fee}</span></p>
                        <p>VAT included, when applicable <span className="font-weight-bold"> ₱ <span>{oTotal.total}</span></span></p>
                    </Col>
                </Row>
            </div>
        );
    }

    const showDeliveryDetails = () => {
        if (user && ((iRole <= 2) || (iRole > 2 && iRole <= 4 && bVerify === true))) {
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
                    <Button variant="warning" className="m-1" type="submit">Save</Button>
                    <Button variant="outline-warning" onClick={oProps.onHide}>Close</Button>
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
                {showCoupon()}
                <div id="place-order" className="mt-4 text-center">
                    <Button variant="outline-warning" size="lg" block onClick={() => setModalPaymaya(true)}>
                        Place Order
                    </Button>
                </div>
            </Fragment>
        );
    }

    const showCoupon = () => {
        return (iRole !== iWholeSaler) && (
            <InputGroup className="mb-2 mt-5" >
                <FormControl
                    id="coupon_code"
                    placeholder="Coupon Code"
                    aria-label="Coupon Code"
                    aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                    <Button variant="outline-warning" onClick={useCoupon}>Apply</Button>
                </InputGroup.Append>
            </InputGroup>
        );
    }

    const useCoupon = () => {
        var oData = {
            coupon_code : getValue('coupon_code')
        }
        var oValidator = oValidatorLibrary();
        oValidator.message('coupon_code', oData.coupon_code, 'required');
        if (oValidator.allValid()) {
            checkCouponCode(oData.coupon_code).then(oData => {
                if (oData.data.length === 0) {
                    disableDiscount();
                    alert('Coupon code does not exist');
                } else {
                    implementDiscount(oData.data[0]);
                }   
            });
            return;
        }
        disableDiscount();
        alert('Please input coupon code to apply');
    }

    /**
     * Updates price/discount
     * Wholesaler only
     */
    useEffect(() => {
        if (iRole === 4 && bVerify === true) {
            var oTotal = calculateTotal();
            applyLevelDiscount(oTotal.price);
        }
    }, [iRun]);


    const checkDiscount = () => {
        if (iDiscount > 0 && iRole !== 4) {
            alert('Please apply coupon again');
            disableDiscount();
        }
    }

    const implementDiscount = (oCoupon) => {    
        if (oCoupon.status === true) {
            var oDiscount = {
                'Discount Rate'  : calculateDiscountRate,
                'Discount Value' : calculateDiscountValue
            }
            setCouponCode(oCoupon.coupon_code);
            oDiscount[oCoupon.coupon_type](oCoupon.discount);
        } else {
            disableDiscount();
            alert('Invalid Coupon!');
        }
    }

    const calculateDiscountRate = (iValue, sMessage = 'Coupon Discount Applied!') => {
        var oTotal = calculateTotal();
        var iCalculate = (iValue / 100) * oTotal.price;
        iRole !== 4 && alert(sMessage);
        setDiscount(iCalculate);
    }

    const calculateDiscountValue = (iValue, sMessage = 'Coupon Discount Applied!') => {
        alert(sMessage);
        setDiscount(iValue);
    }

    const disableDiscount = () => {
        setDiscount(0);
        setCouponCode(false);
    }

    const showLoginButton = () => {
        return (
            <Fragment>
                <div className='text-center mt-5'>
                    <h5>Do you want to checkout?</h5>
                    {showButtonOrMessage()}
                </div>
            </Fragment>
        );
    }

    const showButtonOrMessage = () => {
        if (user && bVerify === false) {
            return (
                <Fragment>
                    <h6>Please wait for admin approval</h6>
                </Fragment>
            );
        }
        return (
            <Fragment>
                <Button variant='warning' className='mt-3' href='/login'>Please Log In</Button>
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
