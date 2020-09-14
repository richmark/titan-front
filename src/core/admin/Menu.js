import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import "../../../src/styles.css";
import { isAuthenticated } from "../../auth/authUtil";

const Menu = () => {
  const showMenu = () => {
    return (
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* Sidebar - Brand */}
        <a className="sidebar-brand d-flex align-items-center justify-content-center">
          <div className="sidebar-brand-text mx-3" style={{ color: "white" }}>
            TITAN SUPER TOOLS
          </div>
        </a>
        {/* Divider */}
        <hr className="sidebar-divider my-0" />
        {/* Nav Item - Dashboard */}
        <li className="nav-item active">
          <a className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Dashboard</span>
          </a>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider" />
        {/* Nav Item - Pages Collapse Menu */}
        {isAuthenticated().user.role === 1 ? (
          <Fragment>
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                data-toggle="collapse"
                data-target="#bundleMgmt"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                <span>Bundle Deals Management</span>
              </a>
              <div
                id="bundleMgmt"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <Link to="/admin/bundles" className="collapse-item">
                    All bundles
                  </Link>
                  <Link to="/admin/bundles/add" className="collapse-item">
                    Make bundle
                  </Link>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                data-toggle="collapse"
                data-target="#couponMgmt"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                <span>Coupon Management</span>
              </a>
              <div
                id="couponMgmt"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <Link to="/admin/coupons" className="collapse-item">
                    All Coupons
                  </Link>
                  <Link to="/admin/coupons/add" className="collapse-item">
                    Add Coupons
                  </Link>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                data-toggle="collapse"
                data-target="#prodMgmt"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                <span>Product Management</span>
              </a>
              <div
                id="prodMgmt"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <Link to="/admin/products/add" className="collapse-item">
                    Add Products
                  </Link>
                  <Link to="/admin/products" className="collapse-item">
                    All Products
                  </Link>
                  <Link to="/admin/categories" className="collapse-item">
                    Categories
                  </Link>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                data-toggle="collapse"
                data-target="#reviewMgmt"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                <span>Review Management</span>
              </a>
              <div
                id="reviewMgmt"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <Link to="/admin/reviews" className="collapse-item">
                    All Reviews
                  </Link>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                data-toggle="collapse"
                data-target="#shipperMgmt"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                <span>Shipper Management</span>
              </a>
              <div
                id="shipperMgmt"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <Link to="/admin/shippers" className="collapse-item">
                    All Shipper
                  </Link>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                data-toggle="collapse"
                data-target="#subAdminMgmt"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                <span>Sub-admin Management</span>
              </a>
              <div
                id="subAdminMgmt"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <Link to="/admin/subadmin" className="collapse-item">
                    All Sub-admins
                  </Link>
                  <Link to="/admin/subadmin/add" className="collapse-item">
                    Add Sub-admins
                  </Link>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                data-toggle="collapse"
                data-target="#bannerMgmt"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                <span>Banner Management</span>
              </a>
              <div
                id="bannerMgmt"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <Link to="/admin/banner" className="collapse-item">
                    Add Banner
                  </Link>
                  <Link to="/admin/sidebanner" className="collapse-item">
                    Add Side Banner
                  </Link>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                data-toggle="collapse"
                data-target="#levelManagement"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                <span>Level Management</span>
              </a>
              <div
                id="levelManagement"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <Link to="/admin/levels" className="collapse-item">
                    Manage Level
                  </Link>
                </div>
              </div>
            </li>
          </Fragment>
        ) : (
          <div></div>
        )}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-toggle="collapse"
            data-target="#orderMgmt"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <span>Order Management</span>
          </a>
          <div
            id="orderMgmt"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <Link to="/admin/orders" className="collapse-item">
                All Order
              </Link>
              {/* Disabled Order Settings, will not be used - 31/08/20 Carlo Barcena */}
              {/* <Link to="/admin/orders/details/settings" className="collapse-item">
                Order Settings
              </Link> */}
            </div>
          </div>
        </li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-toggle="collapse"
            data-target="#wholesaleApp"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <span>User Applications</span>
          </a>
          <div
            id="wholesaleApp"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <Link to="/admin/wholesalers" className="collapse-item">
                All Applications
              </Link>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-toggle="collapse"
            data-target="#userManagement"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <span>User Management</span>
          </a>
          <div
            id="userManagement"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <Link to="/admin/verified/users" className="collapse-item">
                User List
              </Link>
            </div>
          </div>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider d-none d-md-block" />
        {/* Sidebar Toggler (Sidebar) */}
        <div className="text-center d-none d-md-inline">
          <button className="rounded-circle border-0" id="sidebarToggle" />
        </div>
      </ul>
    );
  };
  return <Fragment>{showMenu()}</Fragment>;
};

export default withRouter(Menu);
