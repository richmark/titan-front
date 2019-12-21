import React, { useEffect, useState, Fragment } from 'react';
import DashboardLayout from '../DashboardLayout';
import { Link } from 'react-router-dom';
import oMoment from 'moment';
import { isAuthenticated } from "../../../auth/authUtil";
import { getOrders } from './ordersApi';

const Orders = () => {

    const { sToken, user } = isAuthenticated();
    const [orders, setOrders] = useState(false);

    const loadAllOrders = () => {
        getOrders(user._id, sToken).then(oOrders => {
            if (oOrders.error) {
                console.log(oOrders.error);
            } else {
                setOrders(oOrders.data);
            }
        });
    };

    useEffect(() => {
        loadAllOrders();
    }, []);

    const showOrders = () => {
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
                                    All Dates
                                </option>
                                <option>September 2019</option>
                            </select>
                            <select
                                id='category'
                                className='btn btn-light border mr-2'
                            >
                                <option disabled defaultValue>
                                    Filter by customer
                                </option>
                            </select>
                            <select
                                id='category'
                                className='btn btn-light border mr-2'
                            >
                                <option disabled defaultValue>
                                    Filter by status
                                </option>
                                <option>Processing</option>
                                <option>Shipped</option>
                                <option>Delivered</option>
                                <option>Cancelled</option>
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
                                        <th scope='col'>Order Number</th>
                                        <th scope='col'>Customer</th>
                                        <th scope='col'>Status</th>
                                        <th scope='col'>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders && orders.map((oOrders, iIndex) => (
                                        <tr key={iIndex}>
                                            <td>
                                                <Link to={`/admin/orders/${oOrders._id}`}>
                                                    {oOrders._id}
                                                </Link>
                                            </td>
                                            <td>{oOrders.user.email}</td>
                                            <td>{oOrders.status}</td>
                                            <td>{oMoment(oOrders.createdAt).format('LLL')}</td>
                                        </tr>    
                                    ))}
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
        <DashboardLayout name='Order Management' detail='All Orders'>
            {showOrders()}
        </DashboardLayout>
    );
};

export default Orders;
