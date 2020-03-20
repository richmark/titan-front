import React, { Fragment, useEffect, useState } from 'react';
import Layout from '../../../core/Layout';
import { Card, Container, Image, Col, Row } from 'react-bootstrap';
import { getTotalCount } from '../../../core/client/cartHelpers';
import { getBundleList } from '../../../core/admin/bundles/bundlesApi';
import BundleCard from '../bundle/BundleCard';

const BundleDeals = () => {
    const [iRun, setRun] = useState(getTotalCount());
    const [bundles, setBundles] = useState(false);

    useEffect(() => {
        getBundles();
    }, []);

    const getBundles = () => {
        getBundleList().then(oData => {
            if (oData.error) {
                console.log(oData.error);
            } else {
                setBundles(oData);
            }
        });
    };

    const showBundleDeals = () => {
        return (
            <Fragment>
                <Container className="border border-black rounded p-5 mt-4">
                    <h3>Bundle Deals</h3>
                    {bundles && BundleCard(bundles)}
                    {/* {loadMoreButton()} */}
                </Container>
            </Fragment>
        );
    };

    return (
        <Layout oGetCategory={(()=>{})} run={iRun}>
            {showBundleDeals()}
        </Layout>
    );
};

export default BundleDeals;