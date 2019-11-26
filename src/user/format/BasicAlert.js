import React from 'react';
import { Alert, Container } from 'react-bootstrap';

const BasicAlert = (sVariant, sMessage) => {
    return (
        <Container>
            <Alert variant={sVariant} className="text-center">
                {sMessage}
            </Alert>
        </Container>
    );    
};

export default BasicAlert;