import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../core/Layout';
import CategoryCard from './format/category/CategoryCard';
import ProductCard from './format/product/ProductCard';
import ProductBundleCarousel from './format/product/ProductBundleCarousel';
import { Container, Row, Col } from 'react-bootstrap';
import { getAllCategories } from '../core/admin/categories/categoriesApi';
import { getAllProducts } from '../core/admin/products/productsApi';
import { getTotalCount } from '../core/client/cartHelpers'; 

const HomePage = () => {

    const [iRun, setRun] = useState(getTotalCount());

    const [aCategories, setCategories] = useState([]);
    const [aProducts, setProducts] = useState([]);

    const init = () => {
        getAllCategories().then(oData => {
            if (oData.error) {
                console.log(oData.error)
            } else {
                setCategories(oData.data);
            }
        });

        getAllProducts().then(oData => {
            if (oData.error) {
                console.log(oData.error)
            } else {
                setProducts(oData.data);
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
        <Layout run={iRun}>
            {ProductBundleCarousel()}
            {showCategoryLayout()}
            {ProductCard(aProducts, setRun)}
        </Layout>
    );
};

export default HomePage;
