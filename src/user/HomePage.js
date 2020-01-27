import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../core/Layout';
import CategoryCard from './format/category/CategoryCard';
import ProductCard from './format/product/ProductCard';
import ProductBundleCarousel from './format/product/ProductBundleCarousel';
import { Container, Row, Col } from 'react-bootstrap';
import { getAllProducts } from '../core/admin/products/productsApi';
import { getTotalCount } from '../core/client/cartHelpers'; 

const HomePage = () => {

    const [iRun, setRun] = useState(getTotalCount());

    const [aCategories, setCategories] = useState([]);
    const [aProducts, setProducts] = useState([]);
    const [aNewArrivals, setNewArrivals] = useState();
    const [aBestSellers, setBestSellers] = useState();

    const init = () => {
        getOurProducts();
        getNewArrivals();
        getBestSellers();
    };

    const getOurProducts = () => {
        getAllProducts(8).then(oData => {
            if (oData.error) {
                console.log(oData.error)
            } else {
                setProducts(oData.data);
            }
        });
    }

    const getNewArrivals = () => {
        getAllProducts(4, 0, 'desc', 'createdAt').then(oData => {
            if (oData.error) {
                console.log(oData.error)
            } else {
                setNewArrivals(oData.data);
            }
        });
    }

    const getBestSellers = () => {
        getAllProducts(4, 0, 'desc', 'sold').then(oData => {
            if (oData.error) {
                console.log(oData.error)
            } else {
                setBestSellers(oData.data);
            }
        });
    }

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

    const getCategory = (aData) => {
        setCategories(aData);
    }
    
	return (
        <Layout oGetCategory={getCategory} run={iRun}>
            {ProductBundleCarousel()}
            {showCategoryLayout()}
            {ProductCard(aNewArrivals, setRun, 'New Arrivals')}
            {ProductCard(aBestSellers, setRun, 'Best Sellers')}
            {ProductCard(aProducts, setRun)}
        </Layout>
    );
};

export default HomePage;
