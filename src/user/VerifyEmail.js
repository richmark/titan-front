import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { sendConfirmation } from '../core/client/clientApi';

const VerifyEmail = ({ match }) => {

    const [message, setMessage] = useState('Verifying account...');
    const [onlyOne, setOnlyOne] = useState(false);

    if (onlyOne === false) {
        setOnlyOne(true);
        sendConfirmation(match.params.sToken).then(oData => {
            if (oData.type === 'verified') {
                setMessage(oData.msg);
            } else {
                setMessage(oData.msg);
            }
        });
    }

    const showSuccessMessage = () => {
		return (
			<div className="col-sm-5 mx-auto border p-5 text-center mt-5">
				{message}
                <div className="mt-3">
					<Link to="/login">
						<button className="btn btn-primary">Login</button>
					</Link>
				</div>
			</div>
		);
    }
    
    return (
		<Layout>
            {showSuccessMessage()}
		</Layout>
	);
};

export default VerifyEmail;