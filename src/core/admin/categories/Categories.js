import React, { Fragment, useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { getAllCategories, createCategory, deleteCategory } from "./categoriesApi";
import { isAuthenticated } from "../../../auth/authUtil";
import { IMAGE_API } from "../../../config";
import { Link } from "react-router-dom";
import oMoment from "moment";
import DataTable from "react-data-table-component";
import _ from "lodash";

const Categories = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { sToken, user } = isAuthenticated();
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState({
    name: "",
    category_image: "",
    formData: ""
  });
  const [result, setResult] = useState(false);
  const init = () => {
    getAllCategories().then(oData => {
      if (oData.error) {
        console.log(oData.error);
      } else {
        setCategories(oData.data);
        setValues({ ...values, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    init();
  }, [result]);

  const { formData, name, category_image } = values;

  const handleSelectToggle = ({ allSelected, selectedCount, selectedRows }) => {
    setSelectedCategories(JSON.parse(JSON.stringify(selectedRows)));
  };

  const submitCategory = oEvent => {
    oEvent.preventDefault();
    createCategory(user._id, sToken, formData).then(oData => {
      if (oData.error) {
        console.log(oData);
      } else {
        setValues({
          name: "",
          category_image: "",
          formData: new FormData()
        });
        setResult(!result);
        alert('Created Successfully');
      }
    });
  };

  const handleChange = name => oEvent => {
    if (name !== "category_image") {
      const value = oEvent.target.value;
      formData.set(name, value);
      setValues({ ...values, [name]: value });
      return;
    }
    let oFile = oEvent.target.files[0];
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

  const submitDelete = () => {
    if (window.confirm("Are you sure you want to delete?") === true) {
      const aCategoryIds = _.map(selectedCategories, "_id");
      deleteCategory(user._id, sToken, aCategoryIds).then(oData => {
        if (oData.error) {
          console.log(oData);
        } else {
          alert("Deleted Successfully");
          setResult(!result);
        }
      });
    }
  };

  const showCategories = () => {
    const oData = categories;
    const oColumns = [
      {
        name: "Image",
        selector: "category_image",
        sortable: true,
        cell: oRow => {
          return (
            <Fragment>
              <img
                src={`${IMAGE_API}/images/categories/${oRow.category_image}`}
                style={{ width: "40%" }}
              />
            </Fragment>
          );
        }
      },
      {
        name: "Name",
        selector: "name",
        sortable: true,
        cell: oRow => {
          return (
            <Link to={`/admin/categories/update/${oRow._id}`}>
              {oRow.name}
            </Link>
          )
        }
      },
      {
        name: "Date Created",
        selector: "createdAt",
        sortable: true,
        format: oRow => oMoment(oRow.createdAt).format("DD-MM-YYYY")
      }
    ];

    return (
      <Fragment>
        <div className="col-md-6 col-sm-6 col-xl-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-4">
                  <p>Category name: </p>
                  <p>Thumbnail: </p>
                  <button onClick={submitCategory} className="btn btn-primary">
                    Save
                  </button>
                </div>
                <div className="col-sm-8">
                  <input
                    value={name}
                    onChange={handleChange("name")}
                    type="text"
                    className="form-control bg-light small mb-2"
                    placeholder="Category Name"
                  />
                  <input
                    onChange={handleChange("category_image")}
                    type="file"
                    className="form-control-file"
                    id="exampleFormControlFile1"
                  />
                  <div style={{ width: "150px" }} className="mt-2">
                    <img
                      src={
                        category_image ||
                        "https://ctt.trains.com/sitefiles/images/no-preview-available.png"
                      }
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-6 col-xl-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              {/* <div className="float-left"><span>10</span> Items</div> */}
              <div className="float-right mb-2">
                <button onClick={submitDelete} className="btn btn-danger">
                  <i className="fa fa-trash" /> Delete
                </button>
              </div>
              <style>{`.bfOOvg { height: auto !important }`}</style>
              <DataTable
                columns={oColumns}
                data={oData}
                pagination={true}
                striped
                selectableRows
                keyField="_id"
                onSelectedRowsChange={handleSelectToggle}
                selectableRowsNoSelectAll={true}
              />
              {/* <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col" style={{width: '3%'}}><input type="checkbox" /></th>
                      <th scope="col" style={{width: '10%'}}>Image</th>
                      <th scope="col">Name</th>
                      <th scope="col">Date Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories && categories.map((oCategory, iIndex) => (
                      <tr key={iIndex}>
                        <th scope="row"><input type="checkbox" /></th>
                        <td><img src={`${IMAGE_API}/images/categories/${oCategory.category_image}`} style={{width: '100%'}} /></td>
                        <td>
                          <Link to={`/admin/categories/update/${oCategory._id}`}>
                            {oCategory.name}
                          </Link>
                        </td>
                        <td>{oCategory.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className=" text-center">
                  <nav aria-label="Page navigation example text-center">
                    <ul className="pagination">
                      <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                      <li className="page-item"><a className="page-link" href="#">1</a></li>
                      <li className="page-item"><a className="page-link" href="#">2</a></li>
                      <li className="page-item"><a className="page-link" href="#">3</a></li>
                      <li className="page-item"><a className="page-link" href="#">Next</a></li>
                    </ul>
                  </nav>
                </div> */}
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <DashboardLayout name="Product Management" detail="Categories">
      {showCategories()}
    </DashboardLayout>
  );
};

export default Categories;
