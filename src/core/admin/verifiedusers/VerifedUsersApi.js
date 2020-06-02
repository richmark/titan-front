import { API_URL } from '../../../config';

export const getAllUsers = (sId, sToken) => {
    return fetch(`${API_URL}/users/all/${sId}`, {
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

export const getOrderProductsByUser = (sId, sToken) => {
    return fetch(`${API_URL}//orders/products/${sId}`, {
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