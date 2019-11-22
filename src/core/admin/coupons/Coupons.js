import React, { Fragment } from 'react';
import DashboardLayout from '../DashboardLayout';

const Coupons = () => {
    const showCoupons = () => {
        return (
            <Fragment>
                <div className='col-md-12 col-sm-12 col-xl-12 mb-4'>
                    <div className='card border-left-primary shadow h-100 py-2'>
                        <div className='card-body'>
                            <p>Period of Use</p>
                            <div className='form-row'>
                                <div className='col-md-4 mb-3'>
                                    <label htmlFor='validationDefaultUsername'>
                                        Start
                                    </label>
                                    <div className='input-group'>
                                        <input
                                            type='text'
                                            className='form-control'
                                            id='validationDefaultUsername'
                                            placeholder='YYYY/MM/DD'
                                            aria-describedby='inputGroupPrepend2'
                                            required
                                        />
                                        <div className='input-group-append'>
                                            <span
                                                className='input-group-text'
                                                id='inputGroupPrepend2'
                                            >
                                                <i className='fa fa-calendar-alt' />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4 mb-3'>
                                    <label htmlFor='validationDefaultUsername'>
                                        End
                                    </label>
                                    <div className='input-group'>
                                        <input
                                            type='text'
                                            className='form-control'
                                            id='validationDefaultUsername'
                                            placeholder='YYYY/MM/DD'
                                            aria-describedby='inputGroupPrepend2'
                                            required
                                        />
                                        <div className='input-group-append'>
                                            <span
                                                className='input-group-text'
                                                id='inputGroupPrepend2'
                                            >
                                                <i className='fa fa-calendar-alt' />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <select
                                id='category'
                                className='btn btn-light border mr-2'
                            >
                                <option disabled defaultValue>
                                    Filter by Discount Type
                                </option>
                                <option>All</option>
                                <option>Percentage</option>
                                <option>Fix Value</option>
                            </select>
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
                                        <th scope='col'>Coupon Code</th>
                                        <th scope='col'>Coupon Name</th>
                                        <th scope='col'>Period of use</th>
                                        <th scope='col'>Date Created</th>
                                        <th scope='col'>Discount Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1087334</td>
                                        <td>1087334</td>
                                        <td>Makr</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <td>1087334</td>
                                        <td>1024034</td>
                                        <td>Joven</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <td>1087334</td>
                                        <td>1023124</td>
                                        <td>John</td>
                                        <td>@mdo</td>
                                        <td>@mdo</td>
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
        <DashboardLayout name='Coupon Management' detail='All Coupons'>
            {showCoupons()}
        </DashboardLayout>
    );
};

export default Coupons;
