import React, { Component, useState, useEffect, Fragment } from "react";
import DashboardLayout from "../DashboardLayout";
import { isAuthenticated } from "../../../auth/authUtil";
import { createCoupon } from "./couponsApi";

import { Redirect } from "react-router-dom";

const AddCoupons = () => {
  const { sToken, user } = isAuthenticated();
  const [values, setValues] = useState({
    coupon_name: "",
    coupon_code: "",
    coupon_type: "Discount Rate",
    description: "",
    discount: "",
    start_date: "",
    end_date: "",
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
    status
  } = values;

  const handleChange = sName => oEvent => {
    const value = oEvent.target.value;
    setValues({ ...values, [sName]: value });
  };

  const handleSave = oEvent => {
    createCoupon(user._id, sToken, values).then(oData => {
      if (oData.error) {
        console.log(oData.error);
      } else {
        console.log(oData);
        alert("Product created successfully");
      }
    });
  };

  const showAddCouponForm = () => {
    return (
      <Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-sm-6 col-xl-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <input
                    type="text"
                    onChange={handleChange("coupon_name")}
                    className="form-control bg-light small mb-2"
                    placeholder="Coupon Name"
                  />
                  <div className="form-inline mb-2">
                    <input
                      type="text"
                      onChange={handleChange("coupon_code")}
                      className="form-control bg-light w-50 small mr-2"
                      placeholder="Coupon Code"
                    />
                    <button className="btn btn-primary float-right">
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
                      type="text"
                      className="form-control bg-light small mb-2 ml-2"
                      placeholder="Value"
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
