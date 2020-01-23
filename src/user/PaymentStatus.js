import React, { useState, useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { Container, Row, Col, Card, ProgressBar, Table, Image, Form, Button  } from 'react-bootstrap';
import { retrievePaymayaCheckout } from '../core/client/checkoutApi';
import { isAuthenticated } from '../auth/authUtil';
import { emptyCart } from '../core/client/cartHelpers';
import oQuery from 'query-string';

const PaymentStatus = ({ match, location }) => {
    const oData = match.params;
    const { user, sToken } = isAuthenticated();
    const [mSuccess, setSuccess] = useState(false);
    const [bCheckout, setCheckout] = useState(false);
    const oNotBuyNow = oQuery.parse(location.search); 

    useEffect(() => {
        if (oData.status === 'success' && user._id === oData.userId) {
            const oDetails = {
                oBilling  : JSON.parse(atob(oNotBuyNow.oBilling)),
                oShipping : JSON.parse(atob(oNotBuyNow.oShipping))
            }
            retrievePaymayaCheckout(oData.userId, sToken, oData.sRequestId, oDetails).then((oRetrieve) => {
                if (oRetrieve.error) {
                    console.log(oRetrieve.error);
                    return;
                }
                if (oRetrieve.data._id && oNotBuyNow.bData === 'true') {
                    emptyCart();
                }
                setSuccess(oRetrieve.data._id);
            });
        } else {
            alert('Processing Failed! Please try again');
            setCheckout(true);
        }
    }, []);

    const redirectCheckout = () => {
        if (bCheckout !== false) {
            return <Redirect to={`/checkout`} />
        }
    }

    const redirectOrderDetail = () => {
        if (mSuccess !== false) {
            return <Redirect to={`/order/detail/${mSuccess}`} />
        }
    }

    const showPaymentStatus = () => {
        return (
            <Container className="mt-5">
                <h2>Payment Status</h2>
                <Card className="mt-2">
                    {oData.status}
                </Card>
            </Container>            
        );
    };
    
	return (
        <Layout loader={true}>
            {/* {showPaymentStatus()} */}
            {redirectOrderDetail()}
            {redirectCheckout()}
        </Layout>
    );
};

export default PaymentStatus;