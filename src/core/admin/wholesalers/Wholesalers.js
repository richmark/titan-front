import React, { Fragment } from 'react';
import DashboardLayout from '../DashboardLayout';

const Wholesalers = () => {
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
                                    <tr>
                                        <td>1087334</td>
                                        <td>Makr</td>
                                    </tr>
                                    <tr>
                                        <td>1024034</td>
                                        <td>Joven</td>
                                    </tr>
                                    <tr>
                                        <td>1023124</td>
                                        <td>John</td>
                                    </tr>
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
