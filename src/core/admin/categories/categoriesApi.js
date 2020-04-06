import { API_URL } from "../../../config";

export const getAllCategories = () => {
  return fetch(`${API_URL}/category`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const createCategory = (sId, sToken, oCategory) => {
  return fetch(`${API_URL}/category/create/${sId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${sToken}`
    },
    body: oCategory
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const getCategory = sId => {
  return fetch(`${API_URL}/category/${sId}`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  })
    .then(oResponse => {
      return oResponse.json();
    })
    .catch(oError => console.log(oError));
};

export const updateCategory = (sId, sToken, oCategory, sCategoryId) => {
  return fetch(`${API_URL}/category/${sCategoryId}/${sId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${sToken}`
    },
    body: oCategory
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const deleteCategory = (sId, sToken, oCategories) => {
  return fetch(`${API_URL}/category/delete/${sId}`, {
    method: 'DELETE',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${sToken}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(oCategories)
  })
  .then(response => {
      return response.json();
  })
  .catch(err => console.log(err));
};