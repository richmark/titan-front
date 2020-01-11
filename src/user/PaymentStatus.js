import React, { useState, useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { Container, Row, Col, Card, ProgressBar, Table, Image, Form, Button  } from 'react-bootstrap';
import { retrievePaymayaCheckout } from '../core/client/checkoutApi';
import { isAuthenticated } from '../auth/authUtil';
import { emptyCart } from '../core/client/cartHelpers';

const PaymentStatus = ({ match }) => {
    const oData = match.params;
    const { user, sToken } = isAuthenticated();
    const [mSuccess, setSuccess] = useState(false);

    useEffect(() => {
        if (oData.status === 'success' && user._id === oData.userId) {
            retrievePaymayaCheckout(oData.userId, sToken, oData.sRequestId).then((oRetrieve) => {
                if (oRetrieve.error) {
                    console.log(oRetrieve.error);
                }
                if (oRetrieve.data._id) {
                    emptyCart();
                    setSuccess(oRetrieve.data._id);
                }
            });
        }
    }, []);

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
        <Layout>
            {showPaymentStatus()}
            {redirectOrderDetail()}
        </Layout>
    );
};

export default PaymentStatus;