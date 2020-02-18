import React, { Component, useState, useEffect, Fragment } from "react";
import DashboardLayout from "../DashboardLayout";
import { sendSignup } from "../../client/clientApi";
import { Redirect } from "react-router-dom";

const AddSubadmins = () => {
  const [values, setValues] = useState({
    first_name: "Subadmin",
    last_name: "Subadmin",
    email: "",
    mobile_number: "123456789",
    address: "Subadmin address",
    password: "",
    subadmin_password: "",
    role: 5
  });

  const [bRedirect, setRedirect] = useState(false);

  const { email, password } = values;

  const handleChange = sName => oEvent => {
    const value = oEvent.target.value;
    if (sName === "password") {
      setValues({ ...values, subadmin_password: value, [sName]: value });
      return;
    }
    setValues({ ...values, [sName]: value });
  };

  const handleAddClick = oEvent => {
    oEvent.preventDefault();

    if (validateParameters()) {
      console.log("wew");
      sendSignup(values).then(oData => {
        if (oData.error) {
          console.log(oData);
          return;
        } else {
          alert("Success!");
          setRedirect(true);
        }
      });
    }
  };

  const handleGenerateCode = oEvent => {
    oEvent.preventDefault();
    var sPassword = generateCode(10);
    setValues({ ...values, password: sPassword, subadmin_password: sPassword });
  };

  const redirectSubadmins = () => {
    if (bRedirect === true) {
      return <Redirect to="/admin/subadmin" />;
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

  const validateParameters = () => {
    if (email.length === 0) {
      alert("Username is required!");
      return false;
    }

    if (password.length === 0) {
      alert("Password is required");
      return false;
    }

    return true;
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
                        type="text"
                        placeholder="Password"
                        value={password}
                        onChange={handleChange("password")}
                      />
                    </div>
                  </div>
                  <div className="form-inline mt-4 float-right">
                    <button
                      className="btn btn-primary mr-2"
                      onClick={handleGenerateCode}
                    >
                      Generate Password
                    </button>
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
      {redirectSubadmins()}
    </DashboardLayout>
  );
};

export default AddSubadmins;
