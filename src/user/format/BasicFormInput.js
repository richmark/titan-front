import React from 'react';
import { Row, Form, Col } from 'react-bootstrap';

const BasicFormInput = (sName, sType, sControlId, oCallback, iLabel = 2, iForm = 6, sError='') => {
    return (
        <Form.Group as={Row} controlId={sControlId}>
        <Form.Label column sm={{ span: iLabel, offset: 1 }} className="text-center">
            {sName}
        </Form.Label>
        <Col sm={{ span: iForm }}>
            <Form.Control type={sType} placeholder={`Enter ${sName}`} className={sError} onChange={oCallback}/>
        </Col>
		</Form.Group>
    );
};

export default BasicFormInput;