import { API_URL } from '../../../config';

export const getAllShippers = (sId, sToken) => {
    return fetch(`${API_URL}/shippers/${sId}`, {
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

export const createShipper = (sId, sToken, oData) => {
    return fetch(`${API_URL}/shipper/create/${sId}`, {
        method: 'POST',
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

export const getShipper = (sId, sToken, shipperId) => {
    return fetch(`${API_URL}/shippers/${sId}/${shipperId}`, {
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
}

export const updateShipper = (sId, sToken, shipperId, oData) => {
    return fetch(`${API_URL}/shippers/${sId}/${shipperId}`, {
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
};

export const deleteShipper = (sId, sToken, oShipper) => {
    return fetch(`${API_URL}/shippers/delete/${sId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${sToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(oShipper)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};