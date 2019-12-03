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

export const createProduct = () => {
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
