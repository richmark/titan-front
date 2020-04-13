import React, { useEffect, useState, Fragment } from "react";
import DashboardLayout from "../DashboardLayout";
import { getAllLevels, updateLevel } from "./levelsApi";
import { isAuthenticated } from "../../../auth/authUtil";

const ManageLevel = () => {
  const { sToken, user } = isAuthenticated();
  const [levels, setLevels] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [values, setValues] = useState({
    price_threshhold: "",
    percent_discount: ""
  });

  useEffect(() => {
    loadLevels();
  }, []);

  const loadLevels = () => {
    getAllLevels().then(oLevels => {
      if (oLevels.error) {
        console.log(oLevels.error);
      } else {
        setLevels(oLevels.data);
      }
    });
  };

  const handleSelectedCategoryChange = oEvent => {
    oEvent.preventDefault();
    var iValue = oEvent.target.value;
    setSelectedCategory(iValue);
  };

  const handleSaveLevelClick = oEvent => {
    oEvent.preventDefault();
    if (validateValues()) {
      updateLevel(user._id, sToken, selectedCategory, values).then(oData => {
        if (oData.error) {
          alert("Something went wrong. Please try again");
        } else {
          alert("Level updated successfully");
          loadLevels();
        }
      });
    }
  };

  const validateValues = () => {
    if (selectedCategory === 0) {
      alert("Please select category.");
      return false;
    }

    if (!values["price_threshhold"]) {
      alert("Price is required");
      return false;
    }

    if (!values["percent_discount"]) {
      alert("Discount is required");
      return false;
    }

    return true;
  };

  const handleChange = sName => oEvent => {
    const value = oEvent.target.value;
    setValues({ ...values, [sName]: value });
  };

  const showManageLevel = () => {
    return (
      <Fragment>
        <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <h4 className="ml-2">Manage Level</h4>
              <div className="form-group row p-4 mb-0">
                <select
                  id="category"
                  className="col-sm btn btn-light border mr-2"
                  onChange={handleSelectedCategoryChange}
                >
                  <option value="0">Select Level</option>
                  {levels &&
                    levels.map((oLevel, iIndex) => (
                      <option key={iIndex} value={oLevel._id}>
                        {oLevel.level}
                      </option>
                    ))}
                </select>
                <div className="col-sm">
                  <input
                    type="number"
                    className="form-control bg-light small"
                    placeholder="Price"
                    aria-label="Price"
                    aria-describedby="basic-addon2"
                    onChange={handleChange("price_threshhold")}
                  />
                </div>
                <div className="col-sm">
                  <input
                    type="number"
                    className="form-control bg-light small"
                    placeholder="Discount by Percentage"
                    aria-label="Discount by Percentage"
                    aria-describedby="basic-addon2"
                    onChange={handleChange("percent_discount")}
                  />
                </div>
              </div>
              <div className="text-center">
                <button
                  className="btn btn-primary"
                  onClick={handleSaveLevelClick}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
          <div className="card border-left-primary shadow h-100 py-2 p-3">
            <div className="card-body">
              <table className="table text-center">
                <thead>
                  <tr>
                    <th scope="col">Level</th>
                    <th scope="col">Price Threshold</th>
                    <th scope="col">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {levels &&
                    levels.map((oLevels, iIndex) => (
                      <tr key={iIndex}>
                        <th>{oLevels.level}</th>
                        <td>{oLevels.price_threshhold}</td>
                        <td>{oLevels.percent_discount}%</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };
  return (
    <DashboardLayout name="Level Management" detail="Manage Level">
      {showManageLevel()}
    </DashboardLayout>
  );
};

export default ManageLevel;
