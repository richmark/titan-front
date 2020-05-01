import React, { useEffect, useState, Fragment } from "react";
import { Link } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import oMoment from 'moment';
import { isAuthenticated } from "../../../auth/authUtil";
import { getAllBundles, deleteBundle } from './bundlesApi';
import DataTable from "react-data-table-component";
import _ from 'lodash';

const Bundles = () => {
    const [toggleAll, setToggleAll] = useState(false);
    const [result, setResult] = useState(false);
    const { sToken, user } = isAuthenticated();
    const [bundles, setBundles] = useState(false);
    const [selectedBundles, setSelectedBundles] = useState([]);

    const loadBundles = () => {
        getAllBundles(user._id, sToken).then(oBundles => {
            if (oBundles.error) {
                console.log(oBundles.error);
            } else {
                var aNewObject = (oBundles.data).map(oItem => ({ ...oItem, checked: false }));
                setBundles(aNewObject);
            }
        });
    };

    useEffect(() => {
        loadBundles();
    }, [result]);

    const submitDelete = () => {
        if (window.confirm('Are you sure you want to delete?') === true) {
            const aBundleIds = _.map(selectedBundles, '_id');
            deleteBundle(user._id, sToken, aBundleIds).then(oData => {
                if (oData.error) {
                    console.log(oData);
                } else {
                    alert('Deleted Successfully');
                    setResult(!result);
                    setToggleAll(!toggleAll);
                }
            });
        }
    };

    const handleSelectToggle = ({ allSelected, selectedCount, selectedRows }) => {
        setSelectedBundles(JSON.parse(JSON.stringify(selectedRows)));
    };

    const showBundles = () => {
        const oData = bundles;
        const oColumns = [
            {
                name: "Bundle Name",
                selector: "product_name",
                sortable: true,
                cell: oRow => {
                    return (
                      <Fragment>
                        <Link to={`/admin/bundles/update/${oRow._id}`}>
                            {oRow.product_name}
                        </Link>
                      </Fragment>
                    );
                }
            },
            {
                name: "Bundle Stock",
                selector: "stock",
                sortable: true
            },
            {
                name: "Bundle Price",
                selector: "price",
                sortable: true
            },
            {
                name: "Date Created",
                selector: "createdAt",
                sortable: true,
                format: oRow => oMoment(oRow.createdAt).format('DD-MM-YYYY')
            },
        ];

        return (
            <Fragment>
                <div className='col-md-12 col-sm-12 col-xl-12 mb-4'>
                    <div className='float-right mb-2'>
                        <button onClick={submitDelete} className='btn btn-danger'>
                            <i className='fa fa-trash' /> Delete
                        </button>
                    </div>
                    <DataTable
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
            </Fragment>
        );
    };

    return (
        <DashboardLayout name='Bundle Deals Management' detail='All Bundles'>
            {bundles && showBundles()}
        </DashboardLayout>
    );
};

export default Bundles;
