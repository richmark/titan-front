import React, { Fragment, useState, useEffect } from 'react';
import DashboardLayout from '../DashboardLayout';
import { isAuthenticated } from '../../../auth/authUtil';
import { getAllShippers, createShipper } from './shippersApi';
import { Link } from 'react-router-dom';

const Shippers = () => {
    const [result, setResult] = useState(false);
    const {sToken, user} = isAuthenticated();
    const [shippers, setShippers] = useState([]);
    const [values, setValues] = useState({
        shipper_name: '',
        contact_person: '',
        contact_number: '',
        shipper_address: ''
    });
    const {
        shipper_name,
        contact_person,
        contact_number,
        shipper_address
    } = values;

    const loadShippers = () => {
        getAllShippers(user._id, sToken).then(oData => {
            if (oData.error) {
                console.log(oData.error);
            } else {
                setShippers(oData.data);
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
                    shipper_address: ''
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
                                        <th scope='col'>Contact Person</th>
                                        <th scope='col'>Telephone</th>
                                        <th scope='col'>Shipper Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {shippers.length > 0 && shippers.map((oData, iIndex) => (
                                        <tr key={iIndex}>
                                            <th scope='row'>
                                                <input type='checkbox' />
                                            </th>
                                            <td>
                                                <Link to={`shippers/${oData._id}`}>
                                                    {oData.shipper_name}
                                                </Link>
                                            </td>
                                            <td>
                                                {oData.contact_person}
                                            </td>
                                            <td>
                                                {oData.contact_number}
                                            </td>
                                            <td>
                                                {oData.shipper_address}
                                            </td>
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
        <DashboardLayout name='Shipper Management' detail='All Shippers'>
            {showShippers()}
        </DashboardLayout>
    );
};

export default Shippers;
