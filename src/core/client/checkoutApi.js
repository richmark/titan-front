import { API_URL } from '../../config';

export const getBraintreeClientToken = (sUserId, sToken) => {
    return fetch(`${API_URL}/braintree/getToken/${sUserId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sToken}`
        }
    }).then(oResponse => {
        return oResponse.json();
    }).catch(oError => {
        console.log(oError)
    });
};

export const processPayment = (sUserId, sToken, oPaymentData) => {
    return fetch(`${API_URL}/braintree/payment/${sUserId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sToken}`
        },
        body: JSON.stringify(oPaymentData)
    }).then(oResponse => {
        return oResponse.json();
    }).catch(oError => {
        console.log(oError)
    });
};

export const initiatePaymayaCheckout = (sUserId, sToken, oPaymentData) => {
    return fetch(`${API_URL}/paymaya/initiateCheckout/${sUserId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sToken}`
        },
        body: JSON.stringify(oPaymentData)
    }).then(oResponse => {
        return oResponse.json();
    }).catch(oError => {
        console.log(oError)
    });
}

export const retrievePaymayaCheckout = (sUserId, sToken, sRequestId) => {
    return fetch(`${API_URL}/paymaya/retrieveCheckout/${sUserId}?sRequestId=${sRequestId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sToken}`
        }
    }).then(oResponse => {
        return oResponse.json();
    }).catch(oError => {
        console.log(oError)
    });
}