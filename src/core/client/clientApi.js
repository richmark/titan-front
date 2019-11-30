import { API } from '../../config';

export const sendForgotPassword = email => {
    return fetch(`${API}/forgot`, {
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
    return fetch(`${API}/reset/${sTokenId}`, {
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
    return fetch(`${API}/register`, {
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
    return fetch(`${API}/signin`, {
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
    return fetch(`${API}/confirmation/${sToken}`, {
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
        return fetch(`${API}/signout`, {
            method: 'GET'
        })
        .then(oResponse => {
            return oResponse.json();
        })
        .catch(oError => console.log(oError));
    }
};

export const resendTokenEmail = (oEmail) => {
    return fetch(`${API}/resendVerification`, {
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
    return fetch(`${API}/updateUser/${sUserId}`, {
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
