import React, { Fragment, useEffect, useState } from 'react';
import { getWholesaler, updateWholesaler } from './wholesalersApi';
import { isAuthenticated } from '../../../auth/authUtil';
import DashboardLayout from '../DashboardLayout';
import { IMAGE_API } from '../../../config';

const ProcessWholesaler = ({ match }) => {
    const [data, setData] = useState({});
    const [result, setResult] = useState(undefined);
    const { sToken, user } = isAuthenticated();
    const init = () => {
        getWholesaler(user._id, sToken, match.params.wholesalerId).then(oData => {
            if(oData.error) {
                console.log(oData.error)
            } else {
                setData(oData.data);
            }
        });
    };
    const acceptUser = (oEvent) => {
        oEvent.preventDefault();
        updateWholesaler(user._id, sToken, match.params.wholesalerId, true).then(oData => {
            if(oData.error) {
                console.log(oData.error)
            } else {
                setResult(oData.data.verified_admin);
            }
        });
    };
    const rejectUser = (oEvent) => {
        oEvent.preventDefault();
        updateWholesaler(user._id, sToken, match.params.wholesalerId, false).then(oData => {
            if(oData.error) {
                console.log(oData.error)
            } else {
                setResult(oData.data.verified_admin);
            }
        });
    };
    const showResult = () => {
        return result !== undefined && (
            <div className='alert alert-info'>
                {`User status: ${result === true ? 'accepted' : 'pending'}`}
            </div>
        );
    };
    useEffect(() => {
        init();
    }, []);
    const showProcessWholesaler = () => {
        return (
            <Fragment>
                <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
                    {showResult()}
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-4 col-md-4 col-xl-4">
                                    <h5>User Details</h5>
                                    <p>User status: <span>{data.verified_admin ?  'Verified' : 'Pending'}</span></p>
                                    <p>Name: <span>{data.first_name} {data.last_name}</span></p>
                                    <p>Company Name: <span>{data.company_name}</span></p>
                                    <p>Company Address: <span>{data.company_address}</span></p>
                                    <p>TIN: <span>{data.tin}</span></p>
                                    <p>Phone: <span>{data.mobile_number}</span></p>
                                    <p>Email: <span>{data.email}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <h5>Images</h5>
                            <div className="row text-center">
                                <div className="col-sm-4 col-md-4 col-xl-4">
                                    <p>Store Front</p>
                                    <img src={`${IMAGE_API}/images/users/${data.store_front}`} style={{width: '50%'}} />
                                </div>
                                <div className="col-sm-4 col-md-4 col-xl-4">
                                    <p>Company BIR 2307</p>
                                    <img src={`${IMAGE_API}/images/users/${data.company_bir}`} style={{width: '50%'}} />
                                </div>
                                <div className="col-sm-4 col-md-4 col-xl-4">
                                    <p>Mayor's Permit</p>
                                    <img src={`${IMAGE_API}/images/users/${data.mayor_permit}`} style={{width: '50%'}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-inline mb-2 px-3">
                    <button onClick={acceptUser} className="btn btn-primary mr-2">Accept</button>
                    <button onClick={rejectUser} className="btn btn-primary">Pending</button>
                </div>
            </Fragment>
        );
    };
    return (
        <DashboardLayout
            name='Wholesale User Application'
            detail='All Wholesale User'
        >
            {showProcessWholesaler()}
        </DashboardLayout>
    );
}

export default ProcessWholesaler;
