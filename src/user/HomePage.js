import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../core/Layout';
import CategoryCard from './format/category/CategoryCard';
import ProductCard from './format/product/ProductCard';
import ProductBundleCarousel from './format/product/ProductBundleCarousel';
import { Container, Row, Col } from 'react-bootstrap';
import { getAllCategories } from '../core/admin/categories/categoriesApi';

const HomePage = () => {

    const [aCategories, setCategories] = useState([]);

    const init = () => {
        getAllCategories().then(oData => {
            console.log(oData);
            if(oData.error) {
                console.log(oData.error)
              } else {
                setCategories(oData.data);
              }
        });
    };

    useEffect(() => {
        init();
    }, []);
    
    const showCategoryLayout = () => {
        return (
            <Container>
                {CategoryCard(aCategories)}
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
