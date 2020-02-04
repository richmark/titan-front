import React, { Fragment, useEffect, useState } from 'react';
import Layout from '../core/Layout';
import { Card, Container, Image, Col, Row } from 'react-bootstrap';
import CategoryCard from './format/category/CategoryCard';

const CategoryList = () => {

    const [aCategories, setCategories] = useState([]);

    const getCategory = (aData) => {
        setCategories(aData);
    }

    const showCategoryLayout = () => {
        return (
            <Container className="border border-black rounded p-5 mt-4">
                {CategoryCard(aCategories)}
            </Container>
        );
    };

    return (
        <Layout oGetCategory={getCategory}>
            {showCategoryLayout()}
        </Layout>
    );    
}

export default CategoryList;