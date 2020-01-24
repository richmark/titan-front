import React, { useEffect, useState, Fragment } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { isAuthenticated } from "../../../auth/authUtil";
import { getBundle, updateBundle } from "./bundlesApi";
import DashboardLayout from "../DashboardLayout";
import { IMAGE_API } from "../../../config";
import { getAllProducts, getProductCount } from "../products/productsApi";
import oMoment from "moment";

const UpdateBundle = ({ match }) => {
  const [products, setProducts] = useState(false);
  const { sToken, user } = isAuthenticated();
  const [cancel, setCancel] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [bundles, setBundles] = useState({
    _id: "",
    bundle_name: "",
    discount_value: "",
    bundle_description: "",
    discount_type: "",
    bundle_thumbnail:
      "https://ctt.trains.com/sitefiles/images/no-preview-available.png",
    products: [],
    formData: ""
  });
  const {
    _id,
    bundle_name,
    discount_value,
    bundle_description,
    discount_type,
    bundle_thumbnail,
    formData
  } = bundles;

  const loadProductCount = () => {
    getProductCount().then(oData => {
      if (oData.error) {
        console.log(oData.error);
      } else {
        loadProducts();
      }
    });
  };

  const loadProducts = (iLimit, iOffset, sOrder, sSortBy) => {
    getAllProducts(iLimit, iOffset, sOrder, sSortBy).then(oProducts => {
      if (oProducts.error) {
        console.log(oProducts.error);
      } else {
        setProducts(oProducts.data);
        loadBundle();
      }
    });
  };

  const loadBundle = () => {
    getBundle(user._id, sToken, match.params.bundleId).then(oBundle => {
      if (oBundle.error) {
        console.log(oBundle.error);
      } else {
        setBundles({
          ...oBundle.data,
          formData: new FormData(),
          bundle_thumbnail: `${IMAGE_API}/images/bundles/${oBundle.data.bundle_thumbnail}`
        });
        var aProduct = [];
        oBundle.data.products.map(oItem => {
          aProduct.push({...oItem.product, count: oItem.count});
        })
        setSelectedProducts(aProduct);
      }
    });
  };

  useEffect(() => {
    loadProductCount();
  }, []);

  const validateImage = (oFile, oEvent, name) => {
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

    if (oFile === undefined) {
      formData.set(name, "");
      setBundles({
        ...bundles,
        [name]: ""
      });
      return false;
    }
    return true;
  };

  const handleChange = name => oEvent => {
    if (name !== "bundle_thumbnail") {
      const value = oEvent.target.value;
      formData.set(name, value);
      setBundles({ ...bundles, [name]: value });
      return;
    }
    let oFile = oEvent.target.files[0];
    const bResult = validateImage(oFile, oEvent, name);
    if (bResult === true) {
      formData.set(name, oFile);
      let oReader = new FileReader();
      oReader.onloadend = () => {
        setBundles({
          ...bundles,
          [name]: oReader.result
        });
      };
      oReader.readAsDataURL(oFile);
    }
  };

  const removeSelectedProduct = sProductId => oEvent => {
    const iIndex = selectedProducts.findIndex(
      oProduct => oProduct._id === sProductId
    );
    selectedProducts.splice(iIndex, 1);
    setSelectedProducts(JSON.parse(JSON.stringify(selectedProducts)));
  };

  const handleProductCount = sProductId => oEvent => {
    if (oEvent.target.value === "") {
      oEvent.target.value = 1;
    }
    const iIndex = selectedProducts.findIndex(
      oProduct => oProduct._id === sProductId
    );
    selectedProducts[iIndex].count = oEvent.target.value;
    setSelectedProducts(JSON.parse(JSON.stringify(selectedProducts)));
  };

  const getTotalPrice = () => {
    var iTotal = 0;
    selectedProducts.forEach(oElement => {
      iTotal += oElement.count
        ? oElement.count * oElement.price
        : oElement.price;
    });
    return iTotal;
  };

  const getDiscountedPrice = () => {
    if (discount_type && discount_value) {
      var iTotal = getTotalPrice();
      return discount_type === "fix"
        ? (iTotal -= discount_value)
        : iTotal - iTotal * (discount_value / 100);
    }
    return 0;
  };

  const resetBundle = () => {
    setSelectedProducts([]);
    document.getElementById("image").value = "";
    document.getElementById("discount_type").value = "fix";
    var oForm = new FormData();
    oForm.set("discount_type", "fix");
    setBundles({
      bundle_name: "",
      bundle_description: "",
      bundle_thumbnail:
        "https://ctt.trains.com/sitefiles/images/no-preview-available.png",
      discount_type: "fix",
      discount_value: "",
      formData: oForm
    });
  };

  const cancelUpdate = oEvent => {
    oEvent.preventDefault();
    if (window.confirm("Are you sure you want to cancel?") === true) {
      setCancel(true);
    }
  };

  const redirectPage = () => {
    if (cancel === true) {
      return <Redirect to="/admin/bundles" />;
    }
  };

  const isProductSelected = sProductId => {
    let oData = selectedProducts.find(oProduct => oProduct._id === sProductId);
    return oData === undefined ? false : true;
  };

  const handleSelectToggle = oEvent => {
    var productId = oEvent.target.value;
    if (oEvent.target.checked) {
      var oSelectedData = products.find(oItem => oItem._id === productId);
      oSelectedData.count = "1";
      selectedProducts.push(oSelectedData);
      setSelectedProducts(JSON.parse(JSON.stringify(selectedProducts)));
      return;
    }
    var iIndex = selectedProducts.findIndex(oItem => oItem._id === productId);
    selectedProducts.splice(iIndex, 1);
    setSelectedProducts(JSON.parse(JSON.stringify(selectedProducts)));
  };

  const submitBundle = oEvent => {
    oEvent.preventDefault();
    let aData = selectedProducts.map(oProduct => {
      const { _id, count } = oProduct;
      return { product: _id, count };
    });
    formData.set("products", JSON.stringify(aData));
    updateBundle(user._id, sToken, formData, match.params.bundleId).then(oData => {
      if (oData.error) {
        console.log(oData.error);
      } else {
        alert(oData.msg);
      }
    });
  };

  const showBundle = () => {
    return (
      <Fragment>
        <div className="col-md-7 col-sm-7 col-xl-7 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <h4>Search and filter</h4>
              <div className="form-group row">
                <label
                  htmlFor="product-name"
                  className="col-sm-2 col-form-label"
                >
                  Bundle Name
                </label>
                <div className="col-sm-5">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-light border-0 small"
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <select id="category" className="btn btn-light border mr-2">
                <option value="null" disabled>
                  Select a Category
                </option>
              </select>
              <select id="category" className="btn btn-light border mr-2">
                <option value="null" disabled>
                  Filter by stock
                </option>
                <option value="null">In stock</option>
                <option value="null">Out of stock</option>
              </select>
              <button className="btn btn-primary">Filter</button>
              <div className="mt-5">
                <div className="float-left">
                  <span>10</span> Items
                </div>
                <div className="float-right mb-2">
                  <button onClick={cancelUpdate} className="btn btn-danger">
                    {" "}
                    Cancel
                  </button>
                  <button onClick={resetBundle} className="btn btn-primary">
                    {" "}
                    Reset Bundle
                  </button>
                </div>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: "3%" }}>
                        <input type="checkbox" />
                      </th>
                      <th scope="col" style={{ width: "8%" }}>
                        Thumbnail
                      </th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Stock</th>
                      <th scope="col">Price</th>
                      <th scope="col">Category</th>
                      <th scope="col">Date Created</th>
                    </tr>
                  </thead>
                  <tbody>
                  {products &&
                      products.map((oProduct, iIndex) => {
                        return (
                          <tr key={iIndex}>
                            <th scope="row">
                              <input
                                checked={isProductSelected(oProduct._id)}
                                type="checkbox"
                                value={oProduct._id}
                                name="productCheckbox"
                                onChange={handleSelectToggle}
                              />
                            </th>
                            <td className="text-center">
                              <img
                                src={`${IMAGE_API}/images/products/${oProduct.image}`}
                                style={{
                                  width: "50%"
                                }}
                              />
                            </td>
                            <td>{oProduct.product_name}</td>
                            <td>{oProduct.stock}</td>
                            <td>{oProduct.price}</td>
                            <td>{oProduct.category.name}</td>
                            <td>
                              {oMoment(oProduct.createdAt).format("DD-MM-YYYY")}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <div className=" text-center">
                  <nav aria-label="Page navigation example text-center">
                    <ul className="pagination">
                      <li className="page-item">
                        <a className="page-link" href="#">
                          Previous
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5 col-sm-5 col-xl-5 mb-5">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-xl-12">
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-4 col-form-label"
                    >
                      Bundle Name
                    </label>
                    <div className="col-sm">
                      <input
                        onChange={handleChange("bundle_name")}
                        value={bundle_name}
                        type="text"
                        className="form-control"
                        id="image"
                        placeholder="Name"
                      />
                    </div>
                    <div className="col-sm">
                      <select
                        value={discount_type}
                        onChange={handleChange("discount_type")}
                        id="discount_type"
                        className="btn btn-light border mr-2"
                      >
                        <option value="default" disabled>
                          Discount type
                        </option>
                        <option value="fix">Fix Value</option>
                        <option value="percentage">Percentage</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-4 col-form-label"
                    >
                      Discount Value
                    </label>
                    <div className="col-sm">
                      <input
                        value={discount_value}
                        onChange={handleChange("discount_value")}
                        type="text"
                        className="form-control"
                        id="inputPassword"
                        placeholder="Value"
                      />
                    </div>
                  </div>
                  <textarea
                    value={bundle_description}
                    onChange={handleChange("bundle_description")}
                    className="form-control"
                    id="exampleFormControlTextarea1"
                  />
                  <div className="border p-3 mb-4 mt-3">
                    <h6>Image Upload</h6>
                    <input
                      onChange={handleChange("bundle_thumbnail")}
                      type="file"
                      className="form-control-file"
                      id="exampleFormControlFile1"
                    />
                  </div>
                  <div className="border p-3 mb-4 mt-3">
                    <img
                      src={bundle_thumbnail}
                      style={{ width: "28vw", height: "25vh" }}
                    />
                  </div>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="border-0"
                          style={{ width: "3%" }}
                        />
                        <th scope="col" style={{ width: "8%" }}>
                          Thumbnail
                        </th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Sub total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProducts.length > 0 &&
                        selectedProducts.map((oProduct, iIndex) => {
                          return (
                            <tr key={iIndex}>
                              <th scope="row">
                                <button
                                  onClick={removeSelectedProduct(oProduct._id)}
                                  className="btn btn-sm btn-danger"
                                >
                                  <i className="fa fa-minus" />
                                </button>
                              </th>
                              <td className="text-center">
                                <img
                                  src={`${IMAGE_API}/images/products/${oProduct.image}`}
                                  style={{ width: "50%" }}
                                />
                              </td>
                              <td>{oProduct.product_name}</td>
                              <td>{oProduct.price}</td>
                              <td>
                                <input
                                  min="1"
                                  value={oProduct.count ? oProduct.count : 1}
                                  onChange={handleProductCount(oProduct._id)}
                                  type="number"
                                  className="form-control bg-light border-0 small"
                                  placeholder="Qty"
                                  style={{ paddingRight: "6px", width: "70px" }}
                                />
                              </td>
                              <td>
                                {oProduct.count === undefined
                                  ? oProduct.price
                                  : oProduct.count * oProduct.price}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  <div className="float-right mb-2 w-100">
                    <p>
                      Total:{" "}
                      <span className="float-right">
                        {selectedProducts.length > 0 && getTotalPrice()}
                      </span>
                    </p>
                    <p>
                      Discounted Price:{" "}
                      <span className="float-right">
                        {" "}
                        {selectedProducts.length > 0 && getDiscountedPrice()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-12">
                <button onClick={submitBundle} className="btn btn-primary">Update Bundle</button>
                <button className="btn btn-primary">View Bundle Details</button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <DashboardLayout name="Bundle Management" detail="Update Bundle">
      {showBundle()}
      {redirectPage()}
    </DashboardLayout>
  );
};

export default UpdateBundle;
