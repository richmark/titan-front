import { API_URL } from "../../../config";

export const createCoupon = (sId, sToken, oCoupon) => {
  return fetch(`${API_URL}/coupon/create/${sId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sToken}`
    },
    body: JSON.stringify(oCoupon)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const searchCoupon = sQuery => {
  var aQuery = { query: sQuery };
  return fetch(`${API_URL}/coupon/search`, {
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

export const checkCouponCode = sCouponCode => {
  return fetch(`${API_URL}/coupon/code/${sCouponCode}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getAllCoupons = (
  iLimit = 5,
  iOffset = 0,
  sOrder = "asc",
  sSortBy = "_id"
) => {
  return fetch(
    `${API_URL}/coupon?limit=${iLimit}&offset=${iOffset}&order=${sOrder}&sortBy=${sSortBy}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getCoupon = sCouponId => {
  return fetch(`${API_URL}/coupon/${sCouponId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const countCoupon = () => {
  return fetch(`${API_URL}/coupons/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const deleteCoupon = (sId, sToken, sCouponId) => {
  return fetch(`${API_URL}/coupon/${sCouponId}/${sId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sToken}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updateCoupon = (sId, sToken, sCouponId, oCoupon) => {
  return fetch(`${API_URL}/coupon/${sCouponId}/${sId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sToken}`
    },
    body: JSON.stringify(oCoupon)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
