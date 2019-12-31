import { API_URL } from '../../../config';

export const getAllReviews = (sId, sToken) => {
    return fetch(`${API_URL}/reviews/${sId}`, {
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

export const createReview = (sId, sToken, oData, sProductId, sOrderId) => {
    return fetch(`${API_URL}/review/create/${sId}/${sProductId}/${sOrderId}`, { // userId, productId, orderId
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

export const updateReview = (sId, sToken, oData, sReviewId) => {
    return fetch(`${API_URL}/review/${sReviewId}/${sId}`, {
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
