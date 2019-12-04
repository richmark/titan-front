import React, { Component, useState, useEffect, useRef, Fragment } from "react";
import DashboardLayout from "../DashboardLayout";
import { isAuthenticated } from "../../../auth/authUtil";
import { getAllCategories } from "../../admin/categories/categoriesApi";

const AddProducts = () => {
  const [values, setValues] = useState({
    productName: "Product Name",
    description: "Enter description fit to describe your product.",
    quantity: 0,
    price: 0,
    category: "",
    additionalName: "",
    additionalValue: "",
    additionalInfo: [],
    error: "",
    formData: ""
  });

  const {
    productName,
    description,
    quantity,
    price,
    category,
    additionalName,
    additionalValue,
    additionalInfo,
    error,
    formData
  } = values;

  const [categories, setCategories] = useState([]);
  const [imageSrc, setImageSrc] = useState(
    "https://via.placeholder.com/350x350"
  );

  const { sUser, sToken } = isAuthenticated();

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    getAllCategories(sToken).then(oData => {
      if (oData.error) {
        console.log(oData.error);
      } else {
        setCategories(oData.data);
      }
    });
  };

  const handleNameChange = e => {
    if (e.target.value === "") {
      setValues({ ...values, productName: "Product Name" });
    } else {
      setValues({ ...values, productName: e.target.value });
    }
  };

  const handlePriceChange = e => {
    if (e.target.value === "") {
      setValues({ ...values, price: 0 });
    } else {
      setValues({ ...values, price: e.target.value });
    }
  };

  const handleStockChange = e => {
    if (e.target.value === "") {
      setValues({ ...values, quantity: 0 });
    } else {
      setValues({ ...values, quantity: e.target.value });
    }
  };

  const handleDescriptionChange = e => {
    if (e.target.value === "") {
      setValues({
        ...values,
        description: "Enter description fit to describe your product."
      });
    } else {
      setValues({ ...values, description: e.target.value });
    }
  };

  const handleAdditionalName = e => {
    setValues({
      ...values,
      additionalName: e.target.value
    });
  };

  const handleAdditionalValue = e => {
    setValues({
      ...values,
      additionalValue: e.target.value
    });
  };

  const handleAdditionalInfo = e => {
    if (additionalName === "" || additionalValue === "") {
      alert("Please fill up additional information completely!");
      return;
    }
    const aInfo = {
      name: additionalName,
      value: additionalValue
    };

    additionalInfo.push(aInfo);
    setValues({
      ...values,
      additionalInfo: additionalInfo
    });

    setValues({
      ...values,
      additionalName: "",
      additionalValue: ""
    });
  };

  const handleDeleteAdditionalInfo = index => e => {
    additionalInfo.splice(index, 1);
    setValues({
      ...values,
      additionalInfo: additionalInfo
    });
  };

  const handleCategoryChange = e => {
    setValues({ ...values, category: e.target.value });
  };

  const readUrl = event => {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        setImageSrc(e.target.result);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const showAdditionalInfoForm = (index, name, value) => {
    return (
      <div key={index} className="row">
        <div className="col">
          <input type="text" className="form-control" value={name} readOnly />
        </div>
        <div className="col">
          <input type="text" className="form-control" value={value} readOnly />
        </div>
        <button
          type="submit"
          className="btn btn-primary mb-2 mr-2"
          onClick={handleDeleteAdditionalInfo(index)}
        >
          <i className="fa fa-trash" />
        </button>
      </div>
    );
  };

  const showAddProductForm = () => {
    return (
      <div className="col-md-6 col-sm-6 col-xl-6 mb-4">
        <div className="card border-left-primary shadow h-100 py-2">
          <div className="card-body">
            <input
              id="productName"
              type="text"
              className="form-control bg-light small mb-2"
              placeholder="Product Name"
              onChange={handleNameChange}
            />
            <input
              type="number"
              className="form-control bg-light small mb-2"
              min="0"
              placeholder="Price"
              onChange={handlePriceChange}
            />
            <input
              type="number"
              className="form-control bg-light small mb-2"
              min="0"
              placeholder="Stock"
              onChange={handleStockChange}
            />
            <select
              id="category"
              className="btn btn-light w-100 border mb-2"
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id} data="wow">
                  {c.name}
                </option>
              ))}
            </select>
            <textarea
              className="form-control mb-2"
              id="exampleFormControlTextarea1"
              rows={3}
              placeholder="Description"
              defaultValue={""}
              onChange={handleDescriptionChange}
            />
            <div className="border p-3 mb-4">
              <h6>Image Upload</h6>
              <input
                type="file"
                className="form-control-file"
                id="exampleFormControlFile1"
                onChange={readUrl}
              />
            </div>
            <div className="border p-3">
              <h6>Additional Information</h6>
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={additionalName === "" ? "Enter Name" : ""}
                    value={additionalName}
                    onChange={handleAdditionalName}
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={additionalValue === "" ? "Enter Value" : ""}
                    value={additionalValue}
                    onChange={handleAdditionalValue}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary mb-2 mr-2"
                  onClick={handleAdditionalInfo}
                >
                  <i className="fa fa-plus" />
                </button>
              </div>
              {additionalInfo.map((info, i) =>
                showAdditionalInfoForm(i, info.name, info.value)
              )}
            </div>
          </div>
        </div>
        <button className="btn btn-success mt-2 ml-2">Save</button>
        <button className="btn btn-warning mt-2 ml-2">Reset</button>
      </div>
    );
  };

  const showAddProductDetail = () => {
    return (
      <div
        className="col-md-6 col-sm-6 col-xl-6 mb-4"
        style={{ fontFamily: "Nunito", color: "gray" }}
      >
        <div className="card border-left-primary shadow h-100 py-2">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 col-sm-6">
                <img src={imageSrc} style={{ maxWidth: 350, maxHeight: 350 }} />
              </div>
              <div className="col-md-6 col-sm-6 mb-4">
                <h2 style={{ color: "black" }}>{productName}</h2>
                <h5>
                  <b>Price</b>:<span id="qty"> {price}</span>
                </h5>
                <h5 className="mb-5">
                  <b>Quantity</b>:<span id="qty"> {quantity}</span>
                </h5>
                <h6>Description:</h6>
                <p style={{ fontSize: 12 }}>{description}</p>
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
                    {additionalInfo.length !== 0 ? (
                      additionalInfo.map((info, i) => (
                        <tr key={i}>
                          <td>{info.name}</td>
                          <td>{info.value}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td>Name</td>
                        <td>Value</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <DashboardLayout name="Product Management" detail="Add Product">
      <div className="container-fluid">
        <div className="row">
          {showAddProductForm()}
          {showAddProductDetail()}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddProducts;
