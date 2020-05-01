import React, { Component, useState, useEffect, Fragment } from "react";
import DashboardLayout from "../DashboardLayout";
import { isAuthenticated } from "../../../auth/authUtil";
import { updateCoupon, checkCouponCode, getCoupon } from "./couponsApi";
import { oValidatorLibrary } from "../../../libraries/validatorLibrary";

import { Redirect } from "react-router-dom";

const UpdateCoupon = ({ match }) => {
  const { sToken, user } = isAuthenticated();
  const [coupon_name_error, setCouponNameError] = useState(false);
  const [coupon_code_error, setCouponCodeError] = useState(false);
  const [description_error, setDescriptionError] = useState(false);
  const [discount_error, setDiscountError] = useState(false);
  const [start_date_error, setStartDateError] = useState(false);
  const [end_date_error, setEndDateError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [bRedirect, setRedirect] = useState(false);

  const [values, setValues] = useState({
    coupon_name: "",
    coupon_code: "",
    coupon_type: "Discount Rate",
    description: "",
    discount: "",
    start_date: "",
    end_date: "",
    error: false,
    status: true
  });

  const {
    coupon_name,
    coupon_code,
    coupon_type,
    description,
    discount,
    start_date,
    end_date,
    error
  } = values;

  const redirectForbidden = () => {
    if (bRedirect === true) {
      return <Redirect to="/admin/coupons" />;
    }
  };

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

  const handleChange = sName => oEvent => {
    const value = oEvent.target.value;
    setValues({ ...values, [sName]: value });
  };

  const handleSave = oEvent => {
    oEvent.preventDefault();

    var oValidator = initializeValidator();

    if (oValidator.allValid()) {
      checkCouponCode(values.coupon_code).then(oData => {
        if (oData.data.length !== 0) {
          alert("Coupon code already exists.");
          return;
        }
        updateCoupon(user._id, sToken, match.params.couponId, values).then(
          oData => {
            if (oData.error) {
              alert("Something went wrong. Please try again");
            } else {
              alert("Coupon updated successfully");
              setRedirect(true);
            }
          }
        );
      });

      return;
    }
    setErrorMessages(setErrorMessage(oValidator.getErrorMessages()));
    setValues({ ...values, error: true });
  };

  const handleGenerateCode = oEvent => {
    setValues({
      ...values,
      coupon_code: generateCode(8)
    });
  };

  const handleCancel = oEvent => {
    setRedirect(true);
  };

  const initializeValidator = () => {
    var oValidator = oValidatorLibrary();

    oValidator.message("coupon name", coupon_name, "required|max:32");
    oValidator.message("coupon code", coupon_code, "required|max:24");
    oValidator.message("description", description, "required|max:50");
    oValidator.message("discount", discount, "required|numeric|min:0,num");
    oValidator.message("start date", start_date, "required");
    oValidator.message("end date", end_date, "required");
    oValidator.message("dates", [start_date, end_date], "date_difference");

    oValidator.fieldValid("coupon name")
      ? setCouponNameError(false)
      : setCouponNameError(true);

    oValidator.fieldValid("coupon code")
      ? setCouponCodeError(false)
      : setCouponCodeError(true);

    oValidator.fieldValid("description")
      ? setDescriptionError(false)
      : setDescriptionError(true);

    oValidator.fieldValid("discount")
      ? setDiscountError(false)
      : setDiscountError(true);

    oValidator.fieldValid("start date") && oValidator.fieldValid("dates")
      ? setStartDateError(false)
      : setStartDateError(true);

    oValidator.fieldValid("end date") && oValidator.fieldValid("dates")
      ? setEndDateError(false)
      : setEndDateError(true);

    return oValidator;
  };

  const setErrorMessage = oError => {
    var aMessage = [];
    Object.keys(oError).map(mKey => {
      aMessage.push(typeof oError[mKey] === "object" ? "" : oError[mKey]);
    });
    return aMessage;
  };

  const getParameters = () => {
    if (match.params.couponId !== undefined) {
      getCoupon(match.params.couponId).then(oData => {
        if (oData.error) {
          alert("Coupon does not exist!");
          setRedirect(true);
        } else {
          setValues({
            ...values,
            coupon_name: oData.data.coupon_name,
            coupon_code: oData.data.coupon_code,
            coupon_type: oData.data.coupon_type,
            description: oData.data.description,
            discount: oData.data.discount,
            start_date: oData.data.start_date,
            end_date: oData.data.end_date
          });
        }
      });
    }
  };

  const formatDate = iDate => {
    var d = new Date(iDate),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  useEffect(() => {
    getParameters();
  }, []);

  const showErrorDiv = aMessages => {
    return (
      <div className="alert alert-danger">
        {aMessages.map((message, i) => (
          <h6 key={i}>{message}</h6>
        ))}
      </div>
    );
  };

  const showUpdateCouponForm = () => {
    return (
      <Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-sm-6 col-xl-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  {error && showErrorDiv(errorMessages)}
                  <input
                    type="text"
                    onChange={handleChange("coupon_name")}
                    className={
                      coupon_name_error
                        ? "form-control bg-light small mb-2 border-danger"
                        : "form-control bg-light small mb-2"
                    }
                    placeholder="Coupon Name"
                    maxLength="32"
                    value={coupon_name}
                  />
                  <div className="form-inline mb-2">
                    <input
                      type="text"
                      onChange={handleChange("coupon_code")}
                      className={
                        coupon_code_error
                          ? "form-control bg-light w-50 small mr-2 border-danger"
                          : "form-control bg-light w-50 small mr-2"
                      }
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
                    className={
                      description_error
                        ? "form-control mb-2 border-danger"
                        : "form-control mb-2"
                    }
                    id="exampleFormControlTextarea1"
                    rows={3}
                    placeholder="Description"
                    onChange={handleChange("description")}
                    value={description}
                    maxLength="50"
                  />
                  <div className="form-inline">
                    <label>Discount Type:</label>
                    <select
                      id="category"
                      className="btn btn-light border mb-2 ml-2 mr-2"
                      onChange={handleChange("coupon_type")}
                      value={coupon_type}
                    >
                      <option value="Discount Rate">Discount Rate</option>
                      <option value="Discount Value">Discount Value</option>
                    </select>
                    <label>Discount Value:</label>
                    <input
                      type="number"
                      className={
                        description_error
                          ? "form-control bg-light small mb-2 ml-2 border-danger"
                          : "form-control bg-light small mb-2 ml-2"
                      }
                      placeholder="Value"
                      min="0"
                      value={discount}
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
                          className={
                            start_date_error
                              ? "form-control border-danger"
                              : "form-control"
                          }
                          id="validationDefaultUsername"
                          aria-describedby="inputGroupPrepend2"
                          onChange={handleChange("start_date")}
                          value={formatDate(start_date)}
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
                          className={
                            end_date_error
                              ? "form-control border-danger"
                              : "form-control"
                          }
                          id="validationDefaultUsername"
                          aria-describedby="inputGroupPrepend2"
                          onChange={handleChange("end_date")}
                          value={formatDate(end_date)}
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
                    <button className="btn btn-danger" onClick={handleCancel}>
                      Cancel
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
    <DashboardLayout name="Coupon Management" detail={[<a href='/admin/coupons'>All Coupons</a>, ' / Update Coupon']}>
      {showUpdateCouponForm()}
      {redirectForbidden()}
    </DashboardLayout>
  );
};

export default UpdateCoupon;
