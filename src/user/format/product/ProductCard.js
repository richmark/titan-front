import React, { Fragment } from 'react';
import { Card, Container, Image, Col, Row, Button } from 'react-bootstrap';

const ProductCard = () => {
    
    const aData = [
        {
            name : "Pipe Tools",
            image: "https://titansupertools.com/wp-content/uploads/2019/08/Pipe-Tools.jpg"
        },
        {
            name : "PowerTools",
            image: "https://titansupertools.com/wp-content/uploads/2019/08/Powertools.jpg"
        },
        {
            name : "Welding Machine",
            image: "https://titansupertools.com/wp-content/uploads/2019/03/TITAN-PP-R-Pipe-Welding-75-110mm.jpg"
        },
        {
            name : "Accessories",
            image: "https://titansupertools.com/wp-content/uploads/2019/08/Accessories.jpg"
        },
        {
            name : "PowerTools",
            image: "https://titansupertools.com/wp-content/uploads/2019/08/Powertools.jpg"
        },
        {
            name : "Pipe Tools",
            image: "https://titansupertools.com/wp-content/uploads/2019/08/Pipe-Tools.jpg"
        },
        
    ];

    const showCardBase = (oCategories) => {
        var sImage = (oCategories.image === undefined) ? "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS" : oCategories.image;
        var sName = (oCategories.name === undefined) ? "My Product" : oCategories.name;
        return (
            <Card className="pt-3">
                <Card.Img 
                    variant="top" 
                    src={sImage}
                    style={{width: "100px", height: "100px"}}
                    className="ml-4"  
                />
                <Card.Body>
                    <Card.Title style={{fontSize: "13px"}}>{sName}</Card.Title>
                    <Card.Text style={{fontSize: "12px"}}>
                        ₱ 5000
                    </Card.Text>
                    <Button variant="primary" style={{fontSize: "12px"}}>Add to Cart</Button>
                </Card.Body>
            </Card>
        );
    };

    const showLayout = (aCategories) => {
        return (
            <Container>
                <Row className="mt-2 ml-3 mr-2">
                    <Col sm={{offset:0, span: 12}}>
                        <Row>
                            {aCategories.map((oCategories, iIndex) => {
                                return (
                                    <Col sm={2} key={iIndex}>
                                        {showCardBase(oCategories)}
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
            {showLayout(aData)}
        </Container>
    );    
};

export default ProductCard;