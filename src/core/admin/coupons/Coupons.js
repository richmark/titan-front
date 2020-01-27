import React, { useState, useEffect, Fragment } from "react";
import DashboardLayout from "../DashboardLayout";
import {
  getAllCoupons,
  deleteCoupon,
  countCoupon,
  searchCoupon
} from "./couponsApi";
import { isAuthenticated } from "../../../auth/authUtil";
import { Link } from "react-router-dom";

const Coupons = () => {
  const { sToken, user } = isAuthenticated();
  const [oCouponData, setCouponData] = useState([]);
  const [count, setCount] = useState(0);
  const [showCount, setShowCount] = useState(5);
  const [searchFilter, setSearchFilter] = useState("");
  const [paginationHide, setPaginationHide] = useState(false);
  const [paginationCount, setPaginationCount] = useState(0);
  const [paginationStart, setPaginationStart] = useState(1);
  const [paginationEnd, setPaginationEnd] = useState(10);
  const [pageActive, setPageActive] = useState(1);

  const loadCoupons = (iLimit, iOffset, sOrder, sSortBy) => {
    getAllCoupons(iLimit, iOffset, sOrder, sSortBy).then(oData => {
      if (oData.error) {
        console.log(oData.error);
      } else {
        setCouponData(oData.data);
      }
    });
  };

  const getCouponCount = () => {
    countCoupon().then(oData => {
      if (oData.error) {
        console.log(oData.error);
      } else {
        var iCount = oData.data.count;
        setCount(iCount);
        initializePagination(iCount, 5);
      }
    });
  };

  const initializePagination = (iCount, iShowCount) => {
    var iPaginationCount = Math.ceil(iCount / iShowCount);
    resetPagination();
    setPaginationCount(iPaginationCount);
    iPaginationCount > 9
      ? setPaginationEnd(9)
      : setPaginationEnd(iPaginationCount);

    loadCoupons(iShowCount, 0, "asc", "_id");
  };

  const handleNextPagination = oEvent => {
    var newPageActive = pageActive + 1;

    if (paginationCount > pageActive) {
      setPageActive(newPageActive);
      loadCoupons(
        showCount,
        parseInt(showCount * (newPageActive - 1)),
        "asc",
        "_id"
      );
    }

    if (paginationEnd >= 9) {
      if (
        pageActive >= Math.ceil(paginationEnd / 2) &&
        paginationEnd !== paginationCount
      ) {
        setPaginationEnd(paginationEnd + 1);
        setPaginationStart(paginationStart + 1);
      }
    }
  };

  const handlePrevPagination = oEvent => {
    var newPageActive = pageActive - 1;

    if (pageActive > 1) {
      setPageActive(newPageActive);
      loadCoupons(
        showCount,
        parseInt(showCount * (newPageActive - 1)),
        "asc",
        "_id"
      );
    }

    if (paginationEnd >= 9) {
      if (
        pageActive >= Math.ceil(paginationEnd / 2) &&
        paginationStart !== 1 &&
        pageActive <= paginationCount - 4
      ) {
        setPaginationEnd(paginationEnd - 1);
        setPaginationStart(paginationStart - 1);
      }
    }
  };

  const resetPagination = () => {
    setPageActive(1);
    setPaginationStart(1);
    setPaginationEnd(10);
    setPaginationCount(0);
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

  const handleShowChange = oEvent => {
    var newShowCount = oEvent.target.value;
    setShowCount(newShowCount);
    initializePagination(count, newShowCount);
  };

  const handleChangeQuery = oEvent => {
    if (oEvent.target.value !== "") {
      searchCoupon(oEvent.target.value).then(oData => {
        if (oData.error) {
          console.log(oData.error);
        } else {
          setCouponData(oData.data);
          setPaginationHide(true);
        }
      });
    } else {
      loadCoupons();
      getCouponCount();
      setPaginationHide(false);
    }
  };

  const handleChangeFilter = oEvent => {
    setSearchFilter(oEvent.target.value);
  };

  const handleSearchFilter = oEvent => {
    if (searchFilter !== "All") {
      searchCoupon(searchFilter).then(oData => {
        if (oData.error) {
          console.log(oData.error);
        } else {
          setCouponData(oData.data);
          setPaginationHide(true);
        }
      });
    } else {
      loadCoupons();
      getCouponCount();
      setPaginationHide(false);
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
    getCouponCount();
  }, []);

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
                      onChange={handleChangeQuery}
                    />
                    <div className="input-group-append">
                      <span className="btn btn-primary">
                        <i className="fas fa-search fa-sm" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <select
                id="category"
                className="btn btn-light border mr-2"
                onChange={handleChangeFilter}
              >
                <option value="All" selected>
                  All Coupon Types
                </option>
                <option value="Discount Rate">Discount Rate</option>
                <option value="Fixed Price">Fixed Price</option>
              </select>
              <button className="btn btn-primary" onClick={handleSearchFilter}>
                Filter
              </button>
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
              <div
                className={
                  paginationHide
                    ? "float-left mb-2 d-none"
                    : "float-left mb-2 d-block"
                }
              >
                <span>{count}</span> Total
              </div>
              <div
                className={
                  paginationHide
                    ? "float-right mb-2 d-none"
                    : "float-right mb-2 d-block"
                }
              >
                <select
                  className="btn btn-primary dropdown-toggle mr-2"
                  onChange={handleShowChange}
                >
                  <option value="5"> Show 5 per page</option>
                  <option value="10"> Show 10 per page</option>
                  <option value="25"> Show 25 per page</option>
                  <option value="50"> Show 50 per page</option>
                </select>
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
              <div
                className={
                  paginationHide ? "text-center d-none" : "text-center d-block"
                }
                style={{ float: "right" }}
              >
                <nav aria-label="Page navigation example text-center">
                  <ul className="pagination">
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={handlePrevPagination}
                      >
                        Previous
                      </button>
                    </li>
                    {[...Array(paginationEnd - paginationStart + 1)].map(
                      (e, i) => (
                        <li
                          className={
                            i + paginationStart === pageActive
                              ? "page-item active"
                              : "page-item"
                          }
                          key={i}
                        >
                          <a className="page-link">{i + paginationStart}</a>
                        </li>
                      )
                    )}
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={handleNextPagination}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
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
