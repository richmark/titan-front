import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import "../../../src/styles.css";

const Menu = () => {
  const showMenu = () => {
    return (
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* Sidebar - Brand */}
        <a className="sidebar-brand d-flex align-items-center justify-content-center">
          <div className="sidebar-brand-text mx-3">TITAN SUPER TOOLS</div>
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
              <Link to='/admin/bundles' className="collapse-item">All bundles</Link>
              <Link to='/admin/bundles/add' className="collapse-item">Make bundle</Link>
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
              <a className="collapse-item">Process Order</a>
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
            data-target="#wholesaleApp"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <span>Wholsale User Applications</span>
          </a>
          <div
            id="wholesaleApp"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <Link to="/admin/wholesalers" className="collapse-item">
                All Wholesale User
              </Link>
              <a className="collapse-item">Process User</a>
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
