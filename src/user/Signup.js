import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { sendSignup } from '../core/client/clientApi';

const Signup = () => {
	const [result, setResult] = useState(false);
	const [message, setMessage] = useState('');
	const [values, setValues] = useState({
		first_name: '',
		last_name: '',
		email: '',
		mobile_number: '',
		address: '',
		password: '',
		role: 1
	});
	const {
		first_name,
		last_name,
		email,
		mobile_number,
		address,
		password,
		role
	} = values;
	const handleChange = name => event => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};
	const clickSubmit = oEvent => {
		oEvent.preventDefault();
		sendSignup(values).then(oData => {
			if (oData.error) {
				console.log(oData.error);
			} else {
				console.log(oData);
				setResult(true);
				setMessage(oData.message);
			}
		});
	};
	const showFooter = () => {
		return (
			<div className='navbar navbar-light bg-light'>
				<a className='navbar-brand'>Titan Supertools</a>
			</div>
		);
	};
	const showForm = () =>
		!result && (
			<div className='container text-center'>
				<div className='row'>
					<div className='col-sm'></div>
					<div className='col-sm border m-5 p-5'>
						<h3>REGISTER (PERSONAL)</h3>
						<div className='form-group'>
							<label htmlFor='exampleInputEmail1'>
								Email address
							</label>
							<input
								onChange={handleChange('email')}
								value={email}
								type='email'
								className='form-control'
								placeholder='Enter email'
							/>
							<small
								id='emailHelp'
								className='form-text text-muted'
							>
								We'll never share your email with anyone else.
							</small>
						</div>
						<div className='form-group'>
							<label htmlFor='exampleInputEmail1'>
								First Name
							</label>
							<input
								onChange={handleChange('first_name')}
								className='form-control'
								value={first_name}
								type='text'
								placeholder='Enter First Name'
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='exampleInputEmail1'>
								Last Name
							</label>
							<input
								onChange={handleChange('last_name')}
								className='form-control'
								value={last_name}
								type='text'
								placeholder='Enter Last Name'
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='exampleInputEmail1'>
								Mobile Number
							</label>
							<input
								onChange={handleChange(mobile_number)}
								className='form-control'
								value={mobile_number}
								type='text'
								placeholder='Enter Mobile Number'
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='exampleInputEmail1'>Address</label>
							<input
								onChange={handleChange('address')}
								className='form-control'
								value={address}
								type='text'
								placeholder='Enter Address'
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='exampleInputPassword1'>
								Password input
							</label>
							<input
								onChange={handleChange('password')}
								type='password'
								className='form-control'
								value={password}
								placeholder='Password'
							/>
						</div>
						{/* <div className='form-group'>
							<label htmlFor='exampleInputPassword1'>
								Confirm Password Input
							</label>
							<input onChange={handleChange()}
								type='password'
								className='form-control'
								type='text'
								placeholder='Password'
							/>
						</div> */}
						<button
							onClick={clickSubmit}
							type='button'
							className='btn btn-success'
						>
							REGISTER
						</button>
					</div>
					<div className='col-sm'></div>
				</div>
			</div>
		);

	const showSuccess = () =>
		result && <div className='alert alert-info'>{message}</div>;

	return (
		<Layout title='Signup' description='Sign up here'>
			{showSuccess()}
			{showForm()}
			{showFooter()}
		</Layout>
	);
};

export default Signup;
