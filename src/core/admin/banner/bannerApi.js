import { API_URL } from '../../../config';

export const createBanner = (sId, sToken, oBanner) => {
    return fetch(`${API_URL}/banner/create/${sId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${sToken}`
        },
        body: oBanner
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getBanners = (sId, sToken) => {
    return fetch(`${API_URL}/banners/${sId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${sToken}`
        }
    })
    .then(oResponse => {
        return oResponse.json();
    })
    .catch(oError => console.log(oError));
};

export const updateBanner = (sId, sToken, oBanner, sBannerId) => {
    return fetch(`${API_URL}/banner/update/${sId}/${sBannerId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${sToken}`
        },
        body: oBanner
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getBannerById = (sId, sToken, sBannerId) => {
    return fetch(`${API_URL}/banners/${sId}/${sBannerId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${sToken}`
        }
    })
    .then(oResponse => {
        return oResponse.json();
    })
    .catch(oError => console.log(oError));
};

export const deleteBanner = (sId, sToken, oBanner) => {
    return fetch(`${API_URL}/banner/delete/${sId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${sToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(oBanner)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};