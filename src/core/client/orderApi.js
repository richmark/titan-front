import { API_URL } from '../../config';

export const sendOrderData = (sUserId, sToken, oOrder) => {
    return fetch(`${API_URL}/order/create/${sUserId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${sToken}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(oOrder)
    }).then(oResponse => {
        return oResponse.json();
    }).catch(oError => {
        console.log(oError)
    });
};
