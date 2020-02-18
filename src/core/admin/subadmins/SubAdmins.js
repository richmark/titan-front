import React, { Component, useState, useEffect, Fragment } from "react";
import DashboardLayout from "../DashboardLayout";
import DataTable from "react-data-table-component";
import { getAllSubadmins, deleteUser } from "../../client/clientApi";
import { isAuthenticated } from "../../../auth/authUtil";
import { Link } from "react-router-dom";

const SubAdmins = () => {
  const { sToken, user } = isAuthenticated();
  const [allSubadmins, setAllSubadmins] = useState({});
  const [subAdmins, setSubAdmins] = useState({});
  const [sQueryString, setQueryString] = useState("");

  useEffect(() => {
    loadSubadmins();
  }, []);

  const loadSubadmins = () => {
    getAllSubadmins(user._id, sToken).then(oData => {
      if (oData.error) {
        console.log(oData.error);
      } else {
        setSubAdmins(oData.data);
        setAllSubadmins(oData.data);
      }
    });
  };

  const showDataTable = () => {
    const oData = subAdmins;
    const oColumns = [
      {
        name: "Username",
        selector: "email",
        sortable: true
      },
      {
        name: "Password",
        selector: "subadmin_password",
        sortable: true
      },
      {
        name: "Action",
        cell: oRow => {
          return (
            <a href="#" onClick={handleDeleteUser(oRow._id)}>
              Delete
              <i className="ml-2 fa fa-trash" />
            </a>
          );
        },
        sortable: true
      }
    ];
    return (
      <Fragment>
        <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
          <DataTable
            columns={oColumns}
            data={oData}
            pagination={true}
            striped
          />
        </div>
      </Fragment>
    );
  };

  const handleDeleteUser = iUserId => oEvent => {
    oEvent.preventDefault();
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(iUserId, sToken).then(oData => {
        if (oData.error) {
          console.log(oData.error);
        } else {
          alert("User deleted!");
          window.location.reload();
        }
      });
    }
  };

  const handleSearchClick = oEvent => {
    if (sQueryString !== "") {
      var aResults = filterSearch(sQueryString);
      setSubAdmins(aResults);
    } else {
      loadSubadmins();
    }
  };

  const handleSearchChange = oEvent => {
    var sQueryString = oEvent.target.value;
    setQueryString(sQueryString);
    if (sQueryString !== "") {
      var aResults = filterSearch(sQueryString);
      setSubAdmins(aResults);
    } else {
      loadSubadmins();
    }
  };

  const showFilters = () => {
    return (
      <Fragment>
        <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <h4 className="mb-2">Search and filter</h4>
              <div className="form-group row">
                <div className="col-sm-5">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-light border-0 small"
                      placeholder="Search Sub-admin"
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                      onChange={handleSearchChange}
                    />
                    <div className="input-group-append">
                      <span
                        className="btn btn-primary"
                        onClick={handleSearchClick}
                      >
                        <i className="fas fa-search fa-sm" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-sm-7">
                  <Link to="/admin/subadmin/add">
                    <button className="btn btn-success float-right">
                      Add New Subadmin
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const filterSearch = sQueryString => {
    var results = [];

    for (var j = 0; j < allSubadmins.length; j++) {
      if (
        allSubadmins[j].email.indexOf(sQueryString) !== -1 ||
        allSubadmins[j].subadmin_password.indexOf(sQueryString) !== -1
      ) {
        results.push(allSubadmins[j]);
      }
    }

    return results;
  };

  return (
    <DashboardLayout name="Sub-admin Management" detail="All Sub-admins">
      {showFilters()}
      {showDataTable()}
    </DashboardLayout>
  );
};

export default SubAdmins;
