import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";
import { getAllProducts, getProductCount } from "./productsApi";
import { getAllCategories } from "../categories/categoriesApi";
import oMoment from "moment";
import { IMAGE_API } from "../../../config";
import { shallowEqual } from "@babel/types";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [count, setCount] = useState(0);
  const [paginationCount, setPaginationCount] = useState(0);
  const [pageActive, setPageActive] = useState(1);

  const loadProducts = (iLimit, iOffset, sOrder, sSortBy) => {
    getAllProducts(iLimit, iOffset, sOrder, sSortBy).then(oProducts => {
      if (oProducts.error) {
        console.log(oProducts.error);
      } else {
        setProducts(oProducts.data);
      }
    });
  };

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
        setCount(oData.data.count);
        setPaginationCount(Math.ceil(oData.data.count / 10));
      }
    });
  };

  const handleShowChange = oEvent => {
    setPaginationCount(Math.ceil(count / oEvent.target.value));
  };

  const handleNextPagination = oEvent => {
    if (paginationCount > pageActive) {
      setPageActive(pageActive + 1);
    }
  };

  const handlePrevPagination = oEvent => {
    if (pageActive > 1) {
      setPageActive(pageActive - 1);
    }
  };

  useEffect(() => {
    // init();
    loadCategories();
    loadProducts(10, 0, "asc", "_id");
    loadProductCount();
  }, []);

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
                  <option value="10"> Show 10 per page</option>
                  <option value="25"> Show 25 per page</option>
                  <option value="50"> Show 50 per page</option>
                </select>
                <button className="btn btn-danger">
                  <i className="fa fa-trash" /> Delete
                </button>
              </div>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "3%" }}>
                      <input type="checkbox" />
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
                          <input type="checkbox" />
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
                    {[...Array(paginationCount)].map((e, i) => (
                      <li
                        className={
                          i + 1 === pageActive
                            ? "page-item active"
                            : "page-item"
                        }
                        key={i}
                      >
                        <a className="page-link">{i + 1}</a>
                      </li>
                    ))}
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
