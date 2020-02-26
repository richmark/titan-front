import { API_URL } from '../../config';

export const getUserData = (sUserId, sToken) => {
    return fetch(`${API_URL}/user/${sUserId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${sToken}`
        }
    }).then(oResponse => {
        return oResponse.json();
    }).catch(oError => {
        console.log(oError)
    });
};
