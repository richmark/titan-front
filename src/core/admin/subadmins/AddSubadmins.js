import React, { Component, useState, useEffect, Fragment } from "react";
import DashboardLayout from "../DashboardLayout";

const AddSubadmins = () => {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const handleChange = sName => oEvent => {
    const value = oEvent.target.value;
    setValues({ ...values, [sName]: value });
  };

  const handleAddClick = oEvent => {
    console.log(values);
  };

  const showAddSubadminForm = () => {
    return (
      <Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-sm-6 col-xl-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row mt-2">
                    <div className="col-sm-3">
                      <label className="mt-2 ">Username</label>
                    </div>
                    <div className="col-sm-8">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter username"
                        onChange={handleChange("email")}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-sm-3">
                      <label className="mt-2">Password</label>
                    </div>
                    <div className="col-sm-8">
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange("password")}
                      />
                    </div>
                  </div>
                  <div className="form-inline mt-4 float-right">
                    <button
                      className="btn btn-success mr-2"
                      onClick={handleAddClick}
                    >
                      Add
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
    <DashboardLayout name="Sub-admin Management" detail="Add Sub-admin">
      {showAddSubadminForm()}
    </DashboardLayout>
  );
};

export default AddSubadmins;
