import React, { Component, useState, useEffect, Fragment } from "react";
import DashboardLayout from "../DashboardLayout";
import AddProductForm from "./helpers/AddProductForm";
import AddProductDetail from "./helpers/AddProductDetail";

const AddProducts = () => {
  return (
    <DashboardLayout name="Product Management" detail="Add Product">
      <div className="container-fluid">
        <div className="row">
          <AddProductForm />
          <AddProductDetail />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddProducts;
