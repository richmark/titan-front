import { API_URL } from '../../../config';

export const getOrders = (sId, sToken) => {
    return fetch(`${API_URL}/orders/${sId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${sToken}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getOrderById = (sId, sToken, sOrderId) => {
    return fetch(`${API_URL}/orders/${sId}/${sOrderId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${sToken}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getOrderByUser = (sUser, sToken) => {
    return fetch(`${API_URL}/orders/lists/${sUser}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${sToken}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const updateOrder = (sId, sToken, sOrderId, oData) => {
    return fetch(`${API_URL}/orders/${sId}/${sOrderId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${sToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(oData)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}