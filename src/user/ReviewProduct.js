import React, { useState, useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { Container, Row, Col, Card, ProgressBar, Table, Image, Form, Button  } from 'react-bootstrap';
import { IMAGE_API } from '../config';
import { getProduct } from '../core/admin/products/productsApi';
import { isAuthenticated } from '../auth/authUtil';
import { createReview } from '../core/admin/reviews/reviewsApi';
import { oValidatorLibrary } from '../libraries/validatorLibrary';
import BasicAlert from './format/BasicAlert';

const ProductReview = ({ match }) => {

    const [iStar, setStar] = useState(5);
    const [oProduct, setProduct] = useState(false);
    const [mAlert, setAlert] = useState(false);
    const [bRedirect, setRedirect] = useState(false);

    const sOrderId = match.params.orderId;
    const { sToken, user } = isAuthenticated();

    useEffect(() => {
        getProduct(match.params.productId).then(oData => {
            if (oData.error) {
                console.log(oData.error);
            } else {
                setProduct(oData.data);
            }
        });
    }, []);

    const submitReview = () => {
        setAlert(false);
        var oValidator = oValidatorLibrary();
        const oData = {
            rate: iStar,
            comment: getValue('commentArea')
        }
        oValidator.message('comment', oData.comment, 'required');
        
        if (oValidator.allValid()) {
            sendReview(oData);
        } else {
            setAlert(oValidator.getErrorMessages().comment);
        }
    }

    const redirectUser = () => {
        if (bRedirect === true) {
            return <Redirect to={`/order/detail/${sOrderId}`}/>
        }
    }

    const sendReview = (oParam) => {
        createReview(user._id, sToken, oParam, oProduct._id, sOrderId).then(oData => {
            if (oData.error) {
                console.log(oData.error);
            } else {
                alert('Review submitted!')
                setRedirect(true);
            }
        });
    }

    const showAlert = () => {
        if (mAlert !== false) {
            return BasicAlert('danger', mAlert);
        }
    }

    const getValue = (sValue) => {
        return document.getElementById(sValue).value.trim()
    }

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
        return oProduct && (
            <Container className="mt-5">
                <h2>Write Review</h2>
                <Card className="mt-2">
                    <Row>
                        <Col sm={{span: 6}}>
                            <Container className="m-2">
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
                            <Form.Group controlId="commentArea">
                                <Form.Control as="textarea" rows="3" />
                            </Form.Group>
                        </div>
                        <div>
                            {showAlert()}
                            <Button variant="warning" onClick={submitReview}>Submit Review</Button>
                        </div>
                    </Container>
                </Card>
            </Container>            
        );
    };
    
	return (
        <Layout>
            {showProductReview()}
            {redirectUser()}
        </Layout>
    );
};

export default ProductReview;
