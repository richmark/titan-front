import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signout from './user/Signout';
import Login from './user/Login';
import ForgotPassword from './user/ForgotPassword';
import ResetPassword from './user/ResetPassword';
import HomePage from './user/HomePage';
import Menu from './core/admin/Menu';
import PreRegister from './user/PreRegister';
import Bundles from './core/admin/bundles/Bundles';
import Coupons from './core/admin/coupons/Coupons';
import Orders from './core/admin/orders/Orders';
import Products from './core/admin/products/Products';
import Reviews from './core/admin/reviews/Reviews';
import Shippers from './core/admin/shippers/Shippers';
import Wholesalers from './core/admin/wholesalers/Wholesalers';
import VerifyEmail from './user/VerifyEmail';

// custom routes
import AdminRoute from './auth/AdminRoute';
import ProcessWholesaler from './core/admin/wholesalers/ProcessWholesaler';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route path='/login' exact component={Login} />
            <Route path='/signup' exact component={PreRegister} />
            <Route path='/signout' exact component={Signout} />
            <Route path='/signup/:roleId' exact component={Signup} />
            <Route path='/forgotPassword' exact component={ForgotPassword} />
            <Route path='/verify/:sToken' exact component={VerifyEmail} />
            <Route path='/' exact component={HomePage} />
            <Route
                path='/resetPassword/:tokenId'
                exact
                component={ResetPassword}
            />
            {/* Menu Tabs */}
            <AdminRoute path='/admin/dashboard' exact component={Menu} />
            <AdminRoute path='/admin/shippers' exact component={Shippers} />
            <AdminRoute path='/admin/bundles' exact component={Bundles} />
            <AdminRoute path='/admin/coupons' exact component={Coupons} />
            <AdminRoute path='/admin/orders' exact component={Orders} />
            <AdminRoute path='/admin/products' exact component={Products} />
            <AdminRoute path='/admin/reviews' exact component={Reviews} />
            <AdminRoute
                path='/admin/wholesalers'
                exact
                component={Wholesalers}
            />
            <AdminRoute
                path='/admin/wholesalers/:wholesalerId'
                exact
                component={ProcessWholesaler}
            />
        </BrowserRouter>
    );
};

export default Routes;
