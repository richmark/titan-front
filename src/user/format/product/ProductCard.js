import React, { Fragment } from 'react';
import { Card, Container, Image, Col, Row, Button } from 'react-bootstrap';
import { IMAGE_API } from '../../../config';
import { Link } from 'react-router-dom'; 

const AdditionalInfo = (aData) => {

    const showCardBase = (oProduct) => {
        var sImage = (oProduct.image === undefined) ? "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS" : oProduct.image;
        var sName = (oProduct.product_name === undefined) ? "My Product" : oProduct.product_name;
        return (
            <Card className="pt-3">
                <Link to={`/product/details/${oProduct._id}`} className="mx-auto">
                    <Card.Img 
                        variant="top" 
                        src={`${IMAGE_API}/images/products/${sImage}`}
                        style={{width: "100px", height: "100px"}}
                    />
                </Link>
                <Card.Body>
                    <Card.Title style={{fontSize: "1.325vh"}}>{sName}</Card.Title>
                    <Card.Text style={{fontSize: "1.2vh"}}>
                        {`₱ ${oProduct.price}`}
                    </Card.Text>
                    <Button variant="primary" style={{fontSize: "12px"}}>Add to Cart</Button>
                </Card.Body>
            </Card>
        );
    };

    const showLayout = (aProducts) => {
        return (
            <Container>
                <Row className="mt-2 ml-3 mr-2">
                    <Col sm={{offset:0, span: 12}}>
                        <Row>
                            {aProducts && aProducts.map((oProduct, iIndex) => {
                                return (
                                    <Col sm={2} key={iIndex}>
                                        {showCardBase(oProduct)}
                                    </Col>
                                );
                            })}
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container>
             <p>Our Products</p>
            {showLayout(aData)}
        </Container>
    );    
};

export default AdditionalInfo;