import { API_URL } from "../../../config";

export const updateBundle = (sId, sToken, oBundle, sBundleId) => {
  return fetch(`${API_URL}/bundle/update/${sId}/${sBundleId}`, {
    method: "PUT",
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

export const getBundle = (sId, sToken, sBundleId) => {
  return fetch(`${API_URL}/bundles/${sId}/${sBundleId}`, {
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

/**
 * For public
 */
export const getBundleList = () => {
  return fetch(`${API_URL}/bundles/client`, {
      method: 'GET'
  })
  .then(response => {
      return response.json();
  })
  .catch(err => console.log(err));
};

export const getRelatedBundle = (sId) => {
  return fetch(`${API_URL}/bundles/client/related/${sId}`, {
      method: 'GET'
  })
  .then(response => {
      return response.json();
  })
  .catch(err => console.log(err));
};

export const deleteBundle = (sId, sToken, oBundles) => {
  return fetch(`${API_URL}/bundles/delete/${sId}`, {
    method: 'DELETE',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${sToken}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(oBundles)
  })
  .then(response => {
      return response.json();
  })
  .catch(err => console.log(err));
};

export const getBundleById = (sBundleId) => {
  return fetch(`${API_URL}/bundles/client/${sBundleId}`, {
      method: 'GET',
  })
  .then(response => {
      return response.json();
  })
  .catch(err => console.log(err));
};