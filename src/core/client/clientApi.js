import { API } from '../../config';

export const sendForgotPassword = email => {
    return fetch(`${API}/forgot`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const sendResetPassword = (oData, sTokenId) => {
    return fetch(`${API}/reset/${sTokenId}`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(oData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const sendSignup = oData => {
    return fetch(`${API}/register`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(oData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const sendSignin = oData => {
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(oData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
