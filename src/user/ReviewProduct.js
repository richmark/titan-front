import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { Container, Row, Col, Card, ProgressBar, Table, Image, Form, Button  } from 'react-bootstrap';
import { IMAGE_API } from '../config';
import { getProduct } from '../core/admin/products/productsApi';
import { isAuthenticated } from '../auth/authUtil';

const ProductReview = ({ match }) => {

    const [iStar, setStar] = useState(5);
    const [oProduct, setProduct] = useState(false);

    const { sToken, user } = isAuthenticated();

    useEffect(() => {
        getProduct(match.params.productId).then(oData => {
            if (oData.error) {
                console.log(oData.error);
            } else {
                console.log(oData.data);
                setProduct(oData.data);
            }
        });
    }, []);

    const showStar = () => {
        const iRating = 5;
        var sCheck = 'checked';
        var aItems = [];
        for (var iLoop = 1; iLoop <= iRating; iLoop++) {
            sCheck = (iLoop <= iStar) ? 'checked' : '';
            aItems.push(<span key={iLoop} className={`fa fa-star ${sCheck}`} onClick={runStar(iLoop)}></span>);
        }
        return (
            <Fragment>
                {aItems}
            </Fragment>
        );
    }

    const showRating = () => {
        return (
            <Fragment>
                <div id="rating" className="text-center mt-3">
                    {showStar()}
                </div>
            </Fragment>
        );
    }

    const runStar = iRating => oEvent => {
        oEvent.preventDefault();
        setStar(iRating);
    }

    const showProductReview = () => {
        return (
            <Container className="mt-5">
                <h2>Write Review</h2>
                <Card className="mt-2">
                    <Row>
                        <Col sm={{span: 6}}>
                            <Container className="m-2">
                               <strong>Date Delivered:</strong> <span>08/12/19</span><br/>
                               <strong>Rate and Review Product</strong>
                            </Container>
                        </Col>
                    </Row>
                    <hr/>
                    <Container className="text-center p-5">
                        <div>
                            <Row>
                                <Col className="text-right">
                                    <Image src={`${IMAGE_API}/images/products/${oProduct.image}`} rounded style={{height: "200px", width: "200px"}}></Image>
                                </Col>
                                <Col className="text-left">
                                    <p style={{position: "relative", top: "50%", transform: "translateY(-50%)"}}>{oProduct.product_name}</p>
                                </Col>
                            </Row> 
                        </div>
                        {showRating()}
                        <div className="mt-4">
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" rows="3" />
                            </Form.Group>
                        </div>
                        <div>
                            <Button variant="warning">Submit Review</Button>
                        </div>
                    </Container>
                </Card>
            </Container>            
        );
    };
    
	return (
        <Layout>
            {showProductReview()}
        </Layout>
    );
};

export default ProductReview;
