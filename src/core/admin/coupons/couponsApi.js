import { API_URL } from "../../../config";

export const createCoupon = (sId, sToken, oCoupon) => {
  console.log(JSON.stringify(oCoupon));
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
