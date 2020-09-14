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
        if (bundles && bundles.data.length > 0) {
            return (
                <Fragment>
                    <Container>
                        {bundles && BundleCard(bundles, setRun)}
                        {/* {loadMoreButton()} */}
                    </Container>
                </Fragment>
            );
        }
        return (
            <Fragment>
                <Container>
                    No Bundles Available
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