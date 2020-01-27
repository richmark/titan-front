import React, { Fragment } from 'react';
import { Card, Container, Col, Row, Button, Image } from 'react-bootstrap';


const CommentCard = () => {

    return (
        <Container className="border border-black rounded p-5 mt-4">
            <h5 className="mb-4">Comments</h5>
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Sample Name</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Verified Purchase</Card.Subtitle>
                    <Card.Text>
                    Will Order again, masarap sya, lasang yummy
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title>Sample Name</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Verified Purchase</Card.Subtitle>
                    <Card.Text>
                    Will Order again, malakas yung makina, pang malakasan
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );    
};

export default CommentCard;
