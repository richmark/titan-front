import React, { Fragment, useState, useEffect } from 'react';
import DashboardLayout from '../DashboardLayout';
import { isAuthenticated } from '../../../auth/authUtil';
import { getAllShippers, createShipper, deleteShipper } from './shippersApi';
import { Link } from 'react-router-dom';

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
    
    const handleSelectToggle = oEvent => {
        var sShipperId = oEvent.target.value;
        var iIndexShipper = shippers.findIndex(oItem => oItem._id === sShipperId);
        if (oEvent.target.checked) {
            if (selectedShippers.includes(sShipperId) === false) {
                selectedShippers.push(sShipperId);
                setSelectedShippers(JSON.parse(JSON.stringify(selectedShippers)));
                shippers[iIndexShipper].checked = true;
                setShippers(JSON.parse(JSON.stringify(shippers)));
            }
            return;
        }
        var iIndex = selectedShippers.findIndex(oItem => oItem === sShipperId);
        selectedShippers.splice(iIndex, 1);
        setSelectedShippers(JSON.parse(JSON.stringify(selectedShippers)));
        shippers[iIndexShipper].checked = false;
        setShippers(JSON.parse(JSON.stringify(shippers)));
    };

    const handleSelectAllToggle = oEvent => {
        setToggleAll(!toggleAll);
        if (oEvent.target.checked) {
            var aSelectedData = shippers.map(oItem => ({ ...oItem, checked: true }));
            setShippers(JSON.parse(JSON.stringify(aSelectedData)));
            var aSelectedIds = aSelectedData.map(oItem => oItem._id);
            setSelectedShippers(aSelectedIds);
            return;
        }
        var aSelectedData = shippers.map(oItem => ({ ...oItem, checked: false }));
        setShippers(JSON.parse(JSON.stringify(aSelectedData)));
        setSelectedShippers([]);
    };

    const submitDelete = () => {
        if (window.confirm('Are you sure you want to delete?') === true) {
            deleteShipper(user._id, sToken, selectedShippers).then(oData => {
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
                            <div className='float-left'>
                                <span>10</span> Items
                            </div>
                            <div className='float-right mb-2'>
                                <button onClick={submitDelete} className='btn btn-danger'>
                                    <i className='fa fa-trash' /> Delete
                                </button>
                            </div>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th scope='col' style={{ width: '3%' }}>
                                            <input checked={toggleAll} type='checkbox' onChange={handleSelectAllToggle} />
                                        </th>
                                        <th scope='col'>Shipper Name</th>
                                        <th scope='col'>Contact Person</th>
                                        <th scope='col'>Telephone</th>
                                        <th scope='col'>Shipper Address</th>
                                        <th scope='col'>Shipper Website</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {shippers.length > 0 && shippers.map((oData, iIndex) => (
                                        <tr key={iIndex}>
                                            <th scope='row'>
                                                <input type='checkbox' checked={oData.checked} value={oData._id} onChange={handleSelectToggle}/>
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
                                            <td style={{ width: '126px' }}>
                                                <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', width: '250px', overflow: 'hidden' }}>
                                                    <a href={oData.shipper_website} target="_blank">
                                                        {oData.shipper_website}
                                                    </a>
                                                </div>
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
