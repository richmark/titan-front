import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import { getReviewsByProductId, updateReview, getReviewsByProductIdCount } from './reviewsApi';
import { isAuthenticated } from '../../../auth/authUtil';
import _ from 'lodash';
import oMoment from 'moment';
import DataTable from "react-data-table-component";

const ReviewedProduct = ({ match }) => {

    const {sToken, user} = isAuthenticated();
    const [review_count, setReviewCount] = useState(false);
    const [reviews, setReviews] = useState(false);
    const [originalReviews, setOriginalReviews] = useState(false);
    const [queryString, setQueryString] = useState("");

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
                oData.data = oData.data.map(oItem => {
                    oItem.user['name'] = `${oItem.user.first_name} ${oItem.user.last_name}`
                    return oItem;
                });
                setReviews(oData.data);
                setOriginalReviews(oData.data);
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

    const handleFilterClick = oEvent => {
        setQueryString("");
    };

    const handleSearchQueryChange = oEvent => {
        var sQueryString = oEvent.target.value;
        setQueryString(sQueryString);
        if (sQueryString !== "") {
            var aResult = filterSearch(sQueryString);
            setReviews(aResult);
            return;
        }
        setReviews(originalReviews);
    };

    const filterSearch = sQueryString => {
        sQueryString = sQueryString.toLowerCase();
        var results = [];
        for (var j = 0; j < originalReviews.length; j++) {
            var sName = originalReviews[j].user.name.toLowerCase();
            if (sName.indexOf(sQueryString) !== -1) {
                results.push(originalReviews[j]);
            }
        }

        return results;
    };

    const showReviews = () => {
        const oData = reviews;
        const oColumns = [
            {
                name: "User Name",
                cell: oRow => {
                    return (
                        <Fragment>
                          {oRow.user.first_name} {oRow.user.last_name}
                        </Fragment>
                    );
                }
            },
            {
                name: "Description",
                selector: 'comment'
            },
            {
                name: "Rate",
                selector: 'rate',
                sortable: true,
                cell: oRow => {
                    return (
                        <Fragment>
                            {getRating(oRow.rate)}
                        </Fragment>
                    );
                }
            },
            {
                name: "Date Created",
                selector: "createdAt",
                sortable: true,
                format: oRow => oMoment(oRow.createdAt).format('LLL')
            },
            {
                name: "Visibility",
                cell: oRow => {
                    return (
                        <Fragment>
                            <input type="checkbox" onChange={submitReview(oRow._id)} defaultChecked={oRow.visibility} />
                        </Fragment>
                    );
                }
            }
        ];

        return (
            <Fragment>
                <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="form-group row">
                        <label htmlFor="product-name" className="col-sm-2 col-form-label">User name</label>
                        <div className="col-sm-5">
                            <div className="input-group">
                            <input type="text"
                            className="form-control bg-light border-0 small"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                            value={queryString}
                            onChange={handleSearchQueryChange}
                            />
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
                        </div>
                        <DataTable
                            title={"Product Reviews"}
                            columns={oColumns}
                            data={oData}
                            pagination={true}
                            striped
                            // selectableRows
                            keyField='_id'
                            // onSelectedRowsChange={handleSelectToggle}
                            selectableRowsNoSelectAll={true}
                        />
                    </div>
                    </div>
                </div>
            </Fragment>
        )
    };

    return (
        <DashboardLayout name='Review Management' detail={[<a href='/admin/reviews'>All Reviews</a>, ' / Verify Reviews']}>
            {reviews && showReviews()}
        </DashboardLayout>
    );
}

export default ReviewedProduct;
