import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import { getAllReviews, updateReview, getReviewsPerProductCount  } from './reviewsApi';
import { isAuthenticated } from '../../../auth/authUtil';
import { IMAGE_API } from "../../../config";
import _ from 'lodash';

const Reviews = () => {

    const {sToken, user} = isAuthenticated();
    const [review_count, setReviewCount] = useState(false);
    const [reviews, setReviews] = useState(false);

    const getListReviewCount = () => {
        getReviewsPerProductCount(user._id, sToken).then(oData => {
            if (oData.error) {
                console.log(oData.error);
            } else {
                setReviewCount(oData.data[0].count);
                loadReviews();
            }
        });
    };
    
    const loadReviews = () => {
        getAllReviews(user._id, sToken).then(oData => {
            if (oData.error) {
                console.log(oData.error);
            } else {
                setReviews(oData.data);
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
                        <div className="float-left"><span>{review_count}</span> Items</div>
                        <div className="float-right mb-2">
                            <button className="btn btn-danger"><i className="fa fa-trash" /> Delete</button>
                        </div>
                        <table className="table table-bordered">
                        <thead>
                            <tr>
                            <th scope="col" style={{width: '3%'}}><input type="checkbox" /></th>
                            <th scope="col" style={{width: '10%'}}>Thumbnail</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Reviews</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                reviews &&
                                reviews.map((oItem, iIndex) => {
                                    return (
                                        <tr key={iIndex}>
                                            <th scope="row"><input type="checkbox" /></th>
                                            <td><img src={`${IMAGE_API}/images/products/${oItem.image}`} style={{width: '100%'}} /></td>
                                            <td>
                                                <Link to={`/admin/reviews/${oItem._id}`}>
                                                    {oItem.product_name}
                                                </Link>
                                            </td>
                                            <td>{oItem.count}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        </table>
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

export default Reviews;
