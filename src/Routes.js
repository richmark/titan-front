import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import ForgotPassword from './user/ForgotPassword';
import ResetPassword from './user/ResetPassword';

const Routes = () => {
	return (
		<BrowserRouter>
			<Route path='/signup' exact component={Signup} />
			<Route path='/forgotPassword' exact component={ForgotPassword} />
			<Route
				path='/resetPassword/:tokenId'
				exact
				component={ResetPassword}
			/>
		</BrowserRouter>
	);
};

export default Routes;
