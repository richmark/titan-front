import React, { Component, useState, useEffect, Fragment } from "react";
import DashboardLayout from "../DashboardLayout";
import { isAuthenticated } from "../../../auth/authUtil";
import { createCoupon, checkCouponCode } from "./couponsApi";

import { Redirect } from "react-router-dom";

const AddCoupons = () => {
  const { sToken, user } = isAuthenticated();
  const [sMessage, setMessage] = useState("");

  const [values, setValues] = useState({
    coupon_name: "",
    coupon_name_error: false,
    coupon_code: "",
    coupon_code_error: false,
    coupon_type: "Discount Rate",
    description: "",
    description_error: false,
    discount: "",
    discount_error: false,
    start_date: "",
    start_date_error: false,
    end_date: "",
    end_date_error: false,
    error: false,
    status: true
  });

  const {
    coupon_name,
    coupon_name_error,
    coupon_code,
    coupon_code_error,
    coupon_type,
    description,
    description_error,
    discount,
    discount_error,
    start_date,
    start_date_error,
    end_date,
    end_date_error,
    status,
    error
  } = values;

  const generateCode = iLength => {
    var sResult = "";
    var sCharacters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var iCharacterLength = sCharacters.length;
    for (var i = 0; i < iLength; i++) {
      sResult += sCharacters.charAt(
        Math.floor(Math.random() * iCharacterLength)
      );
    }
    return sResult;
  };

  const validateData = aData => {
    if (aData.coupon_name === "") {
      setError("Coupon name is required!", {
        ...values,
        coupon_name_error: true,
        error: true
      });
      return false;
    }

    if (aData.coupon_name.length > 32) {
      setError("Coupon name can only contain up to 32 characters!", {
        ...values,
        coupon_name_error: true,
        error: true
      });
      return false;
    }

    if (aData.coupon_code.length > 24) {
      setError("Coupon code can only contain up to 24 characters!", {
        ...values,
        coupon_code_error: true,
        error: true
      });
      return false;
    }

    if (aData.coupon_code === "") {
      setError("Coupon code is required!", {
        ...values,
        coupon_code_error: true,
        error: true
      });
      return false;
    }

    if (aData.description === "") {
      setError("Description is required!", {
        ...values,
        description_error: true,
        error: true
      });
      return false;
    }

    if (aData.description.length > 50) {
      setError("Description can only contain up to 50 characters!", {
        ...values,
        description_error: true,
        error: true
      });
      return false;
    }

    if (aData.discount < 0) {
      setError("Discount can not be negative!", {
        ...values,
        discount_error: true,
        error: true
      });
      return false;
    }

    if (aData.discount === "") {
      setError("Discount is required!", {
        ...values,
        discount_error: true,
        error: true
      });
      return false;
    }

    return true;
  };

  const setError = (sMessage, aData) => {
    setMessage(sMessage);
    setValues(aData);
  };

  const handleChange = sName => oEvent => {
    const value = oEvent.target.value;
    setValues({ ...values, [sName]: value });
  };

  const handleSave = oEvent => {
    if (validateData(values)) {
      checkCouponCode(values.coupon_code).then(oData => {
        if (oData.data.length !== 0) {
          setMessage("Coupon code must be unique!");
          setValues({ ...values, coupon_name_error: true, error: true });
          return false;
        }
        createCoupon(user._id, sToken, values).then(oData => {
          if (oData.error) {
            alert("Something went wrong. Please try again");
          } else {
            alert("Coupon created successfully");
          }
        });
      });
    }
  };

  const handleGenerateCode = oEvent => {
    setValues({ ...values, coupon_code: generateCode(8) });
  };

  const showErrorDiv = sMessage => {
    return (
      <div className="alert alert-danger">
        <h6>{sMessage}</h6>
      </div>
    );
  };

  const showAddCouponForm = () => {
    return (
      <Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-sm-6 col-xl-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  {error ? showErrorDiv(sMessage) : ""}
                  <input
                    type="text"
                    onChange={handleChange("coupon_name")}
                    className="form-control bg-light small mb-2"
                    placeholder="Coupon Name"
                    maxLength="32"
                  />
                  <div className="form-inline mb-2">
                    <input
                      type="text"
                      onChange={handleChange("coupon_code")}
                      className="form-control bg-light w-50 small mr-2"
                      placeholder="Coupon Code"
                      value={coupon_code}
                      maxLength="24"
                    />
                    <button
                      className="btn btn-primary float-right"
                      onClick={handleGenerateCode}
                    >
                      Generate Code
                    </button>
                  </div>
                  <textarea
                    className="form-control mb-2"
                    id="exampleFormControlTextarea1"
                    rows={3}
                    placeholder="Description"
                    onChange={handleChange("description")}
                    defaultValue={""}
                    maxLength="50"
                  />
                  <div className="form-inline">
                    <label>Discount Type:</label>
                    <select
                      id="category"
                      className="btn btn-light border mb-2 ml-2 mr-2"
                      onChange={handleChange("coupon_type")}
                    >
                      <option value="Discount Rate">Discount Rate</option>
                      <option value="Discount Value">Discount Value</option>
                    </select>
                    <label>Discount Value:</label>
                    <input
                      type="number"
                      className="form-control bg-light small mb-2 ml-2"
                      placeholder="Value"
                      min="0"
                      onChange={handleChange("discount")}
                    />
                  </div>
                  <label className="mt-3">Period of Use</label>
                  <div className="form-row">
                    <div className="col-md-4 mb-3">
                      <label>Start</label>
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          id="validationDefaultUsername"
                          aria-describedby="inputGroupPrepend2"
                          onChange={handleChange("start_date")}
                          required
                        />
                        <div className="input-group-append">
                          <span
                            className="input-group-text"
                            id="inputGroupPrepend2"
                          >
                            <i className="fa fa-calendar-alt" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label>End</label>
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          id="validationDefaultUsername"
                          aria-describedby="inputGroupPrepend2"
                          onChange={handleChange("end_date")}
                          required
                        />
                        <div className="input-group-append">
                          <span
                            className="input-group-text"
                            id="inputGroupPrepend2"
                          >
                            <i className="fa fa-calendar-alt" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-inline">
                    <button
                      className="btn btn-primary mr-2"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };
  return (
    <DashboardLayout name="Coupon Management" detail="Add Coupons">
      {showAddCouponForm()}
    </DashboardLayout>
  );
};

export default AddCoupons;
