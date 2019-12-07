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
