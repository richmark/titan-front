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
