import React, { useState } from 'react';
import Layout from '../core/Layout';
import { sendResetPassword } from '../core/client/clientApi';

const ResetPassword = props => {
	const [values, setValues] = useState({
		password: '',
		confirm_password: ''
	});
	const { password, confirm_password } = values;
	const submitForm = oEvent => {
		oEvent.preventDefault();
		sendResetPassword(values, props.match.params.tokenId).then(oData => {
			console.log(oData);
			if (oData.error) {
				console.log(oData.error);
			} else {
				console.log(oData);
			}
		});
	};
	const handleChange = sKey => oEvent => {
		setValues({ ...values, [sKey]: oEvent.target.value });
	};
	const showResetPassword = () => {
		return (
			<div className='container mt-5'>
				<div className='row'>
					<div className='col-sm' />
					<div className='col-sm border p-5'>
						<h3 className='text-center mb-5'>PASSWORD RESET</h3>
						<div className='form-group'>
							<label htmlFor='exampleInputPassword1'>
								New Password
							</label>
							<input
								value={password}
								onChange={handleChange('password')}
								type='password'
								className='form-control'
								id='exampleInputPassword1'
								placeholder='New Password'
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='exampleInputPassword1'>
								Confirm Password
							</label>
							<input
								value={confirm_password}
								onChange={handleChange('confirm_password')}
								type='password'
								className='form-control'
								id='exampleInputPassword1'
								placeholder='Confirm Password'
							/>
						</div>
						<div className='align-content-center text-center mt-2'>
							<button
								onClick={submitForm}
								type='submit'
								className='btn btn-primary mx-auto'
							>
								Confirm
							</button>
						</div>
					</div>
					<div className='col-sm' />
				</div>
			</div>
		);
	};
	return <Layout>{showResetPassword()}</Layout>;
};

export default ResetPassword;
