import React, { useEffect, useState, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";
import { getAllProducts } from "./productsApi";
import { getAllCategories } from "../categories/categoriesApi";
import oMoment from "moment";
import { deleteProduct } from "./productsApi";
import { IMAGE_API } from "../../../config";
import { isAuthenticated } from "../../../auth/authUtil";
import DataTable from "react-data-table-component";
import _ from "lodash";

const Products = () => {
  const [result, setResult] = useState(false);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { sToken, user } = isAuthenticated();
  const [redirectAddProduct, setRedirectAddProduct] = useState(false);
  const [queryString, setQueryString] = useState("");

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, [result]);

  const loadCategories = () => {
    getAllCategories().then((oCategories) => {
      if (oCategories.error) {
        console.log(oCategories.error);
      } else {
        setCategories(oCategories.data);
      }
    });
  };

  const loadProducts = () => {
    getAllProducts().then((oProducts) => {
      if (oProducts.error) {
        console.log(oProducts.error);
      } else {
        setProducts(oProducts.data);
        setOriginalProducts(oProducts.data);
      }
    });
  };

  const handleSelectToggle = ({ allSelected, selectedCount, selectedRows }) => {
    setSelectedProducts(JSON.parse(JSON.stringify(selectedRows)));
  };

  const filterSearch = sQueryString => {
    sQueryString = sQueryString.toLowerCase();
    var results = [];

    for (var j = 0; j < originalProducts.length; j++) {
      var sProductName = originalProducts[j].product_name.toLowerCase();
      if (sProductName.indexOf(sQueryString) !== -1) {
        results.push(originalProducts[j]);
      }
    }

    return results;
  };

  const handleFilterChange = (oEvent) => {
    setFilter(oEvent.target.value);
  };

  const handleFilterClick = (oEvent) => {
    oEvent.preventDefault();
    setProducts(filterSearch(queryString));

    if (filter != "All") {
      var oFiltered = _.filter(filterSearch(queryString), function (oItem) {
        return oItem.category._id == filter; 
      });
      setProducts(oFiltered);
    }
  };

  const submitDelete = () => {
    if (window.confirm("Are you sure you want to delete?") === true) {
      const aProductIds = _.map(selectedProducts, "_id");
      deleteProduct(user._id, sToken, aProductIds).then((oData) => {
        if (oData.error) {
          console.log(oData);
        } else {
          alert("Deleted Successfully");
          setResult(!result);
        }
      });
    }
  };

  const startDeleteProducts = () => {
    deleteProducts(selectedProducts[0]);
  };

  const checkDelete = () => {
    selectedProducts.splice(0, 1);
    if (selectedProducts.length !== 0) {
      setTimeout(function () {
        startDeleteProducts();
      }, 100);
    } else {
      alert("Finished Deleted Product(s)!");
      window.location.reload();
    }
  };

  const deleteProducts = (iProductNo) => {
    deleteProduct(user._id, iProductNo, sToken).then((oData) => {
      if (oData.error) {
      } else {
        checkDelete();
      }
    });
  };

  const redirectToAddProductPage = () => {
    if (redirectAddProduct === true) {
      return <Redirect to="/admin/products/add"></Redirect>;
    }
  };

  const showDeleteProduct = () => {
    return (
      <Fragment>
        <div className="float-right mb-2 d-block">
          <button className="btn btn-danger" onClick={submitDelete}>
            <i className="fa fa-trash" /> Delete
          </button>
        </div>
      </Fragment>
    );
  };

  const handleChangeQuery = (oEvent) => {
    setQueryString(oEvent.target.value);
  }

  const sendSubmit = oEvent => {
    oEvent.persist();
    if (oEvent.key === 'Enter') {
      handleFilterClick(oEvent);
    }
  }

  const showProducts = () => {
    const oData = products;
    const oColumns = [
      {
        name: "Thumbnail",
        cell: (oRow) => {
          return (
            <Fragment>
              <img
                src={`${IMAGE_API}/images/products/${oRow.image}`}
                style={{
                  width: "50%",
                }}
              />
            </Fragment>
          );
        },
      },
      {
        name: "Product Name",
        selector: "product_name",
        sortable: true,
        cell: (oRow) => {
          return (
            <Fragment>
              <Link to={`/admin/products/update/${oRow._id}`}>
                {oRow.product_name}
              </Link>
            </Fragment>
          );
        },
      },
      {
        name: "Category",
        selector: "category.name",
        sortable: true,
      },
      {
        name: "Stock",
        selector: "stock",
        sortable: true,
      },
      {
        name: "Price",
        selector: "price",
        sortable: true,
      },
      {
        name: "Date Created",
        selector: "createdAt",
        sortable: true,
        format: (oRow) => oMoment(oRow.createdAt).format("DD-MM-YYYY"),
      },
    ];

    return (
      <Fragment>
        <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <h4>Search and Filter</h4>
              <div className="form-group row">
                <div className="col-sm-5">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-light border-0 small"
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                      value={queryString}
                      onChange={handleChangeQuery}
                      onKeyPress={sendSubmit}
                    />
                    <div className="input-group-append">
                      <span
                        className="btn btn-primary"
                        onClick={handleFilterClick}
                      >
                        <i className="fas fa-search fa-sm" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <select
                id="category"
                className="btn btn-light border mr-2"
                onChange={handleFilterChange}
              >
                <option value="All">All categories</option>
                {categories &&
                  categories.map((oCategory, iIndex) => (
                    <option key={iIndex} value={oCategory._id}>
                      {oCategory.name}
                    </option>
                  ))}
              </select>
              <button className="btn btn-primary mr-2" style={{float: "right"}} onClick={()=>{setRedirectAddProduct(true)}}>Add Product</button>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              {products.length > 0 && showDeleteProduct()}
              <style>{`.bfOOvg { height: auto !important }`}</style>
              <DataTable
                title={"Product List"}
                columns={oColumns}
                data={oData}
                pagination={true}
                striped
                selectableRows
                keyField="_id"
                onSelectedRowsChange={handleSelectToggle}
                selectableRowsNoSelectAll={true}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  };
  return (
    <DashboardLayout name="Product Management" detail="All Products">
      {showProducts()}
      {redirectToAddProductPage()}
    </DashboardLayout>
  );
};

export default Products;
