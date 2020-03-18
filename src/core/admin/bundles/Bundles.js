import React, { useEffect, useState, Fragment } from "react";
import { Link } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import oMoment from 'moment';
import { IMAGE_API } from "../../../config";
import { isAuthenticated } from "../../../auth/authUtil";
import { getAllBundles, deleteBundle } from './bundlesApi';

const Bundles = () => {
    const [toggleAll, setToggleAll] = useState(false);
    const [result, setResult] = useState(false);
    const { sToken, user } = isAuthenticated();
    const [bundles, setBundles] = useState(false);
    const [selectedBundles, setSelectedBundles] = useState([]);

    const loadBundles = () => {
        getAllBundles(user._id, sToken).then(oBundles => {
            if (oBundles.error) {
                console.log(oBundles.error);
            } else {
                var aNewObject = (oBundles.data).map(oItem => ({ ...oItem, checked: false }));
                setBundles(aNewObject);
            }
        });
    };

    useEffect(() => {
        loadBundles();
    }, [result]);

    const submitDelete = () => {
        if (window.confirm('Are you sure you want to delete?') === true) {
            deleteBundle(user._id, sToken, selectedBundles).then(oData => {
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

    const handleSelectAllToggle = oEvent => {
        setToggleAll(!toggleAll);
        if (oEvent.target.checked) {
            var aSelectedData = bundles.map(oItem => ({ ...oItem, checked: true }));
            setBundles(JSON.parse(JSON.stringify(aSelectedData)));
            var aSelectedIds = aSelectedData.map(oItem => oItem._id);
            setSelectedBundles(aSelectedIds);
            return;
        }
        var aSelectedData = bundles.map(oItem => ({ ...oItem, checked: false }));
        setBundles(JSON.parse(JSON.stringify(aSelectedData)));
        setSelectedBundles([]);
    };

    const handleSelectToggle = oEvent => {
        var bundleId = oEvent.target.value;
        var iIndexBanner = bundles.findIndex(oItem => oItem._id === bundleId);
        if (oEvent.target.checked) {
            if (selectedBundles.includes(bundleId) === false) {
                selectedBundles.push(bundleId);
                setSelectedBundles(JSON.parse(JSON.stringify(selectedBundles)));
                bundles[iIndexBanner].checked = true;
                setBundles(JSON.parse(JSON.stringify(bundles)));
            }
            return;
        }
        var iIndex = selectedBundles.findIndex(oItem => oItem === bundleId);
        selectedBundles.splice(iIndex, 1);
        setSelectedBundles(JSON.parse(JSON.stringify(selectedBundles)));
        bundles[iIndexBanner].checked = false;
        setBundles(JSON.parse(JSON.stringify(bundles)));
    };

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
                                <span></span> Items
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
                                        <th scope='col'>Bundle Name</th>
                                        <th scope='col'>Bundle Stock</th>
                                        <th scope='col'>Bundle Price</th>
                                        <th scope='col'>Date Created</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bundles && bundles.map((oBundle, iIndex) => {
                                        return (
                                            <tr key={iIndex}>
                                                <th scope='row'>
                                                    <input checked={oBundle.checked}
                                                        type="checkbox"
                                                        value={oBundle._id}
                                                        onChange={handleSelectToggle}
                                                    />
                                                </th>
                                                <td>
                                                    <Link to={`/admin/bundles/update/${oBundle._id}`}>
                                                        {oBundle.product_name}
                                                    </Link>
                                                </td>
                                                <td>{oBundle.stock}</td>
                                                <td>{oBundle.price}</td>
                                                <td>{oMoment(oBundle.createdAt).format('DD-MM-YYYY')}</td>
                                            </tr>
                                        )
                                    })}
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
