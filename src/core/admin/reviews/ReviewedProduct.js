import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import { getReviewsByProductId, updateReview, getReviewsByProductIdCount } from './reviewsApi';
import { isAuthenticated } from '../../../auth/authUtil';
import _ from 'lodash';
import oMoment from 'moment';

const ReviewedProduct = ({ match }) => {

    const {sToken, user} = isAuthenticated();
    const [review_count, setReviewCount] = useState(false);
    const [reviews, setReviews] = useState(false);

    const getListReviewCount = () => {
        getReviewsByProductIdCount(match.params.productId).then(oData => {
            if (oData.error) {
                console.log(oData.error);
            } else {
                setReviewCount(oData.data.count);
                loadReviews();
            }
        });
    };
    
    const loadReviews = () => {
        getReviewsByProductId(match.params.productId).then(oData => {
            if (oData.error) {
                console.log(oData.error);
            } else {
                setReviews(oData.data);
            }
        });
    };

    const getRating = (iRate) => {
        const iCount = 5 - iRate;
        let sCheckedStar = [];
        _.times(iRate, (iIndex) => {
            sCheckedStar.push(<span key={iIndex} className="fa fa-star checked" style={{ color: "orange" }} />);
        });
        
        let sStar = [];
        _.times(iCount, (iIndex) => {
            sStar.push(<span key={iIndex} className="fa fa-star" />);
        });

        return (
            <Fragment>
                {sCheckedStar}
                {sStar}
            </Fragment>
        );
    };
    
    const submitReview = sId => oEvent => {
        updateReview(user._id, sToken, { visibility: oEvent.target.checked }, sId).then(oData => {
            if (oData.error) {
                console.log(oData.error);
            } else {
                alert('Updated Successfully');
            }
        });
    };

    useEffect(() => {
        getListReviewCount();
    }, []);

    const showReviews = () => {
        return (
            <Fragment>
                <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="form-group row">
                        <label htmlFor="product-name" className="col-sm-2 col-form-label">User name</label>
                        <div className="col-sm-5">
                            <div className="input-group">
                            <input type="text" className="form-control bg-light border-0 small" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button">
                                <i className="fas fa-search fa-sm" />
                                </button>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="row">
                        <div className="float-left col-sm-12 col-md-12 col-xl-12 mb-4"><span>{review_count}</span> Items</div>
                            {
                                reviews && reviews.map((oData, iIndex) => {
                                    return (
                                        <div key={iIndex} className="col-sm-12 col-md-12 col-xl-12 mb-4">
                                            <div className="text-right mt-3 w-25 float-right">
                                            {oMoment(oData.createdAt).format('LLL')}
                                            </div>
                                            <div className="text-left mt-3">
                                            {oData.user.email}
                                            </div>
                                            <div className="border rounded p-3">
                                            {oData.comment}
                                            </div>
                                            <div id="rating" className="text-right mt-3 w-25 float-right">
                                                {
                                                    getRating(oData.rate)
                                                }
                                            </div>
                                            <div id="rating" className="text-left mt-3">
                                                <input type="checkbox" onChange={submitReview(oData._id)} defaultChecked={oData.visibility} />Visible
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className=" text-center">
                        <nav aria-label="Page navigation example text-center">
                            <ul className="pagination">
                            <li className="page-item"><a className="page-link">Previous</a></li>
                            <li className="page-item"><a className="page-link">1</a></li>
                            <li className="page-item"><a className="page-link">2</a></li>
                            <li className="page-item"><a className="page-link">3</a></li>
                            <li className="page-item"><a className="page-link">Next</a></li>
                            </ul>
                        </nav>
                        </div>
                    </div>
                    </div>
                </div>
            </Fragment>
        )
    };
    return (
        <DashboardLayout name='Review Management' detail='All Reviews / Verify Reviews'>
            {showReviews()}
        </DashboardLayout>
    );
}

export default ReviewedProduct;
