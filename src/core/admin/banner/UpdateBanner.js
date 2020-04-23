import React, { useEffect, useState, Fragment } from "react";
import { Redirect } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import { isAuthenticated } from "../../../auth/authUtil";
import { updateBanner, getBannerById } from './bannerApi';
import { oValidatorLibrary } from "../../../libraries/validatorLibrary";

const UpdateBanner = ({ match }) => {

    const [result, setResult] = useState(false);

    const { sToken, user } = isAuthenticated();

    const [values, setValues] = useState({
        banner_image: '',
        banner_link: '',
        visibility: false,
        formData: ''
    });

    const { formData, banner_link, banner_image, visibility } = values;

    const init = () => {
        getBannerById(user._id, sToken, match.params.bannerId).then(oData => {
            if(oData.error) {
                console.log(oData.error)
            } else {
                setValues({ ...values, ...oData.data, formData: new FormData() });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

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

    const submitBanner = (oEvent) => {
        oEvent.preventDefault();
        var oValidator = oValidatorLibrary();
        oValidator.message('BannerLink', getValue('bannerLink'), 'required|valid_url');
        if (oValidator.allValid()) {
            updateBanner(user._id, sToken, formData, match.params.bannerId).then(oData => {
                if (oData.error) {
                    console.log(oData.error);
                } else {
                    setValues({ banner_image: '', banner_link: '', visibility: false, formData: new FormData() });
                    setResult(!result);
                    alert('Updated Successfully');
                }
            })
        } else {
            var oError = oValidator.getErrorMessages();
            alert(setErrorMessage(oError));
        }
        
    };

    const redirectPage = () => {
        if (result === true) {
            return <Redirect to="/admin/banner" />;
        }
    };

    const getValue = (sValue) => {
        return document.getElementById(sValue).value.trim()
    }

    const setErrorMessage = (oError) => {
        var aMessage = [];
        Object.keys(oError).map(mKey => {
            aMessage.push((typeof oError[mKey] === 'object') ? '' : oError[mKey]); 
        });
        return aMessage;
    };

    const showUpdateBanner = () => {
        return (
            <Fragment>
                <div className="col-md-4 col-sm-4 col-xl-4 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <input id="bannerLink" value={banner_link} onChange={handleChange('banner_link')} type="text" className="form-control bg-light small mb-2" placeholder="Banner Link" />
                            <div className="border p-3 mb-2">
                                <h6>Image Upload</h6>
                                <input id="bannerImage" onChange={handleChange('banner_image')} type="file" className="form-control-file"/>
                            </div>
                            <div className="border p-3 mb-2">
                                <h6>Visibility</h6>
                                <input onChange={handleChange('visibility')} type="radio" id="sVisibility2" name="visibility" value={false} checked={!(JSON.parse(visibility))} />Off
                                <input onChange={handleChange('visibility')} type="radio" id="sVisibility1" name="visibility" value={true} checked={JSON.parse(visibility)} className='ml-5' />On
                            </div>
                            <button onClick={submitBanner} className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    };

    return (
        <DashboardLayout name='Banner Management' detail='Update Banner'>
            {showUpdateBanner()}
            {redirectPage()}
        </DashboardLayout>
    );
};

export default UpdateBanner;