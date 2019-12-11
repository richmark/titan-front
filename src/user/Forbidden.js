import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../core/Layout';
import { Container, Row, Col, Card } from 'react-bootstrap';


const Forbidden = () => {
    const showForbidden = () => {
        return (
            <Container>
                <Card className="mt-5">
                    <Card.Header className="text-center">
                        <h1>YOU DONT HAVE ACCESS TO THIS PAGE</h1>
                    </Card.Header>
                    <Card.Img variant="bottom" src="https://freefrontend.com/assets/img/403-forbidden-html-templates/403-Page-Forbidden.png" style={{width: 'auto', height: '40%'}} />
                </Card>
            </Container>            
        );
    };
    
	return (
        <Layout>
            {showForbidden()}
        </Layout>
    );
};

export default Forbidden;
