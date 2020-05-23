import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import { getAllReviews, updateReview, getReviewsPerProductCount, deleteReview } from './reviewsApi';
import { isAuthenticated } from '../../../auth/authUtil';
import { IMAGE_API } from "../../../config";
import _ from 'lodash';
import DataTable from "react-data-table-component";

const Reviews = () => {

    const {sToken, user} = isAuthenticated();
    const [review_count, setReviewCount] = useState(false);
    const [reviews, setReviews] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [result, setResult] = useState(false);

    const getListReviewCount = () => {
        getReviewsPerProductCount(user._id, sToken).then(oData => {
            if (oData.error) {
                console.log(oData.error);
            } else {
                setReviewCount(oData.data.length ? oData.data[0].count : 0);
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
    }, [result]);

    const handleSelectToggle = ({ allSelected, selectedCount, selectedRows }) => {
        setSelectedProduct(JSON.parse(JSON.stringify(selectedRows)));
    };

    const submitDelete = () => {
        if (window.confirm('Are you sure you want to delete?') === true) {
            const aProductIds = _.map(selectedProduct, '_id');
            deleteReview(user._id, sToken, aProductIds).then(oData => {
                if (oData.error) {
                    console.log(oData);
                } else {
                    alert('Deleted Successfully');
                    setResult(!result);
                }
            });
        }
    };

    const showReviews = () => {
        const oData = reviews;
        const oColumns = [
            {
                name: "Image",
                cell: oRow => {
                    return (
                        <Fragment>
                            <img style={{ width: "20%" }} src={`${IMAGE_API}/images/products/${oRow.image}`} />
                        </Fragment>
                    );
                }
            },
            {
                name: "Product Name",
                cell: oRow => {
                    return (
                        <Link to={`/admin/reviews/${oRow._id}`}>
                            {oRow.product_name}
                        </Link>
                    );
                }
            },
            {
                name: "Reviews",
                selector: "count",
                sortable: true
            }
        ];

        return (
            <Fragment>
                <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            {/* <div className="float-left"><span>{review_count}</span> Item(s)</div> */}
                            <div className="float-right mb-2">
                                <button onClick={submitDelete} className="btn btn-danger"><i className="fa fa-trash" /> Delete</button>
                            </div>
                            <DataTable
                                title={"Reviews"}
                                columns={oColumns}
                                data={oData}
                                pagination={true}
                                striped
                                selectableRows
                                keyField='_id'
                                onSelectedRowsChange={handleSelectToggle}
                                selectableRowsNoSelectAll={true}
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    };
    return (
        <DashboardLayout name='Review Management' detail='All Reviews'>
            {reviews && showReviews()}
        </DashboardLayout>
    );
}

export default Reviews;
