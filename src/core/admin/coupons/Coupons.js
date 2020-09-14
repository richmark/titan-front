import React, { useState, useEffect, Fragment } from "react";
import DashboardLayout from "../DashboardLayout";
import { getAllCoupons, deleteCoupon } from "./couponsApi";
import { isAuthenticated } from "../../../auth/authUtil";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const Coupons = () => {
  const { sToken, user } = isAuthenticated();
  const [coupons, setCoupons] = useState({});
  const [allCoupons, setAllCoupons] = useState({});
  const [couponType, setCouponType] = useState("All");
  const [queryString, setQueryString] = useState("");

  const loadCoupons = () => {
    getAllCoupons().then(oData => {
      if (oData.error) {
        console.log(oData.error);
      } else {
        setCoupons(oData.data);
        setAllCoupons(oData.data);
      }
    });
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const formatDate = dDate => {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    var day = dDate.getDate();
    var monthIndex = dDate.getMonth();
    var year = dDate.getFullYear();

    return day + " " + monthNames[monthIndex] + " " + year;
  };

  const showDataTable = () => {
    const oData = coupons;
    const oColumns = [
      {
        name: "Coupon Name",
        selector: "coupon_name",
        sortable: true
      },
      {
        name: "Coupon Code",
        selector: "coupon_code",
        sortable: true
      },
      {
        name: "Discount Type",
        selector: "coupon_type",
        sortable: true
      },
      {
        name: "Discount Value",
        selector: "discount",
        sortable: true
      },
      {
        name: "Description",
        selector: "description",
        sortable: true
      },
      {
        name: "Start Date",
        selector: "start_date",
        sortable: true,
        format: oRow => formatDate(new Date(oRow.start_date))
      },
      {
        name: "End Date",
        selector: "end_date",
        sortable: true,
        format: oRow => formatDate(new Date(oRow.end_date))
      },
      {
        name: "Used By",
        selector: "used_by",
        sortable: true
      },
      {
        name: "Action",
        cell: oRow => {
          return (
            <Fragment>
              {/* Update Coupon Feature is disabled 26/08/2020  - Carlo Barcena*/}
              {/* <Link to={`/admin/coupons/update/${oRow._id}`}>
                Edit
                <i className="ml-1 mr-2 fa fa-pen" />
              </Link> */}
              <a href="#" onClick={handleDelete(oRow._id)}>
                Delete
                <i className="ml-1 fa fa-trash" />
              </a>
            </Fragment>
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

  const handleDelete = iCouponId => oEvent => {
    oEvent.preventDefault();
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      deleteCoupon(user._id, sToken, iCouponId).then(oData => {
        if (oData.error) {
          alert("Something went wrong.");
        } else {
          alert("Coupon Successfully Deleted!");
          window.location.reload();
        }
      });
    }
  };

  const handleSearchQueryChange = oEvent => {
    var sQueryString = oEvent.target.value;
    setQueryString(sQueryString);
    if (sQueryString !== "") {
      var aResult = filterSearch(sQueryString);
      setCoupons(aResult);
      return;
    }
    loadCoupons();
  };

  const filterSearch = sQueryString => {
    var results = [];
    for (var j = 0; j < allCoupons.length; j++) {
      if (
        allCoupons[j].coupon_name.indexOf(sQueryString) !== -1 ||
        allCoupons[j].coupon_code.indexOf(sQueryString) !== -1 ||
        allCoupons[j].description.indexOf(sQueryString) !== -1 ||
        allCoupons[j].used_by.indexOf(sQueryString) !== -1
      ) {
        results.push(allCoupons[j]);
      }
    }

    return results;
  };

  const filterSearchByType = () => {
    var results = [];

    if (couponType === "All") {
      return allCoupons;
    }

    for (var j = 0; j < allCoupons.length; j++) {
      if (allCoupons[j].coupon_type.indexOf(couponType) !== -1) {
        results.push(allCoupons[j]);
      }
    }

    return results;
  };

  const handleSearchClick = oEvent => {
    console.log(coupons);
  };

  const handleCouponTypeChange = oEvent => {
    var value = oEvent.target.value;
    setCouponType(value);
  };

  const handleFilterClick = oEvent => {
    var aResult = filterSearchByType();
    setQueryString("");
    setCoupons(aResult);
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
                      placeholder="Search Coupon"
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                      value={queryString}
                      onChange={handleSearchQueryChange}
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
              <select
                id="category"
                className="btn btn-light border mr-2"
                onChange={handleCouponTypeChange}
              >
                <option value="All">All Coupon Types</option>
                <option value="Discount Rate">Discount Rate</option>
                <option value="Discount Value">Fixed Price</option>
              </select>
              <button className="btn btn-primary" onClick={handleFilterClick}>
                Filter
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };
  return (
    <DashboardLayout name="Coupon Management" detail="All Coupons">
      {showFilters()}
      {showDataTable()}
    </DashboardLayout>
  );
};

export default Coupons;
