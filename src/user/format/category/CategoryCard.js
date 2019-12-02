import React, { Fragment } from 'react';
import { Card, Container, Image, Col, Row } from 'react-bootstrap';

const CategoryCard = () => {

    const aData = [
        {
            name : "Bose"
        },
        {
            name : "Sony"
        },
        {
            name : "AudioPhile"
        },
        {
            name : "Harman"
        },
        
    ];

    const aData2 = [
        {
            name : "Bose"
        },
        {
            name : "Sony"
        },
        {
            name : "AudioPhile"
        },
        {
            name : "Harman"
        },
        
    ];

    const showCardBase = (oCategories) => {
        return (
            <Card className="pt-3">
                <Row>
                    <Col>
                        <Image className="ml-3" 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS" 
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
                        <Row>
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

    return (
        <Fragment>
            {showLayout(aData)}
            {showLayout(aData2)}
        </Fragment>
    );    
};

export default CategoryCard;