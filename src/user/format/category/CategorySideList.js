import React, { Fragment } from 'react';
import { Card, Container, Image, Col, Row } from 'react-bootstrap';
import { IMAGE_API } from '../../../config';
import _ from 'lodash';
import { Link } from 'react-router-dom';

const CategoryCard = (aData) => {

    const arrangeCategories = (aData) => {
        return aData.map((aCategories, iIndex) => {
            return (
                <Fragment key={iIndex}>
                    <p className="mb-0" key={iIndex}><input type="checkbox" className="mr-2"></input>{aCategories.name}</p>
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