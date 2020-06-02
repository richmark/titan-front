import React, { Component, useState, useEffect, Fragment } from "react";
import DashboardLayout from "../DashboardLayout";
import DataTable from "react-data-table-component";
import { getOrderProductsByUser } from "../verifiedusers/VerifedUsersApi";
import { isAuthenticated } from "../../../auth/authUtil";
import { IMAGE_API } from "../../../config";
import oMoment from "moment";

const PurchaseHistory = ({ match }) => {
    const { sToken, user } = isAuthenticated();
    const [orderProducts, setOrderProducts] = useState([]);

    useEffect(() => {
        loadPurchaseHistory();
    }, []);

    const loadPurchaseHistory = () => {
        getOrderProductsByUser(user._id, sToken, match.params.userId).then(
            (oData) => {
                if (oData.error) {
                    console.log(oData.error);
                } else {
                    var oOrderProduct = [];
                    oData.data.filter((oOrder) => {
                        oOrder.products.filter((oProducts) => {
                            oOrderProduct.push({
                                _id: oOrder._id,
                                createdAt: oOrder.createdAt,
                                product: oProducts.product,
                            });
                        });
                    });

                    setOrderProducts(oOrderProduct);
                }
            }
        );
    };

    const showDataTable = () => {
        const oData = orderProducts;
        const oColumns = [
            {
                name: "Order ID",
                selector: "_id",
                sortable: true,
            },
            {
                name: "Product Name",
                selector: "product.product_name",
                sortable: true,
            },
            {
                name: "Product Image",
                cell: (oRow) => {
                    return (
                        <Fragment>
                            <img
                                src={`${IMAGE_API}/images/products/${oRow.product.image}`}
                                style={{
                                    width: "25%",
                                }}
                            />
                        </Fragment>
                    );
                },
            },
            {
                name: "Order Date",
                selector: "createdAt",
                sortable: true,
                format: (oRow) => oMoment(oRow.createdAt).format("DD-MM-YYYY")
            }
        ];
        return (
            <Fragment>
                <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
                    <style>{`.bfOOvg { height: auto !important }`}</style>
                    <DataTable
                        columns={oColumns}
                        data={oData}
                        pagination={true}
                        striped
                    />
                </div>
            </Fragment>
        );
    };

    return (
        <DashboardLayout
            name="Purchase History"
            detail={[
                <a href="/admin/verified/users">All Verified Users</a>,
                " / Purchase History",
            ]}
        >
            {showDataTable()}
        </DashboardLayout>
    );
};

export default PurchaseHistory;
