import React, { useState } from 'react';
import Layout from '../core/Layout';
import { sendResetPassword } from '../core/client/clientApi';
import { Link } from 'react-router-dom';
import CardResponse from './format/CardResponse';

const ResetPassword = props => {
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [values, setValues] = useState({
		password: '',
		confirm_password: ''
	});
	const [danger, setDanger] = useState({
		danger_password: '',
		danger_confirm: ''
	});
	const {
		danger_password,
		danger_confirm
	} = danger;
	const { password, confirm_password } = values;
	const submitForm = oEvent => {
		oEvent.preventDefault();
		setError(false);
		const sDanger = 'border-danger';
		var sMessage = '';
		const oDanger = {};
		if (confirm_password !== password) {
			sMessage += '- Password not match \n';
			oDanger.danger_password = sDanger;
			oDanger.danger_confirm = sDanger;
		}

		if (password.length < 8 || password.length > 16) {
			sMessage += '- Password must be atleast 8 characters and max of 16 characters \n';
			oDanger.danger_password = sDanger;
		}

		if (sMessage !== '') {
			setDanger(oDanger);
			return alert(sMessage);
		}

		sendResetPassword(values, props.match.params.tokenId).then(oData => {
			console.log(oData);
			if (oData.error) {
				setError(oData.error);
				console.log(oData.error);
			} else {
				setSuccess(oData.message);
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
					<div className='col-sm-6 border p-5'>
						<h3 className='text-center mb-5'>PASSWORD RESET</h3>
						<div className="row mt-3">
                            <div className="col-sm-3">
                                <label className="mt-2 " htmlFor="exampleInputEmail1">New Password</label>
                            </div>
                            <div className="col-sm">
                            <input
                                value={password}
								onChange={handleChange('password')}
								type='password'
								className={`form-control ${danger_password}`}
								id='exampleInputPassword1'
								placeholder='New Password'
                            />
                            </div>
                        </div>
						<div className="row mt-3">
                            <div className="col-sm-3">
                                <label className="mt-2 " htmlFor="exampleInputEmail1">Confirm Password</label>
                            </div>
                            <div className="col-sm">
                            <input
                                value={confirm_password}
								onChange={handleChange('confirm_password')}
								type='password'
								className={`form-control ${danger_confirm}`}
								id='exampleInputPassword1'
								placeholder='Confirm Password'
                            />
                            </div>
                        </div>
						{showErrorMessage()}
						<div className='align-content-center text-center mt-4'>
							{showConfirmButton()}
							</div>
					</div>
					<div className='col-sm' />
				</div>
			</div>
		);
	};

	const showConfirmButton = () => {
		if (error !== false) {
			return (
				<Link to="/forgotPassword">
					<button className="btn btn-primary mx-auto">
						Try Again
					</button>
				</Link>
			);
		}
		return (		
			<button
				onClick={submitForm}
				type='submit'
				className='btn btn-primary mx-auto'
			>
				Confirm
			</button>
		);
	}

	const showErrorMessage = () => {
		if (error !== false) {
			return (
				<div className="alert alert-danger text-center my-auto">
					{error}
					<p>
						Please check your email or try again.
					</p>
				</div>
			);
		}
	};

	const showSuccessMessage = () => {
		return CardResponse(`${success}`, 'Back to Login', '/login'); 
	}

	const viewLayout = () => {
		if (success !== false) {
			return showSuccessMessage();
		}
		return showResetPassword();
	}

	return (
		<Layout>
			{viewLayout()}
		</Layout>
	);
};

export default ResetPassword;
