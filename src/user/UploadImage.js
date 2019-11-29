import React, { Fragment, useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/authUtil';
import { uploadImage, getImage } from '../core/client/clientApi';
import { IMAGE_API } from '../config';

const UploadImage = () => {
    const [values, setValues] = useState({
        images: new FormData(),
        store_front: '',
        company_bir: '',
        mayor_permit: '',
        user: undefined,
        sToken: undefined
    });

    const { images, store_front, company_bir, mayor_permit, user, sToken } = values;

    const getAllImages = () => {
        const { user, sToken } = isAuthenticated();
        const sPrefix = `${IMAGE_API}/images/users/user-${user._id}`;
        setValues({
            ...values,
            store_front: `${sPrefix}-store_front.jpeg`,
            company_bir: `${sPrefix}-company_bir.jpeg`,
            mayor_permit: `${sPrefix}-mayor_permit.jpeg`,
            user: user,
            sToken: sToken
        });
    };

    useEffect(() => {
        getAllImages();
    }, []);
    
    const clickSubmit = (oEvent) => {
        oEvent.preventDefault();
        uploadImage(user._id, sToken, images).then(oData => {
            if (oData.error) {
                console.log(oData);
            } else {
                console.log(oData);
            }
        })
    };

    const handleChange = (name) => (oEvent) => {
        let oReader = new FileReader();
        let oFile = oEvent.target.files[0];

        oReader.onloadend = () => {
            images.set(name, oFile);
            setValues({
                ...values,
                images: images,
                [name]: oReader.result
            });
        }
        
        if (oFile !== undefined) {
            oReader.readAsDataURL(oFile);
        }
    };

    const handleError = (oEvent) => {
        oEvent.target.onerror = null;
        oEvent.target.src = 'https://ctt.trains.com/sitefiles/images/no-preview-available.png';
    }

    const showResult = () => {
        const sMessage = getMessageResult();
        return (
            <div className="container">
                <div role="alert" className="fade text-center alert alert-info show">
                    {sMessage}
                </div>
            </div>
        );
    };

    const getMessageResult = () => {
        if (user) {
            if (user.store_front === undefined ||
                user.company_bir === undefined ||
                user.mayor_permit === undefined) {
                    return 'Please provide the required images to be entitled as our partner';
            }
            if (user.verified_admin === false) {
                return 'Your account is currently being verified';
            }
        }
    }

    const showUploadImage = () => {
        return (
            <Fragment>
                <div className='container text-center'>
                    <div className='row'>
                        <div className='col-sm' ></div>
                            <div className="col-sm align-content-center text-center">
                                <h4 className="mb-5">Upload Image</h4>
                                <label htmlFor="store_front" className="mr-5 mb-5" style={{cursor: 'pointer'}}>Store Front  <i className="fa fa-upload" /></label><img onError={handleError} className="float-right mr-5" src={store_front} style={{width: '100px', height: '50px'}} />
                                <input onChange={handleChange('store_front')} type="file" name="store_front" id='store_front' style={{opacity: 0, position: 'absolute', zIndex: -1}} /><br />
                                <label htmlFor="company_bir" className="mr-5 mb-5" style={{cursor: 'pointer'}}>Company BIR 2307 <i className="fa fa-upload" /></label><img onError={handleError} className="float-right mr-5" src={company_bir} style={{width: '100px', height: '50px'}} />
                                <input onChange={handleChange('company_bir')} type="file" name="company_bir" id='company_bir' style={{opacity: 0, position: 'absolute', zIndex: -1}} /><br />
                                <label htmlFor="mayor_permit" className="mr-5 mb-5" style={{cursor: 'pointer'}}>Mayor’s Permit <i className="fa fa-upload" /></label><img onError={handleError} className="float-right mr-5" src={mayor_permit} style={{width: '100px', height: '50px'}} />  
                                <input onChange={handleChange('mayor_permit')} type="file" name="mayor_permit" id='mayor_permit' style={{opacity: 0, position: 'absolute', zIndex: -1}} /><br />
                            </div>
                        <div className='col-sm' ></div>
                    </div>
                    <button onClick={clickSubmit} type="button" className="btn btn-success">Upload Images</button>
                </div>
            </Fragment>
        );
    };

    return (
        <Layout title='Upload' description='Upload required images to fully registered'>
            {showResult()}
            {showUploadImage()}
        </Layout>
    );
}

export default UploadImage;
