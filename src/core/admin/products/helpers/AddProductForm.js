import React, { Component } from "react";

const AddProductForm = () => {
  return (
    <div className="col-md-6 col-sm-6 col-xl-6 mb-4">
      <div className="card border-left-primary shadow h-100 py-2">
        <div className="card-body">
          <input
            type="text"
            className="form-control bg-light small mb-2"
            placeholder="Product Name"
          />
          <input
            type="text"
            className="form-control bg-light small mb-2"
            placeholder="Price"
          />
          <input
            type="text"
            className="form-control bg-light small mb-2"
            placeholder="Stock"
          />
          <select id="category" className="btn btn-light w-100 border mb-2">
            <option value="null"> No category</option>
          </select>
          <textarea
            className="form-control mb-2"
            id="exampleFormControlTextarea1"
            rows={3}
            placeholder="Description"
            defaultValue={""}
          />
          <div className="border p-3 mb-4">
            <h6>Image Upload</h6>
            <input
              type="file"
              className="form-control-file"
              id="exampleFormControlFile1"
            />
          </div>
          <div className="border p-3">
            <h6>Additional Information</h6>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Value"
                />
              </div>
              <button type="submit" className="btn btn-primary mb-2 mr-2">
                +
              </button>
              <button type="submit" className="btn btn-primary mb-2 mr-2">
                -
              </button>
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-success mt-2 ml-2">Save</button>
      <button className="btn btn-warning mt-2 ml-2">Reset</button>
    </div>
  );
};

export default AddProductForm;
