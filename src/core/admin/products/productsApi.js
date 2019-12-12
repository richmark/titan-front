import { API_URL } from '../../../config';

export const getAllProducts = () => {
    return fetch(`${API_URL}/products`, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const createProduct = (sId, sToken, oProduct) => {
    return fetch(`${API_URL}/product/create/${sId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${sToken}`
        },
        body: oProduct
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getProduct = (sId) => {
    return fetch(`${API_URL}/product/${sId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })
    .then(oResponse => {
        return oResponse.json();
    })
    .catch(oError => console.log(oError));
};

export const updateProduct = (sId, sToken, oProduct, sProductId) => {
    return fetch(`${API_URL}/product/${sProductId}/${sId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${sToken}`
        },
        body: oProduct
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};