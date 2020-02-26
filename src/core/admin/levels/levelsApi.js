import { API_URL } from "../../../config";

export const getAllLevels = () => {
  return fetch(`${API_URL}/level`, {
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

export const updateLevel = (sId, sToken, sLevelId, oLevel) => {
  return fetch(`${API_URL}/level/${sLevelId}/${sId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sToken}`
    },
    body: JSON.stringify(oLevel)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
