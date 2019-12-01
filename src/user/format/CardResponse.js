import React from 'react';
import { Card, Button, Row, Container, Col } from 'react-bootstrap';

const CardResponse = (sText, sButton, sHref) => {
    return (
        <Container className="mt-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card className="mt-3">
                        <Card.Body className="mx-auto p-5 text-center">
                            <Card.Text >
                                {sText}
                            </Card.Text>
                            <Button sm="6" variant="primary" href={sHref} className="mt-2">{sButton}</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CardResponse;


