import React, { useEffect, useState, Fragment } from "react";
import DashboardLayout from "../DashboardLayout";
import { getAllProducts, getProductCount } from "../products/productsApi";
import { getAllCategories } from "../categories/categoriesApi";
import oMoment from "moment";
import { IMAGE_API } from "../../../config";
import { isAuthenticated } from "../../../auth/authUtil";
import { createProduct } from "../products/productsApi";
import DataTable from "react-data-table-component";
import _ from 'lodash';

const AddBundle = () => {
  const [products, setProducts] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { sToken, user } = isAuthenticated();
  const [bundles, setBundles] = useState({
    product_name: "",
    description: "",
    image:
      "https://ctt.trains.com/sitefiles/images/no-preview-available.png",
    formData: "",
    display: "T",
    sold_out: "F",
    price: 0,
    stock: 0
  });

  const {
    product_name,
    description,
    image,
    formData,
    display,
    sold_out,
    price,
    stock
  } = bundles;

  useEffect(() => {
    loadCategories();
    loadProductCount();
  }, []);

  const loadCategories = () => {
    getAllCategories().then(oCategories => {
      if (oCategories.error) {
        console.log(oCategories.error);
      } else {
        setCategories(oCategories.data);
      }
    });
  };

  const loadProductCount = () => {
    getProductCount().then(oData => {
      if (oData.error) {
        console.log(oData.error);
      } else {
        loadProducts();
      }
    });
  };

  const loadProducts = () => {
    getAllProducts().then(oProducts => {
      if (oProducts.error) {
        console.log(oProducts.error);
      } else {
        var aNewObject = (oProducts.data).map(oItem => ({ ...oItem, checked: false }));
        setProducts(aNewObject);
        var oForm = new FormData();
        oForm.set("sold_out", "F");
        setBundles({
          ...bundles,
          formData: oForm
        });
      }
    });
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
    if (["stock"].includes(name) === true) {
      // remove leading zeroes
      oEvent.target.value = parseInt(oEvent.target.value, 10);
    }
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

  const submitBundle = oEvent => {
    oEvent.preventDefault();
    let aData = selectedProducts.map(oProduct => {
      const { _id } = oProduct;
      return { product: _id };
    });
    formData.set("bundle_product", JSON.stringify(aData));
    createProduct(user._id, sToken, formData).then(oData => {
      if (oData.error) {
        console.log(oData.error);
      } else {
        alert("Bundle created successfully");
      }
    });
  };

  const showAddBundle = () => {
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
          name: "Date Created",
          selector: "createdAt",
          sortable: true,
          format: oRow => oMoment(oRow.createdAt).format('DD-MM-YYYY')
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
                        placeholder="Description"
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
                      />
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
                      />
                      <label className="form-check-label">Sold Out</label>
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
                <div className="col-sm-12 col-md-12 col-xl-12">
                  <button
                    onClick={submitBundle}
                    className="btn btn-primary mr-2"
                  >
                    Save Bundle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <DashboardLayout name="Bundle Deals Management" detail="Make Bundle">
      {products && showAddBundle()}
    </DashboardLayout>
  );
};

export default AddBundle;
