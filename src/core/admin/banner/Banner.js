import React, { useEffect, useState, Fragment } from "react";
import DashboardLayout from '../DashboardLayout';
import { isAuthenticated } from "../../../auth/authUtil";
import { IMAGE_API } from '../../../config';
import { Link } from 'react-router-dom';
import { createBanner, getBanners, deleteBanner } from './bannerApi';
import oMoment from "moment";
import _ from 'lodash';
import DataTable from "react-data-table-component";
import { oValidatorLibrary } from "../../../libraries/validatorLibrary";

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
        var oValidator = oValidatorLibrary();
        oValidator.message('BannerLink', getValue('bannerLink'), 'required|valid_url');
        oValidator.message('BannerImage', getValue('bannerImage'), 'required');
        if (oValidator.allValid()) {
            createBanner(user._id, sToken, formData).then(oData => {
                if (oData.error) {
                    console.log(oData);
                } else {
                    setValues({ banner_image: '', banner_link: '', visibility: false, formData: new FormData() });
                    setResult(!result);
                    alert('Created Successfully');
                }
            })
        } else {
            var oError = oValidator.getErrorMessages();
            alert(setErrorMessage(oError));
        }
        
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

    const handleSelectToggle = ({ allSelected, selectedCount, selectedRows }) => {
        setSelectedBanners(JSON.parse(JSON.stringify(selectedRows)));
    };

    const submitDelete = () => {
        if (window.confirm('Are you sure you want to delete?') === true) {
            const aBannerIds = _.map(selectedBanners, '_id');
            deleteBanner(user._id, sToken, aBannerIds).then(oData => {
                if (oData.error) {
                    console.log(oData);
                } else {
                    alert('Deleted Successfully');
                    setResult(!result);
                }
            });
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

    const showAddBanner = () => {
        const oData = banners;
        const oColumns = [
            {
                name: "Image",
                cell: oRow => {
                    return (
                      <Fragment>
                        <Link to={`/admin/banner/update/${oRow._id}`}>
                            <img style={{ width: "100%" }} src={`${IMAGE_API}/images/banners/${oRow.banner_image}`} />
                        </Link>
                      </Fragment>
                    );
                }
            },
            {
                name: "Banner Link",
                selector: "banner_link",
                sortable: true,
                cell: oRow => {
                    return (
                        <Fragment>
                            <a href={oRow.banner_link} target="_blank">
                                {oRow.banner_link.substring(0, 20)}
                            </a>
                        </Fragment>
                    )
                }
            },
            {
                name: "Visibility",
                selector: "visibility",
                sortable: true,
                format: oRow => oRow.visibility ? 'on' : 'off'
            },
            {
                name: "Date Created",
                selector: "createdAt",
                sortable: true,
                format: oRow => oMoment(oRow.createdAt).format("LL")
            }
        ];

        return (
            <Fragment>
                <div className="col-md-4 col-sm-4 col-xl-4 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <input id="bannerLink" value={banner_link} onChange={handleChange('banner_link')} type="text" className="form-control bg-light small mb-2" placeholder="Banner Link" />
                            <div className="border p-3 mb-2">
                                <h6>Image Upload</h6>
                                <input id="bannerImage" value={banner_image} onChange={handleChange('banner_image')} type="file" className="form-control-file" />
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
                            <DataTable
                                columns={oColumns}
                                data={oData}
                                pagination={true}
                                striped
                                selectableRows
                                keyField='_id'
                                onSelectedRowsChange={handleSelectToggle}
                                selectableRowsNoSelectAll={true}
                            />
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