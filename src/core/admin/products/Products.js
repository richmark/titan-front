import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";
import { getAllProducts, getProductCount } from "./productsApi";
import { getAllCategories } from "../categories/categoriesApi";
import oMoment from "moment";
import { deleteProduct } from "./productsApi";
import { IMAGE_API } from "../../../config";
import { isAuthenticated } from "../../../auth/authUtil";
import { shallowEqual } from "@babel/types";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [count, setCount] = useState(0);
  const [showCount, setShowCount] = useState(5);
  const [paginationCount, setPaginationCount] = useState(0);
  const [paginationStart, setPaginationStart] = useState(1);
  const [paginationEnd, setPaginationEnd] = useState(10);
  const [pageActive, setPageActive] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { sToken, user } = isAuthenticated();

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

  const loadProducts = (iLimit, iOffset, sOrder, sSortBy) => {
    getAllProducts(iLimit, iOffset, sOrder, sSortBy).then(oProducts => {
      if (oProducts.error) {
        console.log(oProducts.error);
      } else {
        setProducts(oProducts.data);
      }
    });
  };

  const loadProductCount = () => {
    getProductCount().then(oData => {
      if (oData.error) {
        console.log(oData.error);
      } else {
        var iCount = oData.data.count;
        setCount(iCount);
        initializePagination(iCount, 5);
      }
    });
  };

  const initializePagination = (iCount, iShowCount) => {
    var iPaginationCount = Math.ceil(iCount / iShowCount);
    resetPagination();
    setPaginationCount(iPaginationCount);
    iPaginationCount > 9
      ? setPaginationEnd(9)
      : setPaginationEnd(iPaginationCount);

    loadProducts(
      iShowCount,
      parseInt(iShowCount * (pageActive - 1), "asc", "_id")
    );
  };

  const handleShowChange = oEvent => {
    var newShowCount = oEvent.target.value;
    setShowCount(newShowCount);
    initializePagination(count, newShowCount);
  };

  const handleNextPagination = oEvent => {
    var newPageActive = pageActive + 1;

    if (paginationCount > pageActive) {
      setPageActive(newPageActive);
      loadProducts(showCount, 0, "asc", "_id");
    }

    if (paginationEnd >= 9) {
      if (
        pageActive >= Math.ceil(paginationEnd / 2) &&
        paginationEnd !== paginationCount
      ) {
        setPaginationEnd(paginationEnd + 1);
        setPaginationStart(paginationStart + 1);
      }
    }
  };

  const handlePrevPagination = oEvent => {
    var newPageActive = pageActive - 1;

    if (pageActive > 1) {
      setPageActive(newPageActive);
      loadProducts(
        showCount,
        parseInt(showCount * (newPageActive - 1), "asc", "_id")
      );
    }

    if (paginationEnd >= 9) {
      if (
        pageActive >= Math.ceil(paginationEnd / 2) &&
        paginationStart !== 1 &&
        pageActive <= paginationCount - 4
      ) {
        setPaginationEnd(paginationEnd - 1);
        setPaginationStart(paginationStart - 1);
      }
    }
  };

  const handleSelectToggle = oEvent => {
    var productId = oEvent.target.value;
    if (oEvent.target.checked) {
      selectedProducts.push(productId);
      setSelectedProducts(selectedProducts);
      return;
    }
    var iIndex = selectedProducts.indexOf(productId);
    selectedProducts.splice(iIndex, 1);
    setSelectedProducts(selectedProducts);
  };

  const handleDelete = () => {
    if (selectedProducts.length === 0) {
      alert("No selected products!");
      return;
    }
    if (window.confirm("Are you sure you want to delete these product(s)?")) {
      startDeleteProducts();
    }
  };

  const startDeleteProducts = () => {
    deleteProducts(selectedProducts[0]);
  };

  const checkDelete = () => {
    selectedProducts.splice(0, 1);
    if (selectedProducts.length !== 0) {
      setTimeout(function() {
        startDeleteProducts();
      }, 100);
    } else {
      alert("Finished Deleted Product(s)!");
      window.location.reload();
    }
  };

  const deleteProducts = iProductNo => {
    deleteProduct(user._id, iProductNo, sToken).then(oData => {
      if (oData.error) {
      } else {
        checkDelete();
      }
    });
  };

  const toggleSelectAll = bChecked => {
    var eProductCheckbox = document.getElementsByName("productCheckbox");
    var aTemp = [];

    for (var iCount = 0; iCount < eProductCheckbox.length; iCount++) {
      eProductCheckbox[iCount].checked = bChecked;
      bChecked && iCount !== 0 && aTemp.push(eProductCheckbox[iCount].value);
    }

    setSelectedProducts(aTemp);
  };

  const resetPagination = () => {
    setPageActive(1);
    setPaginationStart(1);
    setPaginationEnd(10);
    setPaginationCount(0);
    toggleSelectAll(false);
  };

  const showProducts = () => {
    return (
      <Fragment>
        <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <h4>Search and filter</h4>
              <div className="form-group row">
                <label
                  htmlFor="product-name"
                  className="col-sm-2 col-form-label"
                >
                  Product Name
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
                <option disabled defaultValue>
                  Select a Category
                </option>
                {categories &&
                  categories.map((oCategory, iIndex) => (
                    <option key={iIndex} value={oCategory._id}>
                      {oCategory.name}
                    </option>
                  ))}
              </select>
              <select id="category" className="btn btn-light border mr-2">
                <option disabled defaultValue>
                  Filter by stock
                </option>
                <option>In stock</option>
                <option>Out of stock</option>
              </select>
              <button className="btn btn-primary">Filter</button>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="float-left">
                <span>{count}</span> Total
              </div>
              <div className="float-right mb-2">
                <select
                  className="btn btn-primary dropdown-toggle mr-2"
                  onChange={handleShowChange}
                >
                  <option value="5"> Show 5 per page</option>
                  <option value="10"> Show 10 per page</option>
                  <option value="25"> Show 25 per page</option>
                  <option value="50"> Show 50 per page</option>
                </select>
                <button className="btn btn-danger" onClick={handleDelete}>
                  <i className="fa fa-trash" /> Delete
                </button>
              </div>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "3%" }}>
                      <input
                        type="checkbox"
                        name="productCheckbox"
                        onChange={oEvent =>
                          oEvent.target.checked
                            ? toggleSelectAll(true)
                            : toggleSelectAll(false)
                        }
                      />
                    </th>
                    <th scope="col" style={{ width: "10%" }}>
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
                    products.map((oProduct, iIndex) => (
                      <tr key={iIndex}>
                        <th scope="row">
                          <input
                            type="checkbox"
                            value={oProduct._id}
                            name="productCheckbox"
                            onChange={handleSelectToggle}
                          />
                        </th>
                        <td>
                          <img
                            src={`${IMAGE_API}/images/products/${oProduct.image}`}
                            style={{ width: "100%" }}
                          />
                        </td>
                        <td>
                          <Link to={`/admin/products/update/${oProduct._id}`}>
                            {oProduct.product_name}
                          </Link>
                        </td>
                        <td>{oProduct.stock}</td>
                        <td>{oProduct.price}</td>
                        <td>{oProduct.category.name}</td>
                        <td>{oMoment(oProduct.createdAt).format("LLL")}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="text-center" style={{ float: "right" }}>
                <nav aria-label="Page navigation example text-center">
                  <ul className="pagination">
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={handlePrevPagination}
                      >
                        Previous
                      </button>
                    </li>
                    {[...Array(paginationEnd - paginationStart + 1)].map(
                      (e, i) => (
                        <li
                          className={
                            i + paginationStart === pageActive
                              ? "page-item active"
                              : "page-item"
                          }
                          key={i}
                        >
                          <a className="page-link">{i + paginationStart}</a>
                        </li>
                      )
                    )}
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={handleNextPagination}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };
  return (
    <DashboardLayout name="Product Management" detail="All Products">
      {showProducts()}
    </DashboardLayout>
  );
};

export default Products;
