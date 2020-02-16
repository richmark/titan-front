import React, { useEffect, useState, Fragment } from "react";
import DashboardLayout from '../DashboardLayout';
import { isAuthenticated } from "../../../auth/authUtil";
import { IMAGE_API } from '../../../config';
import { Link } from 'react-router-dom';
import { createBanner, getBanners, deleteBanner } from './bannerApi';
import oMoment from "moment";
import _ from 'lodash';

const Banner = () => {
    const { sToken, user } = isAuthenticated();

    const [result, setResult] = useState(false);

    const [banners, setBanners] = useState([]);

    const [values, setValues] = useState({
        banner_image: '',
        banner_link: '',
        visibility: false,
        formData: ''
    });

    const [selectedBanners, setSelectedBanners] = useState([]);

    const { formData, banner_link, banner_image, visibility } = values;

    const init = () => {
        getBanners(user._id, sToken).then(oData => {
            if(oData.error) {
                console.log(oData.error)
            } else {
                var aNewObject = (oData.data).map(oItem => ({ ...oItem, checked: false }));
                setBanners(aNewObject);
                setValues({ ...values, formData: new FormData() });
            }
        });
    };

    useEffect(() => {
        init();
      }, [result]);

    const submitBanner = (oEvent) => {
        oEvent.preventDefault();
        createBanner(user._id, sToken, formData).then(oData => {
            if (oData.error) {
                console.log(oData);
            } else {
                setValues({ banner_image: '', banner_link: '', visibility: false, formData: new FormData() });
                setResult(!result);
                alert('Created Successfully');
            }
        })
    };

    const handleChange = (name) => (oEvent) => {
        const value = oEvent.target.value;
        setValues({ ...values, [name]: value });
        if (name !== 'banner_image') {
            formData.set(name, value);
            return;
        }
        let oFile = oEvent.target.files[0];
        if (oFile === undefined) {
            formData.set(name, '');
            setValues({
                ...values,
                banner_image: ''
            });
            return;
        }
        formData.set(name, oFile);
    };

    const handleSelectToggle = oEvent => {
        var bannerId = oEvent.target.value;
        var iIndexBanner = banners.findIndex(oItem => oItem._id === bannerId);
        if (oEvent.target.checked) {
            if (selectedBanners.includes(bannerId) === false) {
                selectedBanners.push(bannerId);
                setSelectedBanners(JSON.parse(JSON.stringify(selectedBanners)));
                banners[iIndexBanner].checked = true;
                setBanners(JSON.parse(JSON.stringify(banners)));
            }
            return;
        }
        var iIndex = selectedBanners.findIndex(oItem => oItem === bannerId);
        selectedBanners.splice(iIndex, 1);
        setSelectedBanners(JSON.parse(JSON.stringify(selectedBanners)));
        banners[iIndexBanner].checked = false;
        setBanners(JSON.parse(JSON.stringify(banners)));
    };

    const handleSelectAllToggle = oEvent => {
        if (oEvent.target.checked) {
            var aSelectedData = banners.map(oItem => ({ ...oItem, checked: true }));
            setBanners(JSON.parse(JSON.stringify(aSelectedData)));
            var aSelectedIds = aSelectedData.map(oItem => oItem._id);
            setSelectedBanners(aSelectedIds);
            return;
        }
        var aSelectedData = banners.map(oItem => ({ ...oItem, checked: false }));
        setBanners(JSON.parse(JSON.stringify(aSelectedData)));
        setSelectedBanners([]);
    };

    const submitDelete = () => {
        deleteBanner(user._id, sToken, selectedBanners).then(oData => {
            if (oData.error) {
                console.log(oData);
            } else {
                alert('Deleted Successfully');
                setResult(!result);
            }
        });
    };

    const showAddBanner = () => {
        return (
            <Fragment>
                <div className="col-md-4 col-sm-4 col-xl-4 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <input value={banner_link} onChange={handleChange('banner_link')} type="text" className="form-control bg-light small mb-2" placeholder="Banner Link" />
                            <div className="border p-3 mb-2">
                                <h6>Image Upload</h6>
                                <input value={banner_image} onChange={handleChange('banner_image')} type="file" className="form-control-file" id="exampleFormControlFile1" />
                            </div>
                            <div className="border p-3 mb-2">
                                <h6>Visibility</h6>
                                <input onChange={handleChange('visibility')} type="radio" id="sVisibility2" name="visibility" value={false} checked={!visibility} />Off
                                <input onChange={handleChange('visibility')} type="radio" id="sVisibility1" name="visibility" value={true} className='ml-5' />On
                            </div>
                            <button onClick={submitBanner} className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 col-sm-8 col-xl-8 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="float-right mb-2">
                                <button onClick={submitDelete} className="btn btn-danger"><i className="fa fa-trash" /> Delete</button>
                            </div>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{width: '3%'}}><input onClick={handleSelectAllToggle} type="checkbox" /></th>
                                        <th scope="col" style={{width: '10%'}}>Image</th>
                                        <th scope="col">Banner Link</th>
                                        <th scope="col">Visibility</th>
                                        <th scope="col">Date Created</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        banners.length > 0 &&
                                        banners.map((oBanner, iIndex) => {
                                            return (
                                                <tr key={iIndex}>
                                                    <td>
                                                        <input
                                                            checked={oBanner.checked}
                                                            type="checkbox"
                                                            value={oBanner._id}
                                                            // name="productCheckbox"
                                                            onChange={handleSelectToggle}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Link to={`/admin/banner/update/${oBanner._id}`}>
                                                            <img style={{ width: "100%" }} src={`${IMAGE_API}/images/banners/${oBanner.banner_image}`} />
                                                        </Link>
                                                    </td>
                                                    <td>{oBanner.banner_link}</td>
                                                    <td>
                                                        <Link to={`/admin/banner/update/${oBanner._id}`}>
                                                            {oBanner.visibility ? 'on' : 'off'}
                                                        </Link>
                                                    </td>
                                                    <td>{oMoment(oBanner.createdAt).format("LLL")}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    
                                    {/* {products &&
                                        products.map((oProduct, iIndex) => (
                                        <tr key={iIndex}>
                                            <th scope="row">
                                            <input
                                                type="checkbox"
                                                value={oProduct._id}
                                                name="productCheckbox"
                                                onChange={handleSelectToggle}
                                            />
                                            </th>
                                            <td>
                                            <img
                                                src={`${IMAGE_API}/images/products/${oProduct.image}`}
                                                style={{ width: "100%" }}
                                            />
                                            </td>
                                            <td>
                                            <Link to={`/admin/products/update/${oProduct._id}`}>
                                                {oProduct.product_name}
                                            </Link>
                                            </td>
                                            <td>{oProduct.stock}</td>
                                            <td>{oProduct.price}</td>
                                            <td>{oProduct.category.name}</td>
                                            <td>{oMoment(oProduct.createdAt).format("LLL")}</td>
                                        </tr>
                                        ))} */}
                                    </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    };

    return (
        <DashboardLayout name='Banner Management' detail='Add Banner'>
            {showAddBanner()}
        </DashboardLayout>
    );
};

export default Banner;