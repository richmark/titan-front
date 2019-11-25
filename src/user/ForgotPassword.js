import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import { sendForgotPassword } from '../core/client/clientApi';
import CardResponse from './format/CardResponse';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [danger, setDanger] = useState({
		danger_email: ''
	});
	const {
		danger_email
	} = danger;
	const submitForm = oEvent => {
		oEvent.preventDefault();
		const sDanger = 'border-danger';
		var sMessage = '';
		const oDanger = {};
		const sValidEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (email.match(sValidEmail) === null) {
			sMessage += '- Invalid email. \n';
			oDanger.danger_email = sDanger;
		}

		if (sMessage !== '') {
			setDanger(oDanger);
			return alert(sMessage);
		}

		setError(false);
		sendForgotPassword(email).then(oData => {
			if (oData.error) {
				setError(true);
				console.log(oData.error);
			} else {
				setSuccess(oData.message);
				console.log(oData.message);
			}
		});
	};

	const handleChange = () => oEvent => {
		setEmail(oEvent.target.value);
	};

	const showForgotPassword = () => {
		return (
			<div className='col-sm-6 mx-auto border p-5'>
				<h3 className='text-center mb-5'>
					Recover your account
				</h3>
				<div className="row mt-3">
					<div className="col-sm-2">
						<label className="mt-2 " htmlFor="exampleInputEmail1">Email</label>
					</div>
					<div className="col-sm">
					<input
						value={email}
						onChange={handleChange()}
						type='email'
						className={`form-control ${danger_email}`}
						id='exampleInputEmail1'
						placeholder='Enter email'
					/>
					</div>
				</div>
				<div className='align-content-center text-center mt-4'>
					{showErrorMessage()}
					<button
						onClick={submitForm}
						type='submit'
						className='btn btn-primary mx-auto'
					>
						Send
					</button>
					<Link to="/login">
						<button className='btn btn-secondary mx-3'>
							Cancel
						</button>
                	</Link>
				</div>
			</div>
			
		);
	};

	const showSuccessMessage = () => {
		return CardResponse(`A reset link has been sent to this email: ${success}`, 'Back to Login', '/login');
	}

	const showErrorMessage = () => {
		if (error === true) {
			return (
				<div className="alert alert-danger text-center">Email is not registered!</div>
			);
		}
	};

	const viewForgotPassword = () => {
		if (success !== false) {
			return showSuccessMessage();
		}
		return showForgotPassword();
	}

	return (
		<Layout>
			<div className='container mt-5'>
				<div className='row'>
					{viewForgotPassword()}
				</div>
			</div>			
		</Layout>
	); 
};

export default ForgotPassword;
