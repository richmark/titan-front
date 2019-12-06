import React, { Fragment } from 'react';
import { Card, Container, Image, Col, Row } from 'react-bootstrap';
import { IMAGE_API } from '../../../config';
import _ from 'lodash';

const CategoryCard = (aData) => {

    const showCardBase = (oCategories) => {
        var sImage = (oCategories.category_image === undefined) ? "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS" : oCategories.category_image;
        return (
            <Card className="pt-3">
                <Row>
                    <Col>
                        <Image className="ml-3" 
                            src={`${IMAGE_API}/images/categories/${sImage}`}
                            style={{width: "150px", height: "150px"}} 
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="text-center">{oCategories.name}</p>
                    </Col>
                </Row>
            </Card>
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
            <p>Categories</p>
            {arrangeCategories(aData)}
        </Fragment>
    );    
};

export default CategoryCard;