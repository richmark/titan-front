import React, { useEffect, useState, Fragment } from 'react';
import DashboardLayout from '../DashboardLayout';
import { Link } from 'react-router-dom';
import oMoment from 'moment';
import { isAuthenticated } from "../../../auth/authUtil";
import { getOrders } from './ordersApi';
import DataTable from "react-data-table-component";

const Orders = () => {

    const { sToken, user } = isAuthenticated();
    const [orders, setOrders] = useState([]);

    const loadAllOrders = () => {
        getOrders(user._id, sToken).then(oOrders => {
            if (oOrders.error) {
                console.log(oOrders.error);
            } else {
                setOrders(oOrders.data);
            }
        });
    };

    useEffect(() => {
        loadAllOrders();
    }, []);

    const handleSelectToggle = ({ allSelected, selectedCount, selectedRows }) => {
        // setSelectedOrders(JSON.parse(JSON.stringify(selectedRows)));
    };

    const showOrders = () => {
        const oData = orders;
        const oColumns = [
            {
                name: "Order Number",
                selector: "order_number",
                sortable: true,
                cell: oRow => {
                    return (
                      <Fragment>
                        <Link to={`/admin/orders/${oRow._id}`}>
                            {oRow._id}
                        </Link>
                      </Fragment>
                    );
                }
            },
            {
                name: "Payment Reference",
                selector: "reference_number",
                sortable: true,
                cell: oRow => {
                    return (
                      <Fragment>
                            {oRow.reference_number}
                      </Fragment>
                    );
                }
            },
            {
                name: "Customer",
                selector: "user.email",
                sortable: true
            },
            {
                name: "Status",
                selector: "status",
                sortable: true
            },
            {
                name: "Date",
                selector: "createdAt",
                sortable: true,
                format: oRow => oMoment(oRow.createdAt).format('LLL')
            },
        ];

        return (
            <Fragment>
                <div className='col-md-12 col-sm-12 col-xl-12 mb-4'>
                    <div className='card border-left-primary shadow h-100 py-2'>
                        <div className='card-body'>
                            <DataTable
                                columns={oColumns}
                                data={oData}
                                pagination={true}
                                striped
                                // selectableRows
                                keyField='_id'
                                // onSelectedRowsChange={handleSelectToggle}
                                // selectableRowsNoSelectAll={true}
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    };
    return (
        <DashboardLayout name='Order Management' detail='All Orders'>
            {showOrders()}
        </DashboardLayout>
    );
};

export default Orders;
