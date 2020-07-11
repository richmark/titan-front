import React, { Fragment } from 'react';
import { Card, Container, Col, Row, Button, Image } from 'react-bootstrap';
import { IMAGE_API } from '../../../config';
import { Link } from 'react-router-dom';
import { addItem, getTotalCount, getProductCount } from '../../../core/client/cartHelpers'; 


const ProductCard = (aData, setRun = () => {}, sName = 'OUR PRODUCTS', setProductBuyNow = () => {}) => {
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
            delivery_price: oProduct.delivery_price
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
                    <Card className="py-3 border-1 mb-2"  style={{background: 'transparent'}}> 
                        <Row>
                            <Col className='text-center'>
                                {showSoldOutImage(oProduct)}
                                <a href={`/product/details/${oProduct._id}`} className="mx-auto">
                                    <Image 
                                        src={`${IMAGE_API}/images/products/${sImage}`}
                                        style={{width: "200px", height: "200px"}} 
                                    />
                                </a>
                            </Col>
                        </Row>
                        <Row style={{ fontFamily: 'Roboto Condensed, sans-serif', fontWeight: 'bold'}}>
                            <Col sm={{offset : 1, span : 12}} style={{fontSize: '.7rem'}}>
                                <p style={{width: '80%'}} className='text-truncate'>{sName}</p>
                            </Col>
                            <Col sm={{offset : 1, span : 12}} style={{fontSize: '.9rem'}}>
                                <p style={{ color : 'red'}}>{`₱${oProduct.price}`}</p>
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
        var oClick = addToCart(oProduct);
        if (oProduct.stock === 0 || oProduct.sold_out === 'T') {
            oClick = showAlertNoStock;
        } 
        return (
            <Row className="ml-1 productCardHide text-center">
                <Col lg={5} className='mr-1 text-center' style={{border : '1px solid rgba(0,0,0,.125)', borderRadius : '.25rem', flex : '1 0 41.67%', maxWidth : '45.67%'}}>
                    <Button onClick={buyNow(oProduct)} variant="" style={{ fontWeight : 'bold',fontSize: '.79rem', color : '#ff6900', fontFamily : 'Oswald, sans-serif'}}>Buy Now</Button>
                </Col>
                <Col lg={5} className='text-center' style={{border: '1px solid #ff6900', backgroundColor: '#ff6900', borderRadius : '.25rem', flex : '1 0 41.67%', maxWidth : '45.67%'}}>
                    <Button className='border-0' onClick={oClick} style={{fontSize: '.79rem', backgroundColor: 'transparent',fontFamily : 'Oswald, sans-serif'}}>Add to Cart</Button>
                </Col>
            </Row>
        );
    }

    /**
     * Put BUY NOW FUNCTION HERE!!!!
     */
    const buyNow = (oProduct) => oEvent => {
        oEvent.preventDefault();
        setProductBuyNow({
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
        });
    }

    const showSoldOutImage = (oProduct) => {
        if (oProduct.stock === 0 || oProduct.sold_out === 'T') {
            return (
                <Fragment>
                    <Image 
                        src={`${IMAGE_API}/images/others/soldout.png`}
                        style={{width: "50px", height: "20px", position: 'absolute', top: '10px', left: '154px'}} 
                    />
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
        <Container>
            <div className="category-tab mt-3" style={{background: `url(${IMAGE_API}/images/others/CategoryTab.png) no-repeat 0 0`, height: '85px'}}><strong><p className="mb-0 absolute" style={{position: 'relative', top: '14px', left: '60px', fontSize : '20px', fontFamily : 'Oswald, sans-serif', fontWeight : 'bold'}}>{sHeader}</p></strong></div>
            {showLayout(aData)}
        </Container>
    );    
};

export default ProductCard;
