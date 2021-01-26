import { API_URL } from '../config';

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        var oStorage = setWithExpiry(data, 7200000);
        localStorage.setItem('jwt', JSON.stringify(oStorage));
        next();
    }
};

export const signout = async next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        try {
            const response = await fetch(`${API_URL}/users/signout`, {
                method: 'GET'
            });
            console.log('signout', response);
        } catch (err) {
            return console.log(err);
        }
    }
};

export const isAuthenticated = () => {
    if (typeof window === 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        var oStorage = JSON.parse(localStorage.getItem('jwt'));
        if (oStorage.expiry === undefined) {
            localStorage.removeItem('jwt');
            return false;
        }
        return checkExpiry(oStorage);
    } else {
        return false;
    }
};

const setWithExpiry = (oData, iTTL) => {
    const iNow = new Date();
    oData.expiry = iNow.getTime() + iTTL;
    return oData;
};

const checkExpiry = (oData) => {
    const oNow = new Date();
    console.log(oNow.getTime() > oData.expiry, oNow.getTime(), oData.expiry);
    if (oNow.getTime() > oData.expiry) {
        localStorage.removeItem('jwt');
        return false;
    }
    return oData;
}
