import React, { Fragment, useEffect, useState } from 'react';
import Layout from '../../../core/Layout';
import { Card, Container, Image, Col, Row } from 'react-bootstrap';
import { getProductByCategory } from '../../../core/admin/products/productsApi';
import ProductCard from '../product/ProductCard';
import { getTotalCount } from '../../../core/client/cartHelpers';

const ProductsByCategory = ({ match }) => {
    const [iRun, setRun] = useState(getTotalCount());
    const [order, setOrder] = useState('desc');
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [values, setValues]= useState({
        size: 0,
        data: false
    });
    const {
        size,
        data
    } = values;

    useEffect(() => {
        requestProducts();
    }, []);

    const showProductsByCategory = () => {
        return (
            <Fragment>
                <Container className="border border-black rounded p-5 mt-4">
                {data && ProductCard(data, setRun)}
                {loadMoreButton()}
                </Container>
            </Fragment>
        );
    };

    const requestProducts = () => {
        getProductByCategory(match.params.categoryId, skip, order).then(oData => {
            if(oData.error) {
                console.log(oData.error);
            } else {
                setValues({...values, ...oData});
                setSkip(skip + limit);
            }
        });
    }
    const loadMore = () => {
        getProductByCategory(match.params.categoryId, skip, order).then(oData => {
            if(oData.error) {
                console.log(oData.error);
            } else {
                setValues({
                    size: oData.size,
                    data: (values.data).concat(oData.data)
                });
                setSkip(skip + limit);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className='btn btn-warning mt-5'>
                    Load more
                </button>
            )
        );
    };

    return (
        <Layout run={iRun}>
            {showProductsByCategory()}
        </Layout>
    );    
}

export default ProductsByCategory;