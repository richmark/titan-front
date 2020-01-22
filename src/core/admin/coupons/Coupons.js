import React, { useState, useEffect, Fragment } from "react";
import DashboardLayout from "../DashboardLayout";
import { getAllCoupons, deleteCoupon } from "./couponsApi";
import { isAuthenticated } from "../../../auth/authUtil";
import { Link } from "react-router-dom";

const Coupons = () => {
  const { sToken, user } = isAuthenticated();
  const [oCouponData, setCouponData] = useState([]);

  const loadCoupons = () => {
    getAllCoupons().then(oData => {
      if (oData.error) {
        console.log(oData.error);
      } else {
        setCouponData(oData.data);
      }
    });
  };

  const handleDelete = iCouponId => oEvent => {
    oEvent.preventDefault();
    console.log(iCouponId);
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      deleteCoupon(user._id, sToken, iCouponId).then(oData => {
        if (oData.error) {
          alert("Something went wrong.");
        } else {
          alert("Coupon Successfully Deleted!");
          loadCoupons();
        }
      });
    }
  };

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
  useEffect(() => {
    loadCoupons();
  }, []);

  const showFilters = () => {
    return (
      <Fragment>
        <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <p>Period of Use</p>
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
              <select id="category" className="btn btn-light border mr-2">
                <option disabled defaultValue>
                  Filter by Discount Type
                </option>
                <option>All</option>
                <option>Percentage</option>
                <option>Fix Value</option>
              </select>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };
  const showCoupons = () => {
    return (
      <Fragment>
        <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="float-right">
                <span>10</span> Items
              </div>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col" style={{ textAlign: "center" }}>
                      Coupon Name
                    </th>
                    <th scope="col" style={{ textAlign: "center" }}>
                      Coupon Code
                    </th>
                    <th scope="col" style={{ textAlign: "center" }}>
                      Discount Type
                    </th>
                    <th scope="col" style={{ textAlign: "center" }}>
                      Discount Value
                    </th>
                    <th scope="col" style={{ textAlign: "center" }}>
                      Description
                    </th>
                    <th scope="col" style={{ textAlign: "center" }}>
                      Start Date
                    </th>
                    <th scope="col" style={{ textAlign: "center" }}>
                      End Date
                    </th>
                    <th scope="col" colSpan="2" style={{ textAlign: "center" }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {oCouponData &&
                    oCouponData.map((oCoupon, iIndex) => (
                      <tr key={iIndex}>
                        <td style={{ textAlign: "center" }}>
                          {oCoupon.coupon_name}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {oCoupon.coupon_code}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {oCoupon.coupon_type}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {oCoupon.discount}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {oCoupon.description}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {formatDate(new Date(oCoupon.start_date))}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {formatDate(new Date(oCoupon.end_date))}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Link to={`/admin/coupons/update/${oCoupon._id}`}>
                            <i className="fas fa-pen fa-sm"></i>
                          </Link>
                        </td>

                        <td style={{ textAlign: "center" }}>
                          <a href="" onClick={handleDelete(oCoupon._id)}>
                            <i className="fas fa-trash fa-sm "></i>
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };
  return (
    <DashboardLayout name="Coupon Management" detail="All Coupons">
      {showFilters()}
      {showCoupons()}
    </DashboardLayout>
  );
};

export default Coupons;
