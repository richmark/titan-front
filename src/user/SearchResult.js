import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../core/Layout';
import CategoryCard from './format/category/CategoryCard';
import CategorySideList from './format/category/CategorySideList';
import ProductCard from './format/product/ProductCard';
import ProductBundleCarousel from './format/product/ProductBundleCarousel';
import { Container, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { getAllProducts } from '../core/admin/products/productsApi';
import { getTotalCount } from '../core/client/cartHelpers'; 

const SearchResult = () => {

    const [iRun, setRun] = useState(getTotalCount());

    const [aCategories, setCategories] = useState([]);
    const [aProducts, setProducts] = useState([]);

    const init = () => {
        getAllProducts().then(oData => {
            console.log(oData);
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

    const getCategory = (aData) => {
        setCategories(aData);
    }
    
	return (
        <Layout oGetCategory={getCategory} run={iRun}>
            <Container>
                <Row>
                    <Col sm={3}>
                        <div>
                            <div className="border-bottom border-black mt-5 border"></div>
                            <p style={{color: 'black'}} className="mt-1">Categories</p>
                            {CategorySideList(aCategories)}
                            <div className="border-bottom border-black mt-5 border"></div>
                        </div>
                    </Col>
                    <Col sm={9}>
                        {ProductCard(aProducts, setRun)}
                    </Col>
                </Row>    
            </Container>
        </Layout>
    );
};

export default SearchResult;
