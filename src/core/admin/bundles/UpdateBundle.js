import React, { useEffect, useState, Fragment } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { isAuthenticated } from "../../../auth/authUtil";
import { getBundle, updateBundle } from "./bundlesApi";
import DashboardLayout from "../DashboardLayout";
import { IMAGE_API } from "../../../config";
import { getAllProducts, getProductCount } from "../products/productsApi";
import oMoment from "moment";
import DataTable from "react-data-table-component";
import _ from 'lodash';

const UpdateBundle = ({ match }) => {
  const [price_error, setPriceError] = useState(false);
  const [products, setProducts] = useState(false);
  const { sToken, user } = isAuthenticated();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [bundles, setBundles] = useState({
    _id: "",
    product_name: "",
    discount_value: "",
    description: "",
    discount_type: "",
    image:
      "/default_image.png",
    products: [],
    formData: "",
    display: "T",
    sold_out: "F",
    price: 0,
    stock: 0,
    metro_manila: 0,
    luzon: 0,
    visayas: 0,
    mindanao: 0
  });
  const {
    _id,
    product_name,
    discount_value,
    description,
    discount_type,
    image,
    formData,
    display,
    sold_out,
    price,
    stock,
    metro_manila,
    luzon,
    visayas,
    mindanao
  } = bundles;

  const loadProductCount = () => {
    getProductCount().then(oData => {
      if (oData.error) {
        console.log(oData.error);
      } else {
        loadBundle();
      }
    });
  };

  const loadBundle = () => {
    getBundle(user._id, sToken, match.params.bundleId).then(oBundle => {
      if (oBundle.error) {
        console.log(oBundle.error);
      } else {
        if (oBundle.data.delivery_price) {
          var iMetroManila = oBundle.data.delivery_price.metro_manila;
          var iLuzon = oBundle.data.delivery_price.luzon;
          var iVisayas = oBundle.data.delivery_price.visayas;
          var iMindanao = oBundle.data.delivery_price.mindanao;
        }
        setBundles({
          ...oBundle.data,
          formData: new FormData(),
          image: `${IMAGE_API}/images/products/${oBundle.data.image}`,
          metro_manila: iMetroManila,
          luzon: iLuzon,
          visayas: iVisayas,
          mindanao: iMindanao
        });
        var aProduct = [];
        oBundle.data.bundle_product.map(oItem => {
          aProduct.push({ ...oItem.product, checked: true });
        });
        setSelectedProducts(aProduct);
        loadProducts(aProduct);
      }
    });
  };

  const loadProducts = (aProduct) => {
    getAllProducts().then(oProducts => {
      if (oProducts.error) {
        console.log(oProducts.error);
      } else {
        var aMergedProduct = oProducts.data.map(oElement => ({
          ...aProduct.find((oItem) => (oItem._id === oElement._id) && oItem),
          ...oElement
        }));
        setProducts(aMergedProduct);
      }
    });
  };

  useEffect(() => {
    loadProductCount();
  }, []);

  const validateImage = (oFile, oEvent, name) => {
    if (oFile === undefined) {
      formData.set(name, "");
      setBundles({
        ...bundles,
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

  const handleChange = name => oEvent => {
    if (name !== "image") {
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

  const isProductSelected = oRow => {
    return oRow.checked;
  };

  const handleSelectToggle = ({ allSelected, selectedCount, selectedRows }) => {
    setSelectedProducts(JSON.parse(JSON.stringify(selectedRows)));
    const aBundleIds = _.map(selectedRows, '_id');
    var aIndex = [];
    aBundleIds.forEach(sId => {
      aIndex.push(products.findIndex(oProduct => oProduct._id === sId));
    })
    aIndex.forEach(sIndex => {
      products[sIndex].checked = true;
    });
  };

  const submitBundle = oEvent => {
    oEvent.preventDefault();
    let aData = selectedProducts.map(oProduct => {
      const { _id, count } = oProduct;
      return { product: _id, count };
    });
    formData.set("bundle_product", JSON.stringify(aData));
    formData.set('delivery_price', JSON.stringify({metro_manila, luzon, visayas, mindanao}));
    updateBundle(user._id, sToken, formData, match.params.bundleId).then(
      oData => {
        if (oData.error) {
          console.log(oData.error);
        } else {
          alert(oData.msg);
        }
      }
    );
  };

  const showBundle = () => {
    const oData = products;
    const oColumns = [
      {
        name: "Thumbnail",
        cell: oRow => {
          return (
            <Fragment>
              <img
                src={`${IMAGE_API}/images/products/${oRow.image}`}
                style={{
                  width: "50%"
                }}
              />
            </Fragment>
          )
        }
      },
      {
        name: "Product Name",
        selector: "product_name",
        sortable: true
      },
      {
        name: "Category",
        selector: "category.name",
        sortable: true
      },
      {
        name: "Price",
        selector: "price",
        sortable: true,
      }
    ];

    return (
      <Fragment>
        <div className="col-md-7 col-sm-7 col-xl-7 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="mt-5">
                <style>
                  {`.bfOOvg { height: auto !important }`}
                </style>
                <DataTable
                  title={'Product List'}
                  columns={oColumns}
                  data={oData}
                  pagination={true}
                  striped
                  selectableRows
                  keyField='_id'
                  onSelectedRowsChange={handleSelectToggle}
                  selectableRowsNoSelectAll={true}
                  selectableRowSelected={isProductSelected}
                />
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
                    <div className="col-sm-12">
                      <input
                        value={product_name}
                        type="text"
                        onChange={handleChange("product_name")}
                        className="form-control"
                        id="inputPassword"
                        placeholder="Bundle Name"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-12">
                      <textarea
                        placeholder="description"
                        value={description}
                        onChange={handleChange("description")}
                        className="form-control"
                        id="exampleFormControlTextarea1"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="pr-0 col-sm-2 col-form-label"
                    >
                      Stock
                    </label>
                    <div className="pl-0 col-sm-10">
                      <input
                        value={stock}
                        type="number"
                        onChange={handleChange("stock")}
                        className="form-control"
                        id="inputPassword"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="pr-0 col-sm-2 col-form-label"
                    >
                      Price
                    </label>
                    <div className="pl-0 col-sm-10">
                      <input
                        value={price}
                        min={1}
                        onChange={handleChange("price")}
                        type="number"
                        className="form-control"
                        id="inputPassword"
                        placeholder="Price"
                      />
                    </div>
                  </div>
                  <div className="border p-3 mb-4 mt-3">
                    <h6>Image Upload</h6>
                    <input
                      onChange={handleChange("image")}
                      type="file"
                      className="form-control-file"
                      id="image"
                    />
                  </div>
                  <div className="border p-3 mb-4 mt-3">
                    <img
                      src={image}
                      style={{
                        width: "28vw",
                        height: "25vh",
                        maxWidth: "250px"
                      }}
                    />
                  </div>
                  <div className="border p-3 mt-2 mb-4">
                    <h6>Product Display</h6>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox1"
                        onChange={handleChange("display")}
                        value={display === "T" ? "F" : "T"}
                        checked={display === "T" ? true : false}
                      ></input>
                      <label className="form-check-label">Display</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox2"
                        onChange={handleChange("sold_out")}
                        value={sold_out === "F" ? "T" : "F"}
                        checked={sold_out === "F" ? false : true}
                      ></input>
                      <label className="form-check-label">Sold Out</label>
                    </div>
                  </div>
                  <div className="border p-3 mb-4">
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
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col" style={{ width: "8%" }}>
                          Thumbnail
                        </th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProducts.length > 0 &&
                        selectedProducts.map((oProduct, iIndex) => {
                          return (
                            <tr key={iIndex}>
                              <td className="text-center">
                                <img
                                  src={`${IMAGE_API}/images/products/${oProduct.image}`}
                                  style={{
                                    width: "50%"
                                  }}
                                />
                              </td>
                              <td>{oProduct.product_name}</td>
                              <td>{oProduct.price}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-12">
                <button onClick={submitBundle} className="btn btn-primary">
                  Update Bundle
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <DashboardLayout name="Bundle Deals Management" detail={[<a href='/admin/bundles'>All Bundles</a>, ' / Update Bundle']}>
      {products && showBundle()}
    </DashboardLayout>
  );
};

export default UpdateBundle;
