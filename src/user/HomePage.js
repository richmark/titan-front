import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../core/Layout';
import CategoryCard from './format/category/CategoryCard';
import ProductCard from './format/product/ProductCard';
import ProductBundleCarousel from './format/product/ProductBundleCarousel';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { getAllProducts } from '../core/admin/products/productsApi';
import { getTotalCount } from '../core/client/cartHelpers';
import { PRODUCT_LIMIT } from '../config'; 

const HomePage = () => {

    const [iRun, setRun] = useState(getTotalCount());

    const [aCategories, setCategories] = useState([]);
    const [aProducts, setProducts] = useState([]);
    const [aNewArrivals, setNewArrivals] = useState([]);
    const [aBestSellers, setBestSellers] = useState([]);
    const [bLoadButton, setLoadButton] = useState(true);
    const [iOffset, setOffset] = useState(0);

    const iLimit = parseInt(PRODUCT_LIMIT, 10);

    const init = () => {
        getOurProducts(iLimit, iOffset);
        getNewArrivals();
        getBestSellers();
    };

    const populateOurProducts = (aData) => {
        if (aData.length % iLimit > 0 || aData.length === 0) {
            setLoadButton(false);
        } 
        setProducts(aProducts.concat(aData));  
    }

    const runCallBack = (oData, oCallback) => {
        if (oData.error) {
            console.log(oData.error)
        } else {
            oCallback(oData.data);
        }
    }

    const getOurProducts = (iCount = 4, iOffset = 0) => {
        getAllProducts(iCount, iOffset).then(oData => {
            setOffset(iCount + iOffset);
            runCallBack(oData, populateOurProducts);
        });
    }

    const getNewArrivals = () => {
        getAllProducts(4, 0, 'desc', 'createdAt').then(oData => {
            runCallBack(oData, setNewArrivals);
        });
    }

    const getBestSellers = () => {
        getAllProducts(4, 0, 'desc', 'sold').then(oData => {
            runCallBack(oData, setBestSellers);
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

    const showLoadMoreButton = () => {
        if (bLoadButton === true) {
            return (
                <Fragment>
                    <Row>
                        <Col className="text-center">
                            <Button variant="primary" onClick={addMoreProducts}>Load More</Button>
                        </Col>
                    </Row>
                </Fragment>
            );
        }
    }

    const addMoreProducts = () => {
        getOurProducts(iLimit, iOffset);
    }
    
	return (
        <Layout oGetCategory={getCategory} run={iRun}>
            {ProductBundleCarousel()}
            {showCategoryLayout()}
            {ProductCard(aNewArrivals, setRun, 'New Arrivals')}
            {ProductCard(aBestSellers, setRun, 'Best Sellers')}
            {ProductCard(aProducts, setRun)}
            {showLoadMoreButton()}
        </Layout>
    );
};

export default HomePage;
