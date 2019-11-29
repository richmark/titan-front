import React from 'react';
import { Alert, Container } from 'react-bootstrap';

const BasicAlert = (sVariant, mMessage) => {
    var mDisplay;
    if (typeof mMessage === 'object') {
        mDisplay = mMessage.map((sMessage, iIndex) => {
            return (
                <p key={iIndex} className="p-0 m-0">
                    {sMessage}
                </p>
            );
        });
    } else {
        mDisplay = mMessage;
    }

    return (
        <Container>
            <Alert variant={sVariant} className="text-center">
                {mDisplay}
            </Alert>
        </Container>
    );    
};

export default BasicAlert;