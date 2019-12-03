import React, { Component } from "react";

const AddProductDetail = () => {
  return (
    <div
      className="col-md-6 col-sm-6 col-xl-6 mb-4"
      style={{ fontFamily: "Nunito", color: "gray" }}
    >
      <div className="card border-left-primary shadow h-100 py-2">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <img src="https://via.placeholder.com/350x350" />
            </div>
            <div className="col-md-6 col-sm-6 mb-4">
              <h2 style={{ color: "black" }}>Product Name</h2>
              <h5 className="mb-5">
                Quantity:<span id="qty"> 0</span>
              </h5>
              <h6>Description:</h6>
              <p style={{ fontSize: 12 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <h4 className="ml-4 mt-4">Information</h4>

              <table
                className="table text-center"
                style={{ fontFamily: "Nunito", color: "gray" }}
              >
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>Value</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductDetail;
