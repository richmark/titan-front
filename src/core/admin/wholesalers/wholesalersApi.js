import { API } from '../../../config';

export const getAllWholesalers = (sId, sToken) => {
    return fetch(`${API}/users/${sId}`, {
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

export const getWholesaler = (sId, sToken, sWholesalerId) => {
    return fetch(`${API}/users/${sId}/wholesaler/${sWholesalerId}`, {
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