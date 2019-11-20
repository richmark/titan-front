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
		confirm_password: '',
		role: 1,
	});
	const [danger, setDanger] = useState({
		danger_first: '',
		danger_last: '',
		danger_email: '',
		danger_mobile: '',
		danger_address: '',
		danger_password: '',
		danger_confirm: ''
	});
	const {
		first_name,
		last_name,
		email,
		mobile_number,
		address,
		password,
		role,
		confirm_password,
	} = values;

	const {
		danger_first,
		danger_last,
		danger_email,
		danger_mobile,
		danger_address,
		danger_password,
		danger_confirm
	} = danger;
	const handleChange = name => event => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};
	
	const clickSubmit = oEvent => {
		const sDanger = 'border-danger';
		var sMessage = '';
		const oDanger = {};
		const sLettersOnly = /^[a-z ]+$/i;
		const sNumbersOnly =  /^[0-9]+$/i;
		const sValidEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		oEvent.preventDefault();
		if (confirm_password !== password) {
			sMessage += '- Password not match \n';
			oDanger.danger_password = sDanger;
			oDanger.danger_confirm = sDanger;
		}

		if (password.length < 8 || password.length > 16) {
			sMessage += '- Password must be atleast 8 characters and max of 16 characters \n';
			oDanger.danger_password = sDanger;
		}

		if (email.match(sValidEmail) === null) {
			sMessage += '- Invalid email. \n';
			oDanger.danger_email = sDanger;
		}

		if (last_name.match(sLettersOnly) === null) {
			sMessage += '- Invalid last name. \n';
			oDanger.danger_last = sDanger;
		}

		if (address.length <= 5) {
			sMessage += '- Invalid address. \n';
			oDanger.danger_address = sDanger;
		}

		if  (first_name.match(sLettersOnly) === null) {
			sMessage += '- Invalid first name. \n';
			oDanger.danger_first = sDanger;
		}

		if (mobile_number.length !== 11 && mobile_number.substring(0, 2) !== '09' && mobile_number.match(sNumbersOnly) === null) {
			oDanger.danger_mobile = sDanger;
			sMessage += '- Invalid mobile number. \n';
		}

		if (sMessage !== '') {
			setDanger(oDanger);
			return alert(sMessage);
		}
	
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
								className={`form-control ${danger_email}`}
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
								className={`form-control ${danger_first}`}
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
								className={`form-control ${danger_last}`}
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
								onChange={handleChange('mobile_number')}
								className={`form-control ${danger_mobile}`}

								value={mobile_number}
								type='text'
								placeholder='Enter Mobile Number'
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='exampleInputEmail1'>Address</label>
							<input
								onChange={handleChange('address')}
								className={`form-control ${danger_address}`}
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
								className={`form-control ${danger_password}`}
								value={password}
								placeholder='Password'
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='exampleInputPassword1'>
								Confirm Password Input
							</label>
							<input onChange={handleChange('confirm_password')}
								type='password'
								className={`form-control ${danger_confirm}`}
								type='password'
								placeholder='Confirm Password'
								value={confirm_password}
							/>
						</div>
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

	const showSuccess = () => result && <div className='alert alert-info'>{message}</div>;

	return (
		<Layout title='Signup' description='Sign up here'>
			{showSuccess()}
			{showForm()}
			{showFooter()}
		</Layout>
	);
};

export default Signup;
