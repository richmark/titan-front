import React, { Fragment } from 'react';
import { Card, Container, Image, Col, Row } from 'react-bootstrap';
import { IMAGE_API } from '../../../config';
import _ from 'lodash';
import { Link } from 'react-router-dom';

const CategoryCard = (aData, aSideBanner) => {

    const showCardBase = (oCategories) => {
        var sImage = (oCategories.category_image === undefined) ? "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS" : oCategories.category_image;
        return (
            <Link to={`categories/${oCategories._id}`} style={{textDecoration: 'none'}}>
                <Card className="my-2 mx-auto border-1"  style={{background: 'white', width: "225px"}}> 
                    <Row>
                        <Col>
                            <Image
                                className='ml-1' 
                                src={`${IMAGE_API}/images/categories/${sImage}`}
                                style={{width: "200px", height: "200px"}} 
                            />
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                           <p className="text-center" style={{fontSize: "14px", marginTop: '18px', textTransform: 'uppercase', fontFamily: 'Oswald', color: 'black'}}><strong>{oCategories.name}</strong></p>
                        </Col>
                    </Row>
                </Card>
            </Link>
        );
    };

    const showLayout = (aCategories, iIndex) => {
        return (
            <Container>
                <Row>
                    <Col sm={12} md={12} lg={9}>
                        <Row className="mx-auto">
                            {aCategories.map((oCategories, iIndex) => {
                                return (
                                    <Col xs={12} sm={6} md={4} lg={4} key={iIndex} className="pl-0">
                                        {showCardBase(oCategories)}
                                    </Col>
                                );
                            })}
                        </Row>
                    </Col>
                    {aSideBanner[iIndex] !== undefined && 
                        <a href={`${aSideBanner[iIndex].side_banner_link}`} target="_blank">
                            <Col sm={{offset:0, span: 3}} className='d-lg-block d-md-none d-sm-none d-none'>
                                <Image
                                    className='mx-auto' 
                                    src={`${IMAGE_API}/images/sidebanners/${aSideBanner[iIndex].side_banner_image}`}
                                />
                            </Col>
                        </a>
                    }
                </Row>
            </Container>
        );
    }

    /**
     * TODO: add validation if aChunks is empty
     */
    const arrangeCategories = (aData) => {
        const aChunks = _.chunk(aData, 6);
        return aChunks.map((aCategories, iIndex) => {
            return (
                <Fragment key={iIndex}>
                    {showLayout(aCategories, iIndex)}
                </Fragment>
            );
        });
    }

    return (
        <Fragment>
            <div className="category-tab mt-3" style={{background: `url(${IMAGE_API}/images/others/CategoryTab.png) no-repeat 0 0`, height: '85px'}}><strong><p className="mb-0 absolute" style={{position: 'relative', top: '14px', left: '80px', fontSize : '20px', fontFamily : 'Oswald, sans-serif'}}>CATEGORIES</p></strong></div>
            {arrangeCategories(aData)}
        </Fragment>
    );    
};

export default CategoryCard;