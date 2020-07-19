import React, { Component, useState, useEffect, Fragment } from "react";
import DashboardLayout from "../DashboardLayout";
import { isAuthenticated } from "../../../auth/authUtil";
import { getAllCategories } from "../../admin/categories/categoriesApi";
import { updateProduct, getProduct } from "./productsApi";
import { IMAGE_API } from "../../../config";

const UpdateProduct = ({ match }) => {
  const [price_error, setPriceError] = useState(false);
  const [discount_error, setDiscountError] = useState(false);
  const { sToken, user } = isAuthenticated();
  const [categories, setCategories] = useState([]);
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
    formData: "",
    display: 'T',
    sold_out: 'F',
    brand: '',
    metro_manila: 0,
    luzon: 0,
    visayas: 0,
    mindanao: 0
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
    formData,
    display,
    sold_out,
    display_sale,
    discount_sale,
    brand,    
    metro_manila,
    luzon,
    visayas,
    mindanao
  } = values;

  const loadCategories = () => {
    getAllCategories().then(oCategories => {
      if (oCategories.error) {
        console.log(oCategories.error);
      } else {
        setCategories(oCategories.data);
      }
    });
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
    setValues({
      ...values,
      [name]: []
    });
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

  const getParameters = () => {
    if (match.params.productId !== undefined) {
      getProduct(match.params.productId).then(oData => {
        if (oData.error) {
          console.log(oData.error);
        } else {          
          if (oData.data.delivery_price) {
            var iMetroManila = oData.data.delivery_price.metro_manila;
            var iLuzon = oData.data.delivery_price.luzon;
            var iVisayas = oData.data.delivery_price.visayas;
            var iMindanao = oData.data.delivery_price.mindanao;
          }
          setValues({
            key: "",
            value: "",
            product_name: oData.data.product_name,
            price: oData.data.price,
            category: oData.data.category,
            stock: oData.data.stock,
            description: oData.data.description,
            image: `${IMAGE_API}/images/products/${oData.data.image}`,
            additional_images:
              (oData.data.additional_images &&
                oData.data.additional_images.map(
                  sImage => `${IMAGE_API}/images/products/${sImage}`
                )) ||
              [],
            additional_info: oData.data.additional_info,
            formData: new FormData(),
            display: oData.data.display,
            sold_out: oData.data.sold_out,
            display_sale: oData.data.display_sale,
            discount_sale: oData.data.discount_sale,
            brand: oData.data.brand,
            metro_manila: iMetroManila,
            luzon: iLuzon,
            visayas: iVisayas,
            mindanao: iMindanao
          });
          loadCategories();
        }
      });
    }
  };

  useEffect(() => {
    getParameters();
  }, []);

  const submitProduct = oEvent => {
    oEvent.preventDefault();
    formData.set('delivery_price', JSON.stringify({metro_manila, luzon, visayas, mindanao}));
    updateProduct(user._id, sToken, formData, match.params.productId).then(
      oData => {
        if (oData.error) {
          console.log(oData.error);
        } else {
          alert("Product updated successfully");
        }
      }
    );
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
    formData.set("additional_info", JSON.stringify(additional_info));
    setValues({
      ...values,
      additional_info: additional_info
    });
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

  const showUpdateProductForm = () => {
    return (
      <Fragment>
        <div className="col-md-6 col-sm-6 col-xl-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <input
                value={product_name}
                onChange={handleChange("product_name")}
                type="text"
                className="form-control bg-light small mb-2"
                placeholder="Product Name"
              />
              <input
                value={price}
                onChange={handleChange("price")}
                type="text"
                className="form-control bg-light small mb-2"
                placeholder="Price"
              />
              <input
                value={stock}
                onChange={handleChange("stock")}
                type="text"
                className="form-control bg-light small mb-2"
                placeholder="Stock"
              />
              <select
                value={brand}
                onChange={handleChange("brand")}
                id="brand"
                className="btn btn-light w-100 border mb-2"
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
                value={category}
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
                value={description}
                onChange={handleChange("description")}
                className="form-control mb-2"
                id="exampleFormControlTextarea1"
                rows={3}
                placeholder="Description"
              />
              <div className="border p-3 mb-4">
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
                  <label className="form-check-label" >Display</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id="inlineCheckbox2" onChange={handleChange("sold_out")} value={sold_out === 'F' ? 'T' : 'F'} checked={sold_out === 'F' ? false : true}></input>
                  <label className="form-check-label" >Sold Out</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox3"
                    onChange={handleChange("display_sale")}
                    value={display_sale === "F" ? "T" : "F"}
                    checked={display_sale === "F" ? false : true}
                  ></input>
                  <label className="form-check-label">On Sale</label>
                </div>
                {display_sale === 'T' && <div className="row">
                  <div className="col-sm-3 form-label col-form-label text-center">
                    <label>Sale Discount %: </label>
                  </div>
                  <div className="col-sm-9">
                    <input
                      value={discount_sale}
                      onChange={handleChange("discount_sale")}
                      type="number"
                      className={
                        discount_error
                          ? "form-control bg-light small mb-2 border-danger"
                          : "form-control bg-light mb-2"
                      }
                      placeholder="Sale Discount %"
                    />
                  </div>
                  </div>}  
              </div>

              <div className="border p-3 mt-2">
                <h6>Delivery Price</h6>
                  <div className="form-group row">
                    <div className="col-sm-3 form-label col-form-label text-center">
                      <label>Metro Manila: </label>
                    </div>
                    <div className="col-sm-9">
                      <input
                        value={metro_manila}
                        onChange={handleChange("metro_manila")}
                        type="number"
                        className={
                          price_error
                            ? "form-control bg-light small mb-2 border-danger"
                            : "form-control bg-light mb-2"
                        }
                        placeholder="Metro Manila Price"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-3 form-label col-form-label text-center">
                      <label>Luzon: </label>
                    </div>
                    <div className="col-sm-9">
                      <input
                        value={luzon}
                        onChange={handleChange("luzon")}
                        type="number"
                        className={
                          price_error
                            ? "form-control bg-light small mb-2 border-danger"
                            : "form-control bg-light mb-2"
                        }
                        placeholder="Luzon Price"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-3 form-label col-form-label text-center">
                      <label>Visayas: </label>
                    </div>
                    <div className="col-sm-9">
                      <input
                        value={visayas}
                        onChange={handleChange("visayas")}
                        type="number"
                        className={
                          price_error
                            ? "form-control bg-light small mb-2 border-danger"
                            : "form-control bg-light mb-2"
                        }
                        placeholder="Visayas Price"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-3 form-label col-form-label text-center">
                      <label>Mindanao: </label>
                    </div>
                    <div className="col-sm-9">
                      <input
                        value={mindanao}
                        onChange={handleChange("mindanao")}
                        type="number"
                        className={
                          price_error
                            ? "form-control bg-light small mb-2 border-danger"
                            : "form-control bg-light mb-2"
                        }
                        placeholder="Mindanao Price"
                      />
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const showUpdateProductDetail = () => {
    return (
      <Fragment>
        <div className="col-md-6 col-sm-6 col-xl-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <img src={image} style={{ width: "18vw", height: "30vh" }} />
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
                  {additional_images.length > 0 &&
                    additional_images.map((oImage, iIndex) => {
                      return (
                        <img
                          key={iIndex}
                          style={{ width: "8vw", height: "10vh" }}
                          className="mr-2"
                          src={oImage}
                        />
                      );
                    })}
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

  const showUpdate = () => {
    return (
      <Fragment>
        <button
          onClick={submitProduct}
          className="btn btn-primary"
          style={{ marginBottom: "15px", marginLeft: "15px" }}
        >
          Update
        </button>
      </Fragment>
    );
  };

  return (
    <DashboardLayout name="Product Management" detail={[<a href='/admin/products'>All Products</a>, ' / Update Product']}>
      {showUpdateProductForm()}
      {showUpdateProductDetail()}
      {showUpdate()}
    </DashboardLayout>
  );
};

export default UpdateProduct;
