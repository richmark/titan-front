import React, { Fragment } from "react";
import DashboardLayout from "./DashboardLayout";

const AdminDashboard = () => {
  return (
    <Fragment>
      <DashboardLayout name="admin" detail="admin" children="admin" />
    </Fragment>
  );
};

export default AdminDashboard;
