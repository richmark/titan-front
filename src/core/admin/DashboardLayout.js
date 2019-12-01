import React, { Fragment } from "react";
import Menu from "./Menu";
import Navbar from "./Navbar";
import MainContent from "./MainContent";
import '../../front/styles/sb-admin-2.min.css';

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
