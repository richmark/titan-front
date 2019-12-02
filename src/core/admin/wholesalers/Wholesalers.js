import React, { Fragment, useEffect, useState } from 'react';
import { getAllWholesalers } from './wholesalersApi';
import { isAuthenticated } from '../../../auth/authUtil';
import DashboardLayout from '../DashboardLayout';
import { Link } from 'react-router-dom'

const Wholesalers = () => {
    const { sToken, user } = isAuthenticated();
    const [wholesalers, setWholesalers] = useState([]);
    const init = () => {
        getAllWholesalers(user._id, sToken).then(oData => {
            if(oData.error) {
                console.log(oData.error)
            } else {
                setWholesalers(oData.data);
            }
        });
    };
    useEffect(() => {
        init();
    }, []);
    const showWholesalers = () => {
        return (
            <Fragment>
                <div className='col-md-12 col-sm-12 col-xl-12 mb-4'>
                    <div className='card border-left-primary shadow h-100 py-2'>
                        <div className='card-body'>
                            <select
                                id='category'
                                className='btn btn-light border mr-2'
                            >
                                <option disabled defaultValue>
                                    Filter by level
                                </option>
                                <option>Bronze</option>
                                <option>Silver</option>
                                <option>Gold</option>
                            </select>
                            <select
                                id='category'
                                className='btn btn-light border mr-2'
                            >
                                <option disabled defaultValue>
                                    Filter by status
                                </option>
                                <option>Processing</option>
                                <option>verified</option>
                            </select>
                            <button className='btn btn-primary'>Filter</button>
                        </div>
                    </div>
                </div>
                <div className='col-md-12 col-sm-12 col-xl-12 mb-4'>
                    <div className='card border-left-primary shadow h-100 py-2'>
                        <div className='card-body'>
                            <div className='float-right'>
                                <span>10</span> Items
                            </div>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Company Name</th>
                                        <th scope='col'>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wholesalers.map((oData, iIndex) => (
                                        <tr key={iIndex}>
                                            <td>
                                                <Link to={`wholesalers/${oData._id}`}>
                                                    {oData.company_name}
                                                </Link>
                                            </td>
                                            <td>{oData.verified_admin ?  'Verified' : 'Pending'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    };
    return (
        <DashboardLayout
            name='Wholesale User Application'
            detail='All Wholesale User'
        >
            {showWholesalers()}
        </DashboardLayout>
    );
};

export default Wholesalers;
