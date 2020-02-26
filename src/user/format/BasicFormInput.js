import React from 'react';
import { Row, Form, Col } from 'react-bootstrap';

const BasicFormInput = (sName, sType, sControlId, oCallback, aLabel = [2,0], iForm = 6, sError='', sValue='', sKey='') => {
    return (
        <Form.Group as={Row} controlId={sControlId}>
            <Form.Label column sm={{ span: aLabel[0], offset: aLabel[1] }} className="text-center">
                {sName}
            </Form.Label>
            <Col sm={{ span: iForm }}>
                <Form.Control type={sType} placeholder={`Enter ${sName}`} className={sError} onChange={oCallback} defaultValue={sValue} />
            </Col>
		</Form.Group>
    );
};

export default BasicFormInput;