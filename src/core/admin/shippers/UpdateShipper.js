import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import { isAuthenticated } from '../../../auth/authUtil';
import { getShipper, updateShipper } from './shippersApi';

const UpdateShipper = ({ match }) => {

    const [result, setResult] = useState(false);
    const {sToken, user} = isAuthenticated();
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

    const handleChange = name => oEvent => {
        setValues({ ...values, [name]: oEvent.target.value });
    }

    const loadShipper = () => {
        getShipper(user._id, sToken, match.params.shipperId).then(oData => {
            if (oData.error) {
                console.log(oData.error);
            } else {
                setValues(oData.data);
            }
        });
    };

    const submitShipper = oEvent => {
        oEvent.preventDefault();
        updateShipper(user._id, sToken, match.params.shipperId, values).then(oData => {
            if (oData.error) {
                console.log(oData.error);
            } else {
                alert('Updated Successfully');
                setResult(!result);
            }
        });
    }

    useEffect(() => {
        loadShipper();
    }, []);

    const redirectPage = () => {
        if (result === true) {
            return <Redirect to="/admin/shippers" />;
        }
    };

    const showUpdateShipper = () => {
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
                            <button onClick={submitShipper} className='btn btn-primary'>Update</button>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    };

    return (
        <DashboardLayout name='Shipper Management' detail='Update Shipper'>
            {showUpdateShipper()}
            {redirectPage()}
        </DashboardLayout>
    );
};

export default UpdateShipper;