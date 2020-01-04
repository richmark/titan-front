import React, { useState } from 'react';
import Layout from '../core/Layout';
import { sendForgotPassword } from '../core/client/clientApi';
import CardResponse from './format/CardResponse';
import BasicFormInput from './format/BasicFormInput';
import BasicAlert from './format/BasicAlert';
import { REGEX_EMAIL } from '../config';
import { Form, Card, Container, Row, Col, Button } from 'react-bootstrap';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [danger, setDanger] = useState('');
	const sDanger = 'border-danger';

	const submitForm = oEvent => {
		oEvent.preventDefault();
		
		setDanger('');
		var sMessage = '';
		const sValidEmail = REGEX_EMAIL;
		if (email.match(sValidEmail) === null) {
			sMessage += '- Invalid email. \n';
		}

		if (sMessage !== '') {
			setDanger(sDanger);
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

	const showSuccessMessage = () => {
		const sMessage = `A reset link has been sent to this email: ${success}`;
		return CardResponse(sMessage, 'Back to Login', '/login');
	}

	const showErrorMessage = () => {
		if (error === true) {
			console.log(danger);
			return BasicAlert('danger', 'Email not registered!');
		}
	};

	const viewForgotPassword = () => {
		if (success !== false) {
			return showSuccessMessage();
		}
		return showForgotPassword();
	}

	const showForgotPassword = () => {
		return (
			<Row>
				<Col sm={{span: 6, offset: 3}}>
					<Card style={{backgroundColor: '#f6f5f5'}}>
					<Card.Title className="text-center mt-5">
						<h2>Recover your account</h2>
					</Card.Title>
						<Form className="mt-3 align-content-center  mb-5">
							{BasicFormInput('Email', 'email', 'formEmail', handleChange(), [2,1], 7, danger)}
							{showErrorMessage()}
							<Col sm={{span: 4, offset: 4}} className="p-2 mb-2">
								<Button variant="primary" onClick={submitForm} className="mr-2  text-center" type="submit" style={{backgroundColor: 'black', border: '1px solid black'}} block>Send</Button>
							</Col>
						</Form>
					</Card>	
				</Col>
			</Row>
		);
	};

	return (
		<Layout>
			<Container className="mt-5">
				{viewForgotPassword()}	
			</Container>
		</Layout>
	); 
};

export default ForgotPassword;
