import React, { Fragment } from "react";
import Menu from "./Menu";
import Navbar from "./Navbar";
import MainContent from "./MainContent";
import "../../resources/bootstrap/vendor/fontawesome-free/css/all.min.css";
import "../../resources/bootstrap/css/sb-admin-2.min.css";

const DashboardLayout = ({ name, detail, children }) => {
  return (
    <Fragment>
      <div id="wrapper">
        <Menu />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <MainContent name={name} detail={detail} children={children} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardLayout;
