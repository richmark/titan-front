import React, { Component, useState, useEffect, Fragment } from "react";
import DashboardLayout from "../DashboardLayout";
import { isAuthenticated } from "../../../auth/authUtil";
import { getAllCategories } from "../../admin/categories/categoriesApi";
import { createProduct } from "./productsApi";
import { oValidatorLibrary } from "../../../libraries/validatorLibrary";
import _ from "lodash";
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
    additional_images: [],
    additional_info: [],
    key: "",
    value: "",
    error: false,
    formData: "",
    display: 'T',
    sold_out: 'F'
  });

  const {
    product_name,
    price,
    stock,
    category,
    description,
    image,
    additional_images,
    additional_info,
    key,
    value,
    error,
    formData,
    display,
    sold_out
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
    if (name !== "image" && name !== "additional_images") {
      const value = oEvent.target.value;
      formData.set(name, value);
      setValues({ ...values, [name]: value });
      return;
    }
    if (name === "image") {
      let oFile = oEvent.target.files[0];
      const bResult = validateImage(oFile, oEvent, name);
      if (bResult === true) {
        formData.set(name, oFile);
        getImage([oFile], name);
      }
      return;
    }
    let aImageFile = [];
    for (var iCount = 0; iCount < oEvent.target.files.length; iCount++) {
      let bResult = validateImage(oEvent.target.files[iCount], oEvent, name);
      if (bResult === true) {
        formData.append(name, oEvent.target.files[iCount]);
        aImageFile.push(oEvent.target.files[iCount]);
      }
    }
    return getImage(aImageFile, name);
  };

  const getImage = (aFile, name) => {
    aFile.map((oFile, iIndex) => {
      let oReader = new FileReader();
      oReader.onloadend = () => {
        if (name === "image") {
          setValues({
            ...values,
            [name]: oReader.result
          });
        } else {
          setValues(oState => {
            const additional_images = [
              ...oState.additional_images,
              oReader.result
            ];
            return { ...oState, additional_images };
          });
        }
      };
      oReader.readAsDataURL(oFile);
    });
  };

  const validateImage = (oFile, oEvent, name) => {
    if (oFile === undefined) {
      formData.set(name, "");
      setValues({
        ...values,
        [name]: ""
      });
      return false;
    }

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
      return false;
    }

    return true;
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
                onChange={handleChange("brand")}
                id="brand"
                className="btn btn-light w-100 border mb-2"
                defaultValue={'Titan'}
              >
                <option disabled defaultValue>
                  Select brand
                </option>
                <option value={'Yojimbo'}>
                  Yojimbo
                </option>
                <option value={'Titan'}>
                  Titan
                </option>
              </select>
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
                    ? "border p-3 mb-2 border-danger"
                    : "border p-3 mb-2"
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
              <div className="border p-3 mb-2">
                <h6>Additional Images</h6>
                <input
                  onChange={handleChange("additional_images")}
                  type="file"
                  multiple
                  className="form-control-file"
                  id="additional_images"
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
              <div className="border p-3 mt-2">
                <h6>Product Display</h6>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id="inlineCheckbox1" onChange={handleChange("display")} value={display === 'T' ? 'F' : 'T'} checked={display === 'T' ? true : false}></input>
                  <label className="form-check-label">Display</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id="inlineCheckbox2" onChange={handleChange("sold_out")} value={sold_out === 'F' ? 'T' : 'F'} checked={sold_out === 'F' ? false : true}></input>
                  <label className="form-check-label">Sold Out</label>
                </div>  
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const getDefaultAdditionalImages = () => {
    var aImages = [];
    _.times(4, iIndex => {
      aImages.push(
        <img
          key={iIndex}
          className="mr-2"
          src="https://ctt.trains.com/sitefiles/images/no-preview-available.png"
          style={{ width: "8vw", height: "10vh" }}
        />
      );
    });
    return aImages;
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
                <div className="col-md-12 col-sm-12 mb-4 ml-4">
                  {(additional_images.length > 0 &&
                    additional_images.map((oImage, iIndex) => {
                      return (
                        <img
                          key={iIndex}
                          style={{ width: "8vw", height: "10vh" }}
                          className="mr-2"
                          src={oImage}
                        />
                      );
                    })) ||
                    getDefaultAdditionalImages()}
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
