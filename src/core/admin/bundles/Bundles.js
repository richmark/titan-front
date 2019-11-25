import React, { Fragment } from 'react';
import DashboardLayout from '../DashboardLayout';

const Bundles = () => {
    const showBundles = () => {
        return (
            <Fragment>
                <div className='col-md-12 col-sm-12 col-xl-12 mb-4'>
                    <div className='card border-left-primary shadow h-100 py-2'>
                        <div className='card-body'>
                            <h4>Search and filter</h4>
                            <div className='form-group row'>
                                <label
                                    htmlFor='product-name'
                                    className='col-sm-2 col-form-label'
                                >
                                    Bundle Name
                                </label>
                                <div className='col-sm-5'>
                                    <div className='input-group'>
                                        <input
                                            type='text'
                                            className='form-control bg-light border-0 small'
                                            placeholder='Search'
                                            aria-label='Search'
                                            aria-describedby='basic-addon2'
                                        />
                                        <div className='input-group-append'>
                                            <button
                                                className='btn btn-primary'
                                                type='button'
                                            >
                                                <i className='fas fa-search fa-sm' />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <select
                                id='category'
                                className='btn btn-light border mr-2'
                            >
                                <option disabled defaultValue>
                                    Filter by discount type
                                </option>
                                <option>Percentage</option>
                                <option>Fix value</option>
                            </select>
                            <button className='btn btn-primary'>Filter</button>
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
                                        <th scope='col'>Bundle Name</th>
                                        <th scope='col'>Discount Type</th>
                                        <th scope='col'>Discount Value</th>
                                        <th scope='col'>Date Created</th>
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
        <DashboardLayout name='Bundle Management' detail='All Bundles'>
            {showBundles()}
        </DashboardLayout>
    );
};

export default Bundles;