import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { sendForgotPassword } from '../core/client/clientApi';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const submitForm = oEvent => {
		oEvent.preventDefault();
		sendForgotPassword(email).then(oData => {
			if (oData.error) {
				console.log(oData.error);
			} else {
				console.log(oData);
			}
		});
	};
	const handleChange = () => oEvent => {
		setEmail(oEvent.target.value);
	};
	const showForgotPassword = () => {
		return (
			<div className='container mt-5'>
				<div className='row'>
					<div className='col-sm' />
					<div className='col-sm border p-5'>
						<h3 className='text-center mb-5'>
							Recover your account
						</h3>
						<div className='form-group'>
							<label htmlFor='exampleInputEmail1'>Email</label>
							<input
								value={email}
								onChange={handleChange()}
								type='email'
								className='form-control'
								id='exampleInputEmail1'
								placeholder='Enter email'
							/>
						</div>
						<div className='align-content-center text-center mt-2'>
							<button
								onClick={submitForm}
								type='submit'
								className='btn btn-primary mx-auto'
							>
								Send
							</button>
						</div>
					</div>
					<div className='col-sm' />
				</div>
			</div>
		);
	};
	return <Layout>{showForgotPassword()}</Layout>;
};

export default ForgotPassword;
