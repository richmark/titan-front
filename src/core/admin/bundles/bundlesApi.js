import { API_URL } from "../../../config";

export const createBundle = (sId, sToken, oBundle) => {
    return fetch(`${API_URL}/bundle/create/${sId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${sToken}`
      },
      body: oBundle
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
};

export const getAllBundles = (sId, sToken) => {
    return fetch(`${API_URL}/bundles/${sId}`, {
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
