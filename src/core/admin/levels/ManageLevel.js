import React, { useEffect, useState, Fragment } from "react";
import DashboardLayout from "../DashboardLayout";

const ManageLevel = () => {

  const showManageLevel = () => {
    return (
      <Fragment>
        <div className='col-md-12 col-sm-12 col-xl-12 mb-4'>
            <div className='card border-left-primary shadow h-100 py-2'>
                <div className='card-body'>
                    <h4 className="ml-2">Manage Level</h4>
                    <div className='form-group row p-4 mb-0'>
                        <select
                            id='category'
                            className='col-sm btn btn-light border mr-2'
                        >
                            <option disabled defaultValue>
                                Select Level
                            </option>
                            <option>Gold</option>
                            <option>Silver</option>
                            <option>Bronze</option>
                        </select>
                        <div className='col-sm'>
                            <input
                                type='text'
                                className='form-control bg-light small'
                                placeholder='Price'
                                aria-label='Price'
                                aria-describedby='basic-addon2'
                            />
                        </div>
                        <div className='col-sm'>
                            <input
                                type='text'
                                className='form-control bg-light small'
                                placeholder='Discount by Percentage'
                                aria-label='Discount by Percentage'
                                aria-describedby='basic-addon2'
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div className='col-md-12 col-sm-12 col-xl-12 mb-4'>
            <div className='card border-left-primary shadow h-100 py-2 p-3'>
                <div className='card-body'>
                    <table class="table text-center">
                        <thead>
                            <tr>
                                <th scope="col">Level</th>
                                <th scope="col">Price Discount</th>
                                <th scope="col">Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Gold</th>
                                <td>0</td>
                                <td>10%</td>
                            </tr>
                            <tr>
                                <th>Silver</th>
                                <td>0</td>
                                <td>10%</td>
                            </tr>
                            <tr>
                                <th>Bronze</th>
                                <td>0</td>
                                <td>10%</td>
                            </tr>
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
