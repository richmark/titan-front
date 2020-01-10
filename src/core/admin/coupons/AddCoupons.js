import React, { Fragment } from "react";
import DashboardLayout from "../DashboardLayout";

const AddCoupons = () => {
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
                    className="form-control bg-light small mb-2"
                    placeholder="Coupon Name"
                  />
                  <div className="form-inline mb-2">
                    <input
                      type="text"
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
                    defaultValue={""}
                  />
                  <div className="form-inline">
                    <label htmlFor>Discount %:</label>
                    <input
                      type="text"
                      className="form-control bg-light small mb-2 ml-2"
                      placeholder="Value"
                    />
                  </div>
                  <label htmlFor className="mt-3">
                    Period of Use
                  </label>
                  <div className="form-row">
                    <div className="col-md-4 mb-3">
                      <label htmlFor="validationDefaultUsername">Start</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          id="validationDefaultUsername"
                          placeholder="YYYY/MM/DD"
                          aria-describedby="inputGroupPrepend2"
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
                      <label htmlFor="validationDefaultUsername">End</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          id="validationDefaultUsername"
                          placeholder="YYYY/MM/DD"
                          aria-describedby="inputGroupPrepend2"
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
                    <button className="btn btn-primary mr-2">Save</button>
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
