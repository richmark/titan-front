import React, { Fragment } from 'react';
import { Card, Container, Image, Col, Row } from 'react-bootstrap';

const CategoryCard = () => {

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
        
    ];

    const aData2 = [
        {
            name : "Air Tools",
            image: "https://titansupertools.com/wp-content/uploads/2019/08/titan-air-compressor.jpg",
        },
        {
            name : "Automotive",
            image: "https://titansupertools.com/wp-content/uploads/2019/08/Automotive.jpg"
        },
        {
            name : "Construction Machine",
            image: "https://titansupertools.com/wp-content/uploads/2019/08/Contruction.jpg"
        },
        {
            name : "Material Handling",
            image: "https://titansupertools.com/wp-content/uploads/2019/08/Material-Handling.jpg"
        },
        
    ];

    const showCardBase = (oCategories) => {
        var sImage = (oCategories.image === undefined) ? "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQGvHazjKHOSITUSvJC1CUOSWGBZKYbMiEYNZHn5sg007KcVhS" : oCategories.image;
        return (
            <Card className="pt-3">
                <Row>
                    <Col>
                        <Image className="ml-3" 
                        src={sImage}
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