import { API_URL } from "../../../config";

export const getAllProducts = (
  iLimit = 6,
  iOffset = 0,
  sOrder = "asc",
  sSortBy = "_id"
) => {
  return fetch(
    `${API_URL}/products?limit=${iLimit}&offset=${iOffset}&order=${sOrder}&sortBy=${sSortBy}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createProduct = (sId, sToken, oProduct) => {
  return fetch(`${API_URL}/product/create/${sId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${sToken}`,
    },
    body: oProduct,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getProduct = (sId) => {
  return fetch(`${API_URL}/product/${sId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((oResponse) => {
      return oResponse.json();
    })
    .catch((oError) => console.log(oError));
};

export const updateProduct = (sId, sToken, oProduct, sProductId) => {
  return fetch(`${API_URL}/product/${sProductId}/${sId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${sToken}`,
    },
    body: oProduct,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteProduct = (sId, sToken, aProduct) => {
  return fetch(`${API_URL}/product/delete/${sId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${sToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(aProduct),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getProductCount = () => {
  return fetch(`${API_URL}/products/count`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((oResponse) => {
      return oResponse.json();
    })
    .catch((oError) => console.log(oError));
};

export const getProductByCategory = (sId, skip, order) => {
  return fetch(
    `${API_URL}/products/category/${sId}?skip=${skip}&order=${order}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  )
    .then((oResponse) => {
      return oResponse.json();
    })
    .catch((oError) => console.log(oError));
};

export const getRelatedProduct = (sId) => {
  return fetch(`${API_URL}/products/related/${sId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((oResponse) => {
      return oResponse.json();
    })
    .catch((oError) => console.log(oError));
};

export const searchProduct = (sQuery) => {
  var aQuery = { query: sQuery };
  return fetch(`${API_URL}/product/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(aQuery),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const searchProductByBrand = (sQuery) => {
  var aQuery = { query: sQuery };
  return fetch(`${API_URL}/product/brand/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(aQuery),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const searchProductByCategory = (sId) => {
  return fetch(`${API_URL}/products/category/${sId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
