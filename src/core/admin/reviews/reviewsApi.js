import { API_URL } from '../../../config';

export const getReviewsByProductIdCount = (sProductId) => {
    return fetch(`${API_URL}/reviews/product/${sProductId}/count`, {
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

export const getReviewsByProductIdClient = (sProductId, visibility = undefined, iLimit = 5, iOffset = 0) => {
    let sQueryParam = '';
    if (visibility) {
        sQueryParam = `?visibility=${visibility}&limit=${iLimit}&offset=${iOffset}`;
    }
    return fetch(`${API_URL}/reviews/product/client/${sProductId}${sQueryParam}`, {
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

export const getReviewsByProductId = (sProductId, visibility = undefined, iLimit = 5, iOffset = 0) => {
    let sQueryParam = '';
    if (visibility) {
        sQueryParam = `?visibility=${visibility}&limit=${iLimit}&offset=${iOffset}`;
    }
    return fetch(`${API_URL}/reviews/product/${sProductId}${sQueryParam}`, {
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

export const getAllReviews = (sId, sToken) => {
    return fetch(`${API_URL}/reviews/admin/${sId}`, {
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

export const getReviewsPerProductCount = (sId, sToken) => {
    return fetch(`${API_URL}/reviews/admin/${sId}/count`, {
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

export const deleteReview = (sId, sToken, oProduct) => {
    return fetch(`${API_URL}/review/delete/${sId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${sToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(oProduct)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};
