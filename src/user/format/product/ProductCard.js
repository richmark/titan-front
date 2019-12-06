import React, { Fragment } from 'react';
import { Card, Container, Image, Col, Row, Button } from 'react-bootstrap';
import { IMAGE_API } from '../../../config';
import { Link } from 'react-router-dom'; 

const ProductCard = (aData) => {

    // const aData = [
    //     {
    //         name : "Pipe Tools",
    //         image: "https://titansupertools.com/wp-content/uploads/2019/08/Pipe-Tools.jpg"
    //     },
    //     {
    //         name : "PowerTools",
    //         image: "https://titansupertools.com/wp-content/uploads/2019/08/Powertools.jpg"
    //     },
    //     {
    //         name : "Welding Machine",
    //         image: "https://titansupertools.com/wp-content/uploads/2019/03/TITAN-PP-R-Pipe-Welding-75-110mm.jpg"
    //     },
    //     {
    //         name : "Accessories",
    //         image: "https://titansupertools.com/wp-content/uploads/2019/08/Accessories.jpg"
    //     },
    //     {
    //         name : "PowerTools",
    //         image: "https://titansupertools.com/wp-content/uploads/2019/08/Powertools.jpg"
    //     },
    //     {
    //         name : "Pipe Tools",
    //         image: "https://titansupertools.com/wp-content/uploads/2019/08/Pipe-Tools.jpg"
    //     },
        
    // ];

    const showCardBase = (oProduct) => {
        var sImage = (oProduct.image === undefined) ? "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS" : oProduct.image;
        var sName = (oProduct.product_name === undefined) ? "My Product" : oProduct.product_name;
        return (
            <Card className="pt-3">
                <Link to={`/product/details/${oProduct._id}`}>
                    <Card.Img 
                        variant="top" 
                        src={`${IMAGE_API}/images/products/${sImage}`}
                        style={{width: "100px", height: "100px"}}
                        className="ml-4"
                    />
                </Link>
                <Card.Body>
                    <Card.Title style={{fontSize: "13px"}}>{sName}</Card.Title>
                    <Card.Text style={{fontSize: "12px"}}>
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

export default ProductCard;