import { API_URL } from '../../config';

export const sendForgotPassword = email => {
    return fetch(`${API_URL}/forgot`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const sendResetPassword = (oData, sTokenId) => {
    return fetch(`${API_URL}/reset/${sTokenId}`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(oData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const sendSignup = oData => {
    return fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(oData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const sendSignin = oData => {
    return fetch(`${API_URL}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(oData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const sendConfirmation = (sToken) => {
    return fetch(`${API_URL}/confirmation/${sToken}`, {
        method: 'GET'
    }).then(oResponse => {
        return oResponse.json();
    }).catch(oError => {
        console.log(oError);
    });
};

export const sendSignout = () => {
    if (typeof window !== undefined) {
        localStorage.removeItem('jwt');
        return fetch(`${API_URL}/signout`, {
            method: 'GET'
        })
        .then(oResponse => {
            return oResponse.json();
        })
        .catch(oError => console.log(oError));
    }
};

export const resendTokenEmail = (oEmail) => {
    return fetch(`${API_URL}/resendVerification`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(oEmail)
    }).then(oResponse => {
        return oResponse.json();
    }).catch(oError => {
        console.log(oError);
    });;
};

export const sendUpdateUserData = (sUserId, sToken, oUser) => {
    return fetch(`${API_URL}/updateUser/${sUserId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${sToken}`
        },
        body: oUser
    }).then(oResponse => {
        return oResponse.json();
    }).catch(oError => {
        console.log(oError)
    });
};

export const sendUpdateUserPassword = (sUserId, sToken, oUser) => {
    return fetch(`${API_URL}/changePassword/${sUserId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${sToken}`
        },
        body: JSON.stringify(oUser)
    }).then(oResponse => {
        return oResponse.json();
    }).catch(oError => {
        console.log(oError)
    });
};

export const updateUserData = (oUser, oNext) => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('jwt')) {
            let oAuth = JSON.parse(localStorage.getItem('jwt'));
            oAuth.user = oUser;
            localStorage.setItem('jwt', JSON.stringify(oAuth));
            oNext();
        }
    }
};

export const uploadImage = (sUserId, sToken, oImages) => {
    return fetch(`${API_URL}/user/${sUserId}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${sToken}`
        },
        body: oImages
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
}
