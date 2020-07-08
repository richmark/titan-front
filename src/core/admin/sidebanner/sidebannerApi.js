import { API_URL } from '../../../config';

export const createSideBanner = (sId, sToken, oSideBanner) => {
    return fetch(`${API_URL}/sidebanner/create/${sId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${sToken}`
        },
        body: oSideBanner
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getSideBanners = (sId, sToken) => {
    return fetch(`${API_URL}/sidebanners/${sId}`, {
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

export const updateSideBanner = (sId, sToken, oSideBanner, sSideBannerId) => {
    return fetch(`${API_URL}/sidebanner/update/${sId}/${sSideBannerId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${sToken}`
        },
        body: oSideBanner
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getSideBannerById = (sId, sToken, sSideBannerId) => {
    return fetch(`${API_URL}/sidebanners/${sId}/${sSideBannerId}`, {
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

export const deleteSideBanner = (sId, sToken, oSideBanner) => {
    return fetch(`${API_URL}/sidebanner/delete/${sId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${sToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(oSideBanner)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const listSideBanner = () => {
    return fetch(`${API_URL}/sidebanners`, {
        method: 'GET'
    })
    .then(oResponse => {
        return oResponse.json();
    })
    .catch(oError => console.log(oError));
};