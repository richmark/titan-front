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

export const getAllCoupons = () => {
  return fetch(`${API_URL}/coupon`, {
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
