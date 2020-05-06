import React, { useEffect, useState, Fragment } from "react";
import DashboardLayout from "../DashboardLayout";
import { Link } from "react-router-dom";
import oMoment from "moment";
import { isAuthenticated } from "../../../auth/authUtil";
import { getOrders } from "./ordersApi";
import DataTable from "react-data-table-component";
import _ from "lodash";

const Orders = () => {
    const { sToken, user } = isAuthenticated();
    const [orders, setOrders] = useState([]);
	const [filter, setFilter] = useState("All");
	const [queryString, setQueryString] = useState('');
	const [originalOrders, setOriginalOrders] = useState([]);
	
    const loadAllOrders = () => {
        getOrders(user._id, sToken).then((oOrders) => {
            if (oOrders.error) {
                console.log(oOrders.error);
            } else {
				setOrders(oOrders.data);
				setOriginalOrders(oOrders.data);
            }
        });
    };

    useEffect(() => {
        loadAllOrders();
    }, []);

    const handleSelectToggle = ({
        allSelected,
        selectedCount,
        selectedRows,
    }) => {
        // setSelectedOrders(JSON.parse(JSON.stringify(selectedRows)));
    };

    const handleFilterChange = (oEvent) => {
        setFilter(oEvent.target.value);
	};
	
	const handleChangeQuery = (oEvent) => {
		setQueryString(oEvent.target.value);
	}

	const sendSubmit = oEvent => {
		oEvent.persist();

		if (oEvent.key === 'Enter') {
			handleFilterClick(oEvent);
		}
	}

	const handleFilterClick = (oEvent) => {
		oEvent.preventDefault();

		if (filter === 'All') {
			setOrders(originalOrders);
		} else {
			setOrders(filterSearch(queryString));
		}
	};

	const filterSearch = sQueryString => {
		sQueryString = sQueryString.toLowerCase();
		var results = [];

		for (var j = 0; j < originalOrders.length; j++) {

			var sSearchString = originalOrders[j].user.email.toLowerCase();

			if (filter === 'order_number') {
				sSearchString = originalOrders[j]._id.toLowerCase();
			} else if (filter === 'reference_number') {
				sSearchString = originalOrders[j].reference_number.toLowerCase();
			}

			if (sSearchString.indexOf(sQueryString) !== -1) {
				results.push(originalOrders[j]);
			}
		}

		return results;
	};

    const showOrders = () => {
        const oData = orders;
        const oColumns = [
            {
                name: "Order ID",
                sortable: true,
                cell: (oRow) => {
                    return (
                        <Fragment>
                            <Link to={`/admin/orders/${oRow._id}`}>
                                {oRow._id}
                            </Link>
                        </Fragment>
                    );
                },
            },
            {
                name: "Payment Reference",
                selector: "reference_number",
                sortable: true,
                cell: (oRow) => {
                    return <Fragment>{oRow.reference_number}</Fragment>;
                },
            },
            {
                name: "Customer",
                selector: "user.email",
                sortable: true,
            },
            {
                name: "Status",
                selector: "status",
                sortable: true,
            },
            {
                name: "Date",
                selector: "createdAt",
                sortable: true,
                format: (oRow) => oMoment(oRow.createdAt).format("LLL"),
            },
        ];

        return (
            <Fragment>
                <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <h4>Search and Filter</h4>
                            <div className="form-group row">
                                <div className="col-sm-5">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control bg-light border-0 small"
                                            placeholder="Search"
                                            aria-label="Search"
                                            aria-describedby="basic-addon2"
                                              value={queryString}
                                              onChange={handleChangeQuery}
                                              onKeyPress={sendSubmit}
                                        />
                                        <div className="input-group-append">
                                            <span
                                                className="btn btn-primary"
                                                onClick={handleFilterClick}
                                            >
                                                <i className="fas fa-search fa-sm" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <select
                                id="category"
                                className="btn btn-light border mr-2"
                                onChange={handleFilterChange}
                            >
                                <option value="All">Filter By</option>
                                <option value="order_number">Order ID</option>
                                <option value="reference_number">
                                    Payment Reference
                                </option>
                                <option value="email">Customer</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <DataTable
                                columns={oColumns}
                                data={oData}
                                pagination={true}
                                striped
                                // selectableRows
                                keyField="_id"
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
        <DashboardLayout name="Order Management" detail="All Orders">
            {showOrders()}
        </DashboardLayout>
    );
};

export default Orders;
