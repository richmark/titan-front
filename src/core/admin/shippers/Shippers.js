import React, { Fragment, useState, useEffect } from 'react';
import DashboardLayout from '../DashboardLayout';
import { isAuthenticated } from '../../../auth/authUtil';
import { getAllShippers, createShipper, deleteShipper } from './shippersApi';
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import _ from 'lodash';

const Shippers = () => {
    const [toggleAll, setToggleAll] = useState(false);
    const [result, setResult] = useState(false);
    const {sToken, user} = isAuthenticated();
    const [shippers, setShippers] = useState([]);
    const [selectedShippers, setSelectedShippers] = useState([]);

    const [values, setValues] = useState({
        shipper_name: '',
        contact_person: '',
        contact_number: '',
        shipper_address: '',
        shipper_website: ''
    });

    const {
        shipper_name,
        contact_person,
        contact_number,
        shipper_address,
        shipper_website
    } = values;

    const loadShippers = () => {
        getAllShippers(user._id, sToken).then(oData => {
            if (oData.error) {
                console.log(oData.error);
            } else {
                var aNewObject = (oData.data).map(oItem => ({ ...oItem, checked: false }));
                setShippers(aNewObject);
            }
        });
    }

    const submitShipper = oEvent => {
        oEvent.preventDefault();
        createShipper(user._id, sToken, values).then(oData => {
            if (oData.error) {
                console.log(oData.error);
            } else {
                setValues({
                    shipper_name: '',
                    contact_person: '',
                    contact_number: '',
                    shipper_address: '',
                    shipper_website: ''
                });
                setResult(!result);
                alert('Created Successfully');
            }
        });
    }

    const handleChange = name => oEvent => {
        setValues({ ...values, [name]: oEvent.target.value });
    }

    useEffect(() => {
        loadShippers();
    }, [result]);
    
    const handleSelectToggle = ({ allSelected, selectedCount, selectedRows }) => {
        setSelectedShippers(JSON.parse(JSON.stringify(selectedRows)));
    };

    const submitDelete = () => {
        if (window.confirm('Are you sure you want to delete?') === true) {
            const aShipperIds = _.map(selectedShippers, '_id');
            deleteShipper(user._id, sToken, aShipperIds).then(oData => {
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

    const showShippers = () => {
        const oData = shippers;
        const oColumns = [
            {
                name: "Shipper Name",
                selector: "shipper_name",
                sortable: true,
                cell: oRow => {
                    return (
                      <Fragment>
                        <Link to={`shippers/${oRow._id}`}>
                            {oRow.shipper_name}
                        </Link>
                      </Fragment>
                    );
                }
            },
            {
                name: "Contact Person",
                selector: "contact_person",
                sortable: true
            },
            {
                name: "Telephone",
                selector: "contact_number",
                sortable: true
            },
            {
                name: "Shipper Address",
                selector: "shipper_address",
                sortable: true
            },
            {
                name: "Shipper Website",
                selector: "shipper_website",
                sortable: true,
                cell: oRow => {
                    return (
                        <Fragment>
                            <a href={oRow.shipper_website} target="_blank">
                                {oRow.shipper_website}
                            </a>
                        </Fragment>
                    )
                }
            }
        ];

        return (
            <Fragment>
                <div className='col-md-4 col-sm-4 col-xl-4 mb-4'>
                    <div className='card border-left-primary shadow h-100 py-2'>
                        <div className='card-body'>
                            <div className='form-group row'>
                                <label
                                    htmlFor='inputPassword'
                                    className='col-sm-4 col-form-label'
                                >
                                    Shipper Name
                                </label>
                                <div className='col-sm'>
                                    <input
                                        value={shipper_name}
                                        onChange={handleChange('shipper_name')}
                                        type='text'
                                        className='form-control'
                                        id='inputPassword'
                                    />
                                </div>
                            </div>
                            <div className='form-group row'>
                                <label
                                    htmlFor='inputPassword'
                                    className='col-sm-4 col-form-label'
                                >
                                    Contact Person
                                </label>
                                <div className='col-sm'>
                                    <input
                                        value={contact_person}
                                        onChange={handleChange('contact_person')}
                                        type='text'
                                        className='form-control'
                                        id='inputPassword'
                                    />
                                </div>
                            </div>
                            <div className='form-group row'>
                                <label
                                    htmlFor='inputPassword'
                                    className='col-sm-4 col-form-label'
                                >
                                    Telephone
                                </label>
                                <div className='col-sm'>
                                    <input
                                        value={contact_number}
                                        onChange={handleChange('contact_number')}
                                        type='text'
                                        className='form-control'
                                        id='inputPassword'
                                    />
                                </div>
                            </div>
                            <div className='form-group row'>
                                <label
                                    htmlFor='inputPassword'
                                    className='col-sm-4 col-form-label'
                                >
                                    Shipper Website
                                </label>
                                <div className='col-sm'>
                                    <input value={shipper_website} onChange={handleChange('shipper_website')} className='form-control w-100' />
                                </div>
                            </div>
                            <div className='form-group row'>
                                <label
                                    htmlFor='inputPassword'
                                    className='col-sm-4 col-form-label'
                                >
                                    Address
                                </label>
                                <div className='col-sm'>
                                    <textarea value={shipper_address} onChange={handleChange('shipper_address')} className='form-control w-100' />
                                </div>
                            </div>
                            <button onClick={submitShipper} className='btn btn-primary'>Add</button>
                        </div>
                    </div>
                </div>
                <div className='col-md-12 col-sm-12 col-xl-12 mb-4'>
                    <div className='card border-left-primary shadow h-100 py-2'>
                        <div className='card-body'>
                            {/* <div className='float-left'>
                                <span>10</span> Items
                            </div> */}
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
                    </div>
                </div>
            </Fragment>
        );
    };

    return (
        <DashboardLayout name='Shipper Management' detail='All Shippers'>
            {shippers && showShippers()}
        </DashboardLayout>
    );
};

export default Shippers;
