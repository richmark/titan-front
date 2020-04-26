import React, { useEffect, useState, Fragment } from 'react';
import DashboardLayout from '../DashboardLayout';
import { Link } from 'react-router-dom';
import { isAuthenticated } from "../../../auth/authUtil";
import { getSettings, updateSettings } from './ordersApi';
import { oValidatorLibrary } from "../../../libraries/validatorLibrary";

const OrderSettings = () => {

    const { sToken, user } = isAuthenticated();
    const [oSettings, setSettings] = useState(false);
    const [bRefresh, setRefresh] = useState(false);

    useEffect(() => {
        getSettings().then(oData => {
            if (oData.error) {
                console.log(oData.error);
            } else if (oData.data.length > 0) {
                setSettings(oData.data);
            }
        });
    }, [bRefresh]);

    const submitSave = (oEvent) => {
        oEvent.preventDefault();
        var iDeliveryFee = parseInt(getValue('deliveryFee'), 10);
        var oValidator = oValidatorLibrary();
        oValidator.message('Delivery Fee', iDeliveryFee, 'required|numeric|min:0,num');
        if (oValidator.allValid()) {
            var oDeliveryFee = {
                delivery_fee : iDeliveryFee
            }
            updateSettings(user._id, sToken, oSettings[0]._id, oDeliveryFee).then(oData => {
                if (oData.error) {
                    console.log(oData.error);
                } else {
                    setRefresh(!bRefresh);
                    alert('Price Updated!');
                }
            });
        } else {
            var oError = oValidator.getErrorMessages();
            alert(setErrorMessage(oError));
        }
    }

    const getValue = (sValue) => {
        return document.getElementById(sValue).value.trim();
    }

    const setErrorMessage = (oError) => {
        var aMessage = [];
        Object.keys(oError).map(mKey => {
            aMessage.push((typeof oError[mKey] === 'object') ? '' : oError[mKey]); 
        });
        return aMessage;
    };

    const showOrderSettings = () => {
        if (oSettings) {
            return (
                <Fragment>
                    <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <h4 className="ml-2">Manage Settings</h4>
                                <div className="form-group row p-4 mb-0">
                                    <div className="col-sm">
                                        <input
                                            type="text"
                                            className="form-control bg-light small"
                                            placeholder="Delivery Fee"
                                            aria-label="Delivery Fee"
                                            aria-describedby="basic-addon2"
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-sm">
                                        <input
                                            id="deliveryFee"
                                            type="number"
                                            className="form-control bg-light small"
                                            placeholder="Price"
                                            aria-label="Price"
                                            aria-describedby="basic-addon2"
                                        />
                                    </div>
                                    <div className="col-sm">
                                        <button className="btn btn-primary" onClick={submitSave}>Save</button>
                                    </div>   
                                </div>     
                            </div>
                            <div className="col-sm">
                                <table className="table text-center">
                                    <thead>
                                    <tr>
                                        <th scope="col">Delivery Fee</th>
                                        <th scope="col">₱ {oSettings[0].delivery_fee}</th>
                                    </tr>
                                    </thead>
                                </table>    
                            </div>       
                        </div>
                    </div>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <h1>Please set delivery fee in backend</h1>
                </Fragment>
            );
        }
        
    };
    return (
        <DashboardLayout name='Order Management' detail='Order Settings'>
            {showOrderSettings()}
        </DashboardLayout>
    );
};

export default OrderSettings;
