import { API_URL } from '../../../config';

export const getAllCategories = () => {
    return fetch(`${API_URL}/category`, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createCategory = (sId, sToken, oCategory) => {
    return fetch(`${API_URL}/category/create/${sId}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
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
}

// export const getWholesaler = (sId, sToken, sWholesalerId) => {
//     return fetch(`${API_URL}/users/${sId}/wholesaler/${sWholesalerId}`, {
//         method: 'GET',
//         headers: {
//             Accept: 'application/json',
//             Authorization: `Bearer ${sToken}`
//         }
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => console.log(err));
// }

// export const updateWholesaler = (sId, sToken, sWholesalerId, bVerify) => {
//     return fetch(`${API_URL}/users/${sId}/wholesaler/${sWholesalerId}`, {
//         method: 'PUT',
//         headers: {
//             Accept: 'application/json',
//             Authorization: `Bearer ${sToken}`,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ verified_admin: bVerify })
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => console.log(err));
// }