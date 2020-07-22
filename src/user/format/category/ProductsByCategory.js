import React, { Fragment, useEffect, useState } from 'react';
import Layout from '../../../core/Layout';
import { Card, Container, Image, Col, Row, Button } from 'react-bootstrap';
import { getProductByCategory } from '../../../core/client/productApi';
import ProductCard from '../product/ProductCard';
import { getTotalCount } from '../../../core/client/cartHelpers';

const ProductsByCategory = ({ match }) => {
    const [iRun, setRun] = useState(getTotalCount());
    const [order, setOrder] = useState(-1);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [values, setValues]= useState({
        size: 0,
        data: false
    });
    const sId = match.params.categoryId;
    const [mCategory, setCategory] = useState(false);
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
                {data && mCategory && ProductCard(data, setRun, mCategory)}
                {loadMoreButton()}
            </Fragment>
        );
    };

    const requestProducts = () => {
        getProductByCategory(match.params.categoryId, skip, order).then(oData => {
            if(oData.error) {
                console.log(oData.error);
            } else {
                setValues({
                    size: oData.data.length,
                    data: oData.data
                });
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
                    size: oData.data.length,
                    data: (values.data).concat(oData.data)
                });
                setSkip(skip + limit);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size % limit === 0 && (
                <Row>
                    <Col className="text-center pb-2">
                        <Button variant="warning" onClick={loadMore}>Load More</Button>
                    </Col>
                </Row>
            )
        );
    };

    const getCategoryName = (aCategory) => {
        aCategory.map((oCategory, iIndex) => {
            if (oCategory._id === sId) {
                setCategory(oCategory.name);
                return;
            }
        });
    }

    return (
        <Layout oGetCategory={getCategoryName} run={iRun}>
            {showProductsByCategory()}
        </Layout>
    );
}

export default ProductsByCategory;