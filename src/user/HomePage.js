import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../core/Layout';
import CategoryCard from './format/category/CategoryCard';
import ProductCard from './format/product/ProductCard';
import ProductBundleCarousel from './format/product/ProductBundleCarousel';
import { Container, Row, Col } from 'react-bootstrap';

const HomePage = () => {
    
    const showCategoryLayout = () => {
        return (
            <Container>
                {CategoryCard()}
            </Container>            
        );
    };
    
	return (
        <Layout>
            {ProductBundleCarousel()}
            {showCategoryLayout()}
            {ProductCard()}
        </Layout>
    );
};

export default HomePage;
