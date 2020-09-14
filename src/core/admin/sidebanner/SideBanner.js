import React, { useEffect, useState, Fragment } from "react";
import DashboardLayout from '../DashboardLayout';
import { isAuthenticated } from "../../../auth/authUtil";
import { IMAGE_API } from '../../../config';
import { Link } from 'react-router-dom';
import { createSideBanner, getSideBanners, deleteSideBanner } from './sidebannerApi';
import oMoment from "moment";
import _ from 'lodash';
import DataTable from "react-data-table-component";
import { oValidatorLibrary } from "../../../libraries/validatorLibrary";

const SideBanner = () => {

    const { sToken, user } = isAuthenticated();

    const [result, setResult] = useState(false);

    const [sidebanners, setSideBanners] = useState([]);

    const [values, setValues] = useState({
        side_banner_image: '',
        side_banner_link: '',
        visibility: false,
        formData: ''
    });

    const [selectedSideBanners, setSelectedSideBanners] = useState([]);

    const { formData, side_banner_link, side_banner_image, visibility } = values;

    const init = () => {
        getSideBanners(user._id, sToken).then(oData => {
            if(oData.error) {
                console.log(oData.error)
            } else {
                var aNewObject = (oData.data).map(oItem => ({ ...oItem, checked: false }));
                setSideBanners(aNewObject);
                setValues({ ...values, formData: new FormData() });
            }
        });
    };

    useEffect(() => {
        init();
      }, [result]);

    const submitSideBanner = (oEvent) => {
        oEvent.preventDefault();
        var oValidator = oValidatorLibrary();
        oValidator.message('SideBannerLink', getValue('bannerLink'), 'required|valid_url');
        oValidator.message('SideBannerImage', getValue('bannerImage'), 'required');
        if (oValidator.allValid()) {
            createSideBanner(user._id, sToken, formData).then(oData => {
                if (oData.error) {
                    console.log(oData);
                } else {
                    setValues({ side_banner_image: '', side_banner_link: '', visibility: false, formData: new FormData() });
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
        if (name !== 'side_banner_image') {
            formData.set(name, value);
            return;
        }
        let oFile = oEvent.target.files[0];
        if (oFile === undefined) {
            formData.set(name, '');
            setValues({
                ...values,
                side_banner_image: ''
            });
            return;
        }
        formData.set(name, oFile);
    };

    const handleSelectToggle = ({ allSelected, selectedCount, selectedRows }) => {
        setSelectedSideBanners(JSON.parse(JSON.stringify(selectedRows)));
    };

    const submitDelete = () => {
        if (window.confirm('Are you sure you want to delete?') === true) {
            const aSideBannerIds = _.map(selectedSideBanners, '_id');
            deleteSideBanner(user._id, sToken, aSideBannerIds).then(oData => {
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

    const showAddSideBanner = () => {
        const oData = sidebanners;
        const oColumns = [
            {
                name: "Image",
                cell: oRow => {
                    return (
                      <Fragment>
                        <Link to={`/admin/sidebanner/update/${oRow._id}`}>
                            <img style={{ height: "15vh" }} src={`${IMAGE_API}/images/sidebanners/${oRow.side_banner_image}`} />
                        </Link>
                      </Fragment>
                    );
                }
            },
            {
                name: "Side Banner Link",
                selector: "side_banner_link",
                sortable: true,
                cell: oRow => {
                    return (
                        <Fragment>
                            <a href={oRow.side_banner_link} target="_blank">
                                {oRow.side_banner_link.substring(0, 20)}
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
                            <input id="bannerLink" value={side_banner_link} onChange={handleChange('side_banner_link')} type="text" className="form-control bg-light small mb-2" placeholder="Side Banner Link" />
                            <div className="border p-3 mb-2">
                                <h6>Image Upload</h6>
                                <input id="bannerImage" value={side_banner_image} onChange={handleChange('side_banner_image')} type="file" className="form-control-file" />
                            </div>
                            <div className="border p-3 mb-2">
                                <h6>Visibility</h6>
                                <input onChange={handleChange('visibility')} type="radio" id="sVisibility2" name="visibility" value={false} checked={!visibility} />Off
                                <input onChange={handleChange('visibility')} type="radio" id="sVisibility1" name="visibility" value={true} className='ml-5' />On
                            </div>
                            <button onClick={submitSideBanner} className="btn btn-primary">Save</button>
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
        <DashboardLayout name='Banner Management' detail='Side Banners'>
            {showAddSideBanner()}
        </DashboardLayout>
    );
};

export default SideBanner;