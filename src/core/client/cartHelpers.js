export const addItem = (oItem, iCount, oNext) => {
    let aCart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            aCart = JSON.parse(localStorage.getItem('cart'));
        }
        var bResult = false;
        aCart.map((oProduct, iIndex) => {
            if (oProduct._id === oItem._id) {
                aCart[iIndex].count = parseInt(aCart[iIndex].count, 10) + parseInt(iCount, 10);
                localStorage.setItem('cart', JSON.stringify(aCart));
                bResult = true;
                oNext();
                return;
            }
        });
        if (bResult === true) {
            return;
        }
        aCart.push({
            ...oItem,
            count: parseInt(iCount, 10)
        });
        localStorage.setItem('cart', JSON.stringify(aCart));
        oNext();
        return;
    }
};

export const getTotalCount = () => {
    let aCart = [];
    var iCount = 0;
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            aCart = JSON.parse(localStorage.getItem('cart'));
        }
    }
    aCart.map((oProduct, iIndex) => {
        iCount += aCart[iIndex].count;
    });
    return iCount;
}

export const getCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
}

export const updateCount = (sProductId, bIncrease = true) => {
    let aCart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            aCart = JSON.parse(localStorage.getItem('cart'));
        }

        aCart.map((oProduct, iIndex) => {
            if (oProduct._id === sProductId) {
                if (bIncrease === true) {
                    aCart[iIndex].count += 1;
                } else {
                    aCart[iIndex].count = (aCart[iIndex].count <= 1) ? 1 : aCart[iIndex].count - 1;
                }
            }
        });

        localStorage.setItem('cart', JSON.stringify(aCart));
    }
}

export const updateItem = (sProductId, iCount) => {
    let aCart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            aCart = JSON.parse(localStorage.getItem('cart'));
        }

        aCart.map((oProduct, iIndex) => {
            if (oProduct._id === sProductId) {
                aCart[iIndex].count = iCount;
            }
        });

        localStorage.setItem('cart', JSON.stringify(aCart));
    }
};

export const removeItem = (sProductId) => {
    let aCart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            aCart = JSON.parse(localStorage.getItem('cart'));
        }

        aCart.map((oProduct, iIndex) => {
            if (oProduct._id === sProductId) {
                aCart.splice(iIndex, 1);
            }
        });

        localStorage.setItem('cart', JSON.stringify(aCart));
    }
    return aCart;
};

export const emptyCart = (oNext = () => {}) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
        oNext();
    }
};