import React, { Fragment } from 'react';
import { Card, Container, Image, Col, Row } from 'react-bootstrap';
import { IMAGE_API } from '../../../config';
import _ from 'lodash';
import { Link } from 'react-router-dom';

const BundleCard = (aData) => {

    const showCardBase = (oBundles) => {
        var sImage = (oBundles.image === undefined) ? "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS" : oBundles.image;
        return (
            <a href={`/bundles/${oBundles._id}`}>
                <Card className="pt-3 ml-3 border-0"  style={{background: 'transparent'}}> 
                    <Row>
                        <Col>
                            <Image 
                                src={`${IMAGE_API}/images/products/${sImage}`}
                                style={{width: "200px", height: "200px"}} 
                            />
                        </Col>
                    </Row>
                    <div className="border-bottom border-white mt-2 ml-2 mr-5 boder" style={{width: '180px'}}></div>
                    {showRating(oBundles)}
                    <Row className=" mt-2">
                        <Col>
                            <button className="default-button text-center" style={{color: 'white', background: `url(${IMAGE_API}/images/others/Button.png) no-repeat 0px 2px`}}>
                                <p className="ellipsis-button text-center" style={{fontSize: "16px", marginTop: '18px', textTransform: 'uppercase'}}><strong>{oBundles.product_name}</strong></p>
                            </button>
                        </Col>
                    </Row>
                </Card>
            </a>
        );
    };

    const showLayout = (aBundles) => {
        return (
            <Container>
                <Row className="mt-2 ml-3 mr-2">
                    <Col sm={{offset:0, span: 12}}>
                        <Row className="mb-2">
                            {aBundles.data.map((oBundles, iIndex) => {
                                return (
                                    <Col sm={3} key={iIndex} className="pl-0">
                                        {showCardBase(oBundles)}
                                    </Col>
                                );
                            })}
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }

    const arrangeBundles = (aData) => {
        var aChunks = _.chunk(aData, 4);
        aChunks = aChunks.length === 0 ? [aData] : aChunks;
        return aChunks.map((aBundles, iIndex) => {
            return (
                <Fragment key={iIndex}>
                    {showLayout(aBundles)}
                </Fragment>
            );
        });
    }

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
                <div className="mt-2" style={{marginLeft: '40px'}}>
                    {aItems}
                </div>  
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

    return (
        <Fragment>
            <div className="category-tab mt-3" style={{background: `url(${IMAGE_API}/images/others/CategoryTab.png) no-repeat 0 0`, height: '85px'}}><strong><p className="mb-0 absolute" style={{position: 'relative', top: '14px', left: '80px', fontSize : '20px', letterSpacing: '7px'}}>OUR BUNDLES</p></strong></div>
            {arrangeBundles(aData)}
        </Fragment>
    );
};

export default BundleCard;