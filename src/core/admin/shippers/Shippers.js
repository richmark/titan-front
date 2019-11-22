import React, { Fragment } from 'react';
import DashboardLayout from '../DashboardLayout';

const Shippers = () => {
    const showShippers = () => {
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
                                    Address
                                </label>
                                <div className='col-sm'>
                                    <textarea className='form-control w-100' />
                                </div>
                            </div>
                            <button className='btn btn-primary'>Add</button>
                        </div>
                    </div>
                </div>
                <div className='col-md-12 col-sm-12 col-xl-12 mb-4'>
                    <div className='card border-left-primary shadow h-100 py-2'>
                        <div className='card-body'>
                            <div className='float-left'>
                                <span>10</span> Items
                            </div>
                            <div className='float-right mb-2'>
                                <button className='btn btn-danger'>
                                    <i className='fa fa-trash' /> Delete
                                </button>
                            </div>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th scope='col' style={{ width: '3%' }}>
                                            <input type='checkbox' />
                                        </th>
                                        <th scope='col'>Shipper Name</th>
                                        <th scope='col'>Contact Persom</th>
                                        <th scope='col'>Telephone</th>
                                        <th scope='col'>Shipper Person</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope='row'>
                                            <input type='checkbox' />
                                        </th>
                                        <td>Otto</td>
                                        <td>12</td>
                                        <td>1000</td>
                                        <td>Otto</td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>
                                            <input type='checkbox' />
                                        </th>
                                        <td>Thornton</td>
                                        <td>12</td>
                                        <td>1000</td>
                                        <td>Otto</td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>
                                            <input type='checkbox' />
                                        </th>
                                        <td>Name</td>
                                        <td>12</td>
                                        <td>1000</td>
                                        <td>@mdo</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className=' text-center'>
                                <nav aria-label='Page navigation example text-center'>
                                    <ul className='pagination'>
                                        <li className='page-item'>
                                            <a className='page-link'>
                                                Previous
                                            </a>
                                        </li>
                                        <li className='page-item'>
                                            <a className='page-link'>1</a>
                                        </li>
                                        <li className='page-item'>
                                            <a className='page-link'>2</a>
                                        </li>
                                        <li className='page-item'>
                                            <a className='page-link'>3</a>
                                        </li>
                                        <li className='page-item'>
                                            <a className='page-link'>Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    };
    return (
        <DashboardLayout name='Shipper Management' detail='All Shippers'>
            {showShippers()}
        </DashboardLayout>
    );
};

export default Shippers;
