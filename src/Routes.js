import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Login from './user/Login';
import ForgotPassword from './user/ForgotPassword';
import ResetPassword from './user/ResetPassword';
import HomePage from './user/HomePage';
import AdminDashboard from './core/admin/Dashboard';
import PreRegister from './user/PreRegister';

// custom routes
import AdminRoute from './auth/AdminRoute';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route path='/login' exact component={Login} />
            {/* <Route path='/signup' exact component={Signup} /> */}
            <Route path='/signup' exact component={PreRegister} />
            <Route path='/signup/:roleId' exact component={Signup} />
            <Route path='/forgotPassword' exact component={ForgotPassword} />
            <Route path='/' exact component={HomePage} />
            <Route
                path='/resetPassword/:tokenId'
                exact
                component={ResetPassword}
            />
            <AdminRoute
                path='/admin/dashboard'
                exact
                component={AdminDashboard}
            />
        </BrowserRouter>
    );
};

export default Routes;
