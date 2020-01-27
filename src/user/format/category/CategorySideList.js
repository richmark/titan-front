import React, { Fragment } from 'react';
import { Card, Container, Image, Col, Row, Form } from 'react-bootstrap';

const CategoryCard = (aData) => {

    const arrangeCategories = (aData) => {
        return aData.map((aCategories, iIndex) => {
            return (
                <Fragment key={iIndex}>
                    <Form.Group className="category-side-list mb-0" controlId={iIndex}>
                        <Form.Check type="checkbox" className="text-uppercase" label={aCategories.name} />
                    </Form.Group>
                </Fragment>
            );
        });
    }

    return (
        <Fragment>
            {arrangeCategories(aData)}
        </Fragment>
    );    
};

export default CategoryCard;