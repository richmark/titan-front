import { API_URL } from "../../config";

/**
 * Get Related Products with Reviews
 */
export const getRelatedProduct = sId => {
    return fetch(`${API_URL}/products/client/${sId}`, {
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

/**
 * Get All Products with Reviews
 */
export const getAllProducts = (
    iLimit = 6,
    iOffset = 0,
    iOrder = 1,
    sSortBy = "_id"
  ) => {
    return fetch(
      `${API_URL}/products/client?limit=${iLimit}&offset=${iOffset}&order=${iOrder}&sortBy=${sSortBy}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      }
    )
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
};

/**
 * Search Product for Client Side with Reviews
 */
export const searchProduct = sQuery => {
    var aQuery = { query: sQuery };
    return fetch(`${API_URL}/product/client/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(aQuery)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
};

/**
 * Get Products By Category for Client Side with Reviews
 */
export const getProductByCategory = (sId, skip, order) => {
    return fetch(
      `${API_URL}/products/client/category/${sId}?skip=${skip}&order=${order}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      }
    )
      .then(oResponse => {
        return oResponse.json();
      })
      .catch(oError => console.log(oError));
};
