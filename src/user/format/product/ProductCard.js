import React from 'react';
import { Card, Container, Col, Row, Button } from 'react-bootstrap';
import { IMAGE_API } from '../../../config';
import { Link } from 'react-router-dom';
import { addItem, getTotalCount } from '../../../core/client/cartHelpers'; 


const ProductCard = (aData, setRun = () => {}) => {
    var sHeader = 'Our Products';
    if (window.location.pathname.split('/')[1] === 'search' && window.location.pathname.split('/')[2] === 'result') {
        sHeader = 'Result';
    }
    const iCount = 1;
    
    const addToCart = (oProduct) => oEvent => {
        oEvent.preventDefault();
        var oData = {
            image : `${IMAGE_API}/images/products/${oProduct.image}`,
            product_name: oProduct.product_name,
            _id: oProduct._id,
            price: oProduct.price,
            description: oProduct.description
        }
        addItem(oData, iCount, () => {
          alert('Item added!');
          setRun(getTotalCount())
        });
    };

    const showCardBase = (oProduct) => {
        var sImage = (oProduct.image === undefined) ? "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS" : oProduct.image;
        var sName = (oProduct.product_name === undefined) ? "My Product" : oProduct.product_name;
        var sStyle = '';
        if (window.location.pathname.split('/')[1] === 'categories') {
            sStyle =  'pl-1';
        }

        if ( sHeader === 'Result') {
            sStyle =  'pl-2';
        }
        return (
            <Card className="pt-3" className="border-0" style={{background: 'transparent'}}>
                <a href={`/product/details/${oProduct._id}`} className="mx-auto">
                    <Card.Img 
                        variant="top" 
                        src={`${IMAGE_API}/images/products/${sImage}`}
                        style={{width: "200px", height: "200px"}}
                    />
                </a>
                <div className="border-bottom border-white mt-2 ml-5 mr-5 boder"></div>
                <Card.Body className={`pt-2 ${sStyle}`}>
                    <button className="default-button  text-center" onClick={addToCart(oProduct)} style={{color: 'white', background: `url(${IMAGE_API}/images/others/Button.png) no-repeat 0px 2px`}}>
                        <p className="ellipsis-button mb-0" style={{color: 'black', fontSize: "1.2vh"}}>Add to Cart</p>
                        <p className="ellipsis-button mb-0" style={{fontSize: "1.5vh"}}>{sName}</p>
                        <p className="ellipsis-button mb-0" style={{fontSize: "1.5vh"}}>{`₱ ${oProduct.price}`}</p>
                    </button>
                </Card.Body>
            </Card>
        );
    };

    const showLayout = (aProducts) => {
        var iSize = 3;
        if (sHeader === 'Result') {
            iSize = 4;
        }
        return (
            <Container>
                <Row className="mt-2 ml-3 mr-2">
                    <Col sm={{offset:0, span: 12}}>
                        <Row>
                            {aProducts && aProducts.map((oProduct, iIndex) => {
                                return (
                                    <Col sm={iSize} key={iIndex}>
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
<div className="category-tab mb-5" style={{background: `url(${IMAGE_API}/images/others/CategoryTab.png) no-repeat 0 0`}}><strong><p className="mb-0 absolute" style={{position: 'relative', top: '43px', left: '50px'}}>{sHeader}</p></strong></div>
            {showLayout(aData)}
        </Container>
    );    
};

export default ProductCard;
