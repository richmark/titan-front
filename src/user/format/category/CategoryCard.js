import React, { Fragment } from 'react';
import { Card, Container, Image, Col, Row } from 'react-bootstrap';
import { IMAGE_API } from '../../../config';
import _ from 'lodash';
import { Link } from 'react-router-dom';

const CategoryCard = (aData) => {

    const showCardBase = (oCategories) => {
        var sImage = (oCategories.category_image === undefined) ? "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS" : oCategories.category_image;
        return (
            <Link to={`categories/${oCategories._id}`}>
                <Card className="pt-3 border-0"  style={{background: 'transparent'}}>
                    <Row>
                        <Col>
                            <Image 
                                src={`${IMAGE_API}/images/categories/${sImage}`}
                                style={{width: "200px", height: "200px"}} 
                            />
                        </Col>
                    </Row>
                    <Row className=" mt-2">
                        <Col>
                            <button className="default-button text-center" style={{color: 'white', background: `url(${IMAGE_API}/images/others/Button.png) no-repeat 0px 2px`}}>
                                <p className="text-center ellipsis-button" style={{fontSize: "2vh"}}>{oCategories.name}</p>
                            </button>
                        </Col>
                    </Row>
                </Card>
            </Link>
        );
    };

    const showLayout = (aCategories) => {
        return (
            <Container>
                <Row className="mt-2">
                    <Col sm={{offset:1, span: 9}}>
                        <Row className="mb-2">
                            {aCategories.map((oCategories, iIndex) => {
                                return (
                                    <Col sm={3} key={iIndex}>
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

    const arrangeCategories = (aData) => {
        const aChunks = _.chunk(aData, 4);
        return aChunks.map((aCategories, iIndex) => {
            return (
                <Fragment key={iIndex}>
                    {showLayout(aCategories)}
                </Fragment>
            );
        });
    }

    return (
        <Fragment>
            <div className="category-tab mb-5" style={{background: `url(${IMAGE_API}/images/others/CategoryTab.png) no-repeat 0 0`}}><strong><p className="mb-0 absolute" style={{position: 'relative', top: '43px', left: '50px'}}>Categories</p></strong></div>
            {arrangeCategories(aData)}
        </Fragment>
    );    
};

export default CategoryCard;