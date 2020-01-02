import React, { Component, useState, useEffect, Fragment } from "react";
import DashboardLayout from "../DashboardLayout";
import { isAuthenticated } from "../../../auth/authUtil";
import { getAllCategories } from "../../admin/categories/categoriesApi";
import { createProduct } from "./productsApi";
import { oValidatorLibrary } from "../../../libraries/validatorLibrary";
import { Redirect } from "react-router-dom";

const AddProduct = () => {
  const { sToken, user } = isAuthenticated();
  const [categories, setCategories] = useState([]);
  const [name_error, setNameError] = useState(false);
  const [price_error, setPriceError] = useState(false);
  const [stock_error, setStockError] = useState(false);
  const [image_error, setImageError] = useState(false);
  const [description_error, setDescriptionError] = useState(false);

  const [values, setValues] = useState({
    product_name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    image: "",
    additional_info: [],
    key: "",
    value: "",
    error: false,
    formData: ""
  });

  const {
    product_name,
    price,
    stock,
    category,
    description,
    image,
    additional_info,
    key,
    value,
    error,
    formData
  } = values;

  const [bRedirect, setRedirect] = useState(false);
  const [sMessage, setMessage] = useState([]);

  const loadCategories = () => {
    getAllCategories().then(oCategories => {
      if (oCategories.error) {
        console.log(oCategories.error);
      } else {
        setCategories(oCategories.data);
        setValues({
          ...values,
          formData: new FormData(),
          category: oCategories.data[0]._id
        });
      }
    });
  };

  const redirectForbidden = () => {
    if (bRedirect === true) {
      return <Redirect to="/admin/products" />;
    }
  };

  const handleChange = name => oEvent => {
    if (name !== "image") {
      const value = oEvent.target.value;
      formData.set(name, value);
      setValues({ ...values, [name]: value });
      return;
    }
    let oFile = oEvent.target.files[0];
    let sFileType = oFile.type
      .split("/")
      .pop()
      .toLowerCase();

    if (
      sFileType != "jpeg" &&
      sFileType != "jpg" &&
      sFileType != "png" &&
      sFileType != "bmp" &&
      sFileType != "gif"
    ) {
      alert("Please upload valid file!");
      oEvent.target.value = "";
      return;
    }

    if (oFile === undefined) {
      formData.set(name, "");
      setValues({
        ...values,
        image: ""
      });
      return;
    }
    let oReader = new FileReader();
    oReader.onloadend = () => {
      formData.set(name, oFile);
      setValues({
        ...values,
        [name]: oReader.result
      });
    };
    oReader.readAsDataURL(oFile);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const setErrorMessage = oError => {
    var aMessage = [];
    Object.keys(oError).map(mKey => {
      aMessage.push(typeof oError[mKey] === "object" ? "" : oError[mKey]);
    });
    return aMessage;
  };

  const initializeValidator = formData => {
    var oValidator = oValidatorLibrary();

    oValidator.message("Product name", product_name, "required");
    oValidator.message("Price", price, "required");
    oValidator.message("Stock", stock, "required");
    oValidator.message("Category", category, "required");
    oValidator.message("Description", description, "required|max:200");
    oValidator.message("Stock", stock, "required");
    oValidator.message("Image", image, "required");

    oValidator.fieldValid("Product name")
      ? setNameError(false)
      : setNameError(true);
    oValidator.fieldValid("Price") ? setPriceError(false) : setPriceError(true);
    oValidator.fieldValid("Stock") ? setStockError(false) : setStockError(true);
    oValidator.fieldValid("Description")
      ? setDescriptionError(false)
      : setDescriptionError(true);
    oValidator.fieldValid("Image") ? setImageError(false) : setImageError(true);

    return oValidator;
  };

  const submitProduct = oEvent => {
    oEvent.preventDefault();

    var oValidator = initializeValidator(formData);

    if (formData.get("category") === null) {
      formData.set("category", category);
    }

    if (oValidator.allValid()) {
      createProduct(user._id, sToken, formData).then(oData => {
        if (oData.error) {
          console.log(oData.error);
        } else {
          console.log(oData.data);
          alert("Product created successfully");
        }
      });
      setRedirect(true);
    }
    setValues({ ...values, error: true });
    setMessage(setErrorMessage(oValidator.getErrorMessages()));
  };

  const handleAdditionalInfo = () => {
    if (key === "" || value === "") {
      alert("Please fill up additional information completely");
      return;
    }
    additional_info.push({ key, value });
    formData.set("additional_info", JSON.stringify(additional_info));
    setValues({
      ...values,
      additional_info: additional_info,
      key: "",
      value: ""
    });
  };

  const handleDeleteAdditionalInfo = iIndex => oEvent => {
    additional_info.splice(iIndex, 1);
    setValues({
      ...values,
      additional_info: additional_info
    });
  };

  const showErrorDiv = aMessages => {
    return (
      <div className="alert alert-danger">
        {aMessages.map((message, i) => (
          <h6 key={i}>{message}</h6>
        ))}
      </div>
    );
  };

  const showAdditionalInfoForm = (oValue, iIndex) => {
    return (
      <div key={iIndex} className="row">
        <div className="col">
          <input
            type="text"
            className="form-control"
            value={oValue.key}
            readOnly
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            value={oValue.value}
            readOnly
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mb-2 mr-2"
          onClick={handleDeleteAdditionalInfo(iIndex)}
        >
          <i className="fa fa-trash" />
        </button>
      </div>
    );
  };

  const showAddProductForm = () => {
    return (
      <Fragment>
        <div className="col-md-6 col-sm-6 col-xl-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              {error && showErrorDiv(sMessage)}
              <input
                onChange={handleChange("product_name")}
                type="text"
                className={
                  name_error
                    ? "form-control bg-light small mb-2 border-danger"
                    : "form-control bg-light small mb-2"
                }
                placeholder="Product Name"
              />
              <input
                onChange={handleChange("price")}
                type="number"
                className={
                  price_error
                    ? "form-control bg-light small mb-2 border-danger"
                    : "form-control bg-light small mb-2"
                }
                placeholder="Price"
              />
              <input
                onChange={handleChange("stock")}
                type="number"
                className={
                  stock_error
                    ? "form-control bg-light small mb-2 border-danger"
                    : "form-control bg-light small mb-2"
                }
                placeholder="Stock"
              />
              <select
                onChange={handleChange("category")}
                id="category"
                className="btn btn-light w-100 border mb-2"
              >
                <option disabled defaultValue>
                  No category
                </option>
                {categories &&
                  categories.map((oCategory, iIndex) => (
                    <option key={iIndex} value={oCategory._id}>
                      {oCategory.name}
                    </option>
                  ))}
              </select>
              <textarea
                onChange={handleChange("description")}
                className={
                  description_error
                    ? "form-control mb-2 border-danger"
                    : "form-control mb-2"
                }
                id="exampleFormControlTextarea1"
                rows={3}
                placeholder="Description"
                defaultValue={""}
              />
              <div
                className={
                  image_error
                    ? "border p-3 mb-4 border-danger"
                    : "border p-3 mb-4"
                }
              >
                <h6>Image Upload</h6>
                <input
                  onChange={handleChange("image")}
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
                      value={key}
                      onChange={handleChange("key")}
                      type="text"
                      className="form-control"
                      placeholder="Name"
                    />
                  </div>
                  <div className="col">
                    <input
                      value={value}
                      onChange={handleChange("value")}
                      type="text"
                      className="form-control"
                      placeholder="Value"
                    />
                  </div>
                  <button
                    onClick={handleAdditionalInfo}
                    type="submit"
                    className="btn btn-primary mb-2 mr-2"
                  >
                    +
                  </button>
                </div>
                {additional_info.map(showAdditionalInfoForm)}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const showAddProductDetail = () => {
    return (
      <Fragment>
        <div className="col-md-6 col-sm-6 col-xl-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <img
                    src={
                      (image && image) ||
                      "https://ctt.trains.com/sitefiles/images/no-preview-available.png"
                    }
                    style={{ width: "18vw", height: "30vh" }}
                  />
                </div>
                <div className="col-md-6 col-sm-6 mb-4">
                  <h3>{(product_name && product_name) || "Product Name"}</h3>
                  <h4>
                    Price:<span> {(price && price) || "0"}</span>
                  </h4>
                  <h4>
                    Quantity:<span id="qty"> {(stock && stock) || "0"}</span>
                  </h4>
                  <h5>Description:</h5>
                  <p style={{ fontSize: "12px" }}>
                    {(description && description) ||
                      `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                            nisi ut aliquip ex ea commodo consequat.`}
                  </p>
                </div>
                <h4>Additional Information</h4>
                <hr />
                <table className="table text-center">
                  <tbody>
                    {(additional_info.length &&
                      additional_info.map((oValue, iIndex) => (
                        <tr key={iIndex}>
                          <td>{oValue.key}</td>
                          <td>{oValue.value}</td>
                        </tr>
                      ))) || (
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
      </Fragment>
    );
  };

  const showSave = () => {
    return (
      <Fragment>
        <button
          onClick={submitProduct}
          className="btn btn-primary"
          style={{ marginBottom: "15px", marginLeft: "15px" }}
        >
          Save
        </button>
      </Fragment>
    );
  };

  return (
    <DashboardLayout name="Product Management" detail="Add Product">
      {showAddProductForm()}
      {showAddProductDetail()}
      {showSave()}
      {redirectForbidden()}
    </DashboardLayout>
  );
};

export default AddProduct;
