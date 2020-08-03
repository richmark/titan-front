import React, { Fragment } from 'react';
import { Card, Container, Col, Row, Button, Image } from 'react-bootstrap';
import { IMAGE_API } from '../../../config';
import { Link } from 'react-router-dom';
import { addItem, getTotalCount, getProductCount } from '../../../core/client/cartHelpers'; 
import './productCard.css';

const ProductCard = (aData, setRun = () => {}, sName, bBorder = false) => {
    var sHeader = sName;
    if (window.location.pathname.split('/')[1] === 'search' && window.location.pathname.split('/')[2] === 'result') {
        sHeader = 'RESULT';
    }
    const iCount = 1;
    
    const addToCart = (oProduct) => oEvent => {
        oEvent.preventDefault();
        var oCount = getProductCount(oProduct._id, oProduct.stock);
        if (oCount.bCount === false) {
            alert('Cannot add product, item is out of stock or item stock is added in cart');
            return;
        }
        var oData = {
            image : `${IMAGE_API}/images/products/${oProduct.image}`,
            product_name: oProduct.product_name,
            _id: oProduct._id,
            price: oProduct.price,
            description: oProduct.description,
            delivery_price: oProduct.delivery_price,
            display_sale: oProduct.display_sale,
            discount_sale: oProduct.discount_sale
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
        if ( sHeader === 'RESULT') {
            sStyle =  'pl-2';
        }
        return (
            <Fragment>
                <div className='productCard'>
                    <Card className="py-3 border-1 mb-2"  style={{background: 'transparent', width: 'inherit'}}>
                        {showSoldOutImage(oProduct)} 
                        <Row>
                            <Col className='text-center'>
                                {showSaleFeature(oProduct)} 
                                <a href={`/product/details/${oProduct._id}`} className="mx-auto">
                                    <Image 
                                        src={`${IMAGE_API}/images/products/${sImage}`}
                                        style={{width: "200px", height: "200px", display: "block", margin: "auto", maxWidth: "100%"}} 
                                    />
                                </a>
                            </Col>
                        </Row>
                        <Row style={{ fontFamily: 'Roboto Condensed, sans-serif', fontWeight: 'bold'}}>
                            <Col sm={{offset : 1, span : 12}} style={{fontSize: '.7rem'}}>
                                <p style={{width: '80%'}} className='text-truncate'>{sName}</p>
                            </Col>
                            <Col sm={{offset : 1, span : 12}} style={{fontSize: '.9rem'}}>
                                <p style={{ color : 'red'}}>{`₱${calculateSalePrice(oProduct)}`}</p>
                            </Col>
                            <Col sm={{offset : 1, span : 12}} style={{fontSize: '.65rem'}}>
                                {showRating(oProduct)}
                            </Col>
                        </Row>
                    </Card>
                {showButtons(oProduct)}
                </div>
            </Fragment>
        );
    };

    /**
     * Show Buy Now and AddtoCard Buttons
     */
    const showButtons = (oProduct) => {
        var oAddCart = addToCart(oProduct);
        var oBuyNow = buyNow(oProduct);
        if (oProduct.stock === 0 || oProduct.sold_out === 'T') {
            oAddCart = showAlertNoStock;
            oBuyNow = showAlertNoStock;
        } 
        return (
            <div className='text-center ATC'>
                <Col onClick={oBuyNow} className='mr-1 text-center' style={{cursor: 'pointer', border : '1px solid rgba(0,0,0,.125)', borderRadius : '.25rem', backgroundColor: 'white'}}>
                    <Button variant="" style={{ fontWeight : 'bold',fontSize: '.79rem', color : '#ff6900', fontFamily : 'Oswald, sans-serif'}}>Buy Now</Button>
                </Col>
                <Col onClick={oAddCart} className='text-center' style={{cursor: 'pointer', marginTop: '4px', border: '1px solid #ff6900', backgroundColor: '#ff6900', borderRadius : '.25rem'}}>
                    <Button className='border-0' style={{fontSize: '.79rem', backgroundColor: 'transparent',fontFamily : 'Oswald, sans-serif'}}>Add to Cart</Button>
                </Col>
            </div>
        );
    }

    /**
     * Put BUY NOW FUNCTION HERE!!!!
     */
    const buyNow = (oProduct) => oEvent => {
        oEvent.preventDefault();
        window.location.href = `/checkout?sType=buyNow&id=${btoa(JSON.stringify({
            ...oProduct,
            image : `${IMAGE_API}/images/products/${oProduct.image}`,
            additional_images: oProduct.additional_images && oProduct.additional_images.map(sImage => `${IMAGE_API}/images/products/${sImage}`) || false,
            product_name: oProduct.product_name,
            price: oProduct.price,
            description: oProduct.description,
            stock: oProduct.stock,
            sold_out : oProduct.sold_out,
            display: oProduct.display,
            delivery_price: oProduct.delivery_price,
            count: 1
        }))}`;
    }

    const showSaleFeature = (oProduct) => {
        if (oProduct.display_sale === 'T' && oProduct.discount_sale > 0) {
            return (
                <Fragment>
                    <div className='px-2 py-1'
                        style={{
                            fontSize: '.6rem', 
                            position: 'absolute', 
                            bottom: '1rem', 
                            left: '2rem', 
                            zIndex : 10,
                            backgroundColor: 'red',
                            color: 'white',
                            borderRadius : '.25rem',
                            fontWeight: 'bold'
                        }} 
                    >Save {oProduct.discount_sale}%</div>
                </Fragment>
            );
        }
    };

    const showSoldOutImage = (oProduct) => {
        if (oProduct.stock === 0 || oProduct.sold_out === 'T') {
            return (
                <Fragment>
                    <div className='p-1'
                        style={{
                            fontSize: '.6rem', 
                            position: 'absolute', 
                            bottom: '10px', 
                            right: '10px', 
                            zIndex : 10,
                            backgroundColor: 'black',
                            color: 'white',
                            borderRadius : '.25rem',
                            fontWeight: 'bold'
                        }} 
                    >Sold Out</div>
                </Fragment>
            );
        }
    };

    const showAlertNoStock = () => {
        return alert('Product is out of stock.');
    };

    /**
     * Shows Star Rating
     */
    const showRating = (oProduct) => {
        const iRating = 5;
        var iStar = 3;
        var sCheck = 'checked';
        var aItems = [];
        if (oProduct.reviews && oProduct.reviews.length > 0) {
            iStar = calculateAverageRate(oProduct.reviews);
        }
        for (var iLoop = 1; iLoop <= iRating; iLoop++) {
            sCheck = (iLoop <= iStar) ? 'checked' : '';
            aItems.push(<span key={iLoop} className={`fa fa-star mr-2 ${sCheck}`}></span>);
        }
        return (
            <Fragment>
                {aItems}
            </Fragment>
        );
    };

    /**
     * Calculates Average Rate
     */
    const calculateAverageRate = (aRate) => {
        return Math.floor(aRate.reduce((iData, oAdd) => {
            return iData + oAdd.rate
        }, 0) / aRate.length);
    }

    /**
     * Calculate Sale Price
     */
    const calculateSalePrice = (oProduct) => {
        if (oProduct.display_sale === 'T' && oProduct.discount_sale !== 0) {
            return (oProduct.price - (oProduct.price * (oProduct.discount_sale / 100))).toFixed(2);
        }
        return parseFloat(oProduct.price, 10).toFixed(2);
    }

    const showLayout = (aProducts) => {
        var iSize = 3;
        if (sHeader === 'RESULT') {
            iSize = 4;
        }
        return (
            <Container>
                <Row className="mt-2 ml-3 mr-2">
                    <Col sm={{offset:0, span: 12}}>
                        <Row className="mb-2">
                            {aProducts && aProducts.map((oProduct, iIndex) => {
                                return (
                                    <Col lg={iSize} md={6} sm={6} xs={12} key={iIndex} className="pl-0">
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
        <Container className={bBorder === true ? 'border border-black rounded p-4 my-4' : ''}>
            <div className="category-tab mt-3" style={{background: `url(${IMAGE_API}/images/others/CategoryTab.png) no-repeat 0 0`, height: '85px'}}><strong><p className="mb-0 absolute" style={{position: 'relative', top: '14px', left: '60px', fontSize : '20px', fontFamily : 'Oswald, sans-serif', fontWeight : 'bold'}}>{sHeader}</p></strong></div>
            {showLayout(aData)}
        </Container>
    );    
};

export default ProductCard;