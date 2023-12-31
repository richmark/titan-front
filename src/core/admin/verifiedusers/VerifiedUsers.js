import React, { Component, useState, useEffect, Fragment } from "react";
import { Link } from 'react-router-dom';
import DashboardLayout from "../DashboardLayout";
import DataTable from "react-data-table-component";
import { getAllUsers } from "../verifiedusers/VerifedUsersApi";
import { isAuthenticated } from "../../../auth/authUtil";

const VerifiedUsers = () => {
  const { sToken, user } = isAuthenticated();
  const [allUsers, setUsers] = useState({});
  const [aSearch, setSearch] = useState({});
  const [sQueryString, setQueryString] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    getAllUsers(user._id, sToken).then(oData => {
      if (oData.error) {
        console.log(oData.error);
      } else {
        setUsers(oData.data);
        setSearch(oData.data);
      }
    });
  };

  const showDataTable = () => {
    const oData = aSearch;
    const oColumns = [
      {
        name: "Email",
        selector: "email",
        sortable: true
      },
      {
        name: "First Name",
        selector: "first_name",
        sortable: true
      },
      {
        name: "Last Name",
        selector: "last_name",
        sortable: true
      },
      {
        name: "Mobile Number",
        selector: "mobile_number",
        sortable: true
      },
      {
        name: "Address",
        selector: "address",
        sortable: true
      },
      {
        name: 'Type',
        selector: oRow => {
            return checkUserType(oRow.role)
        },
        sortable: true,
      },
      {
        name: 'Purchase History',
        center: true,
        cell: oRow => {
          return (
            <Fragment>
              <Link to={`/admin/verified/users/${oRow._id}`}>
              <i class="fas fa-poll fa-2x"></i>
              </Link>
            </Fragment>
          );
        }
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

const checkUserType = (iRole) => {
    const aRole = {
        2 : 'Personal',
        3 : 'Corporate',
        4 : 'Wholesaler'
    };
    return aRole[iRole];
}

const handleSearchClick = oEvent => {
  if (sQueryString !== "") {
    var aResults = filterSearch(sQueryString);
    setSearch(aResults);
  } else {
      loadUsers();
  }
};

const handleSearchChange = oEvent => {
    var sQueryString = oEvent.target.value;
    setQueryString(sQueryString);
    if (sQueryString !== "") {
      var aResults = filterSearch(sQueryString);
      setSearch(aResults);
    } else {
        loadUsers();
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
                      placeholder="Search Users"
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
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

const filterSearch = sQueryString => {
  var results = [];
  var sChecker = sQueryString.toLowerCase();
  for (var j = 0; j < allUsers.length; j++) {
      if (
          allUsers[j].email.toLowerCase().indexOf(sChecker) !== -1 ||
          allUsers[j].first_name.toLowerCase().indexOf(sChecker) !== -1 ||
          allUsers[j].last_name.toLowerCase().indexOf(sChecker) !== -1 ||
          allUsers[j].address.toLowerCase().indexOf(sChecker) !== -1 ||
          checkUserType(allUsers[j].role).toLowerCase().indexOf(sChecker) !== -1
      ) {
        results.push(allUsers[j]);
      }
  }

  return results;
};

  return (
    <DashboardLayout name="User Management" detail="All Verified Users">
      {showFilters()}
      {showDataTable()}
    </DashboardLayout>
  );
};

export default VerifiedUsers;
