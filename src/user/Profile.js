import React, { useState, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/authUtil';

const Profile = () => {
    const { user } = isAuthenticated();
    const showProfile = () => {
        return (
            <Fragment>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-sm" />
                        <div className="col-sm-10 border p-5">
                        <h3>Manage My Account (Personal)</h3>
                        <div className="container border p-3">
                            <p>Personal Profile</p>
                            <div className="row">
                            <div className="col-sm-5">
                                <div className="form-group row">
                                <label htmlFor="email" className="col-sm-4 col-form-label">Email: </label>
                                <div className="col-sm">
                                    <input type="text" readOnly className="form-control-plaintext" id="staticEmail" defaultValue={user.email} />
                                </div>
                                </div>
                                <div className="form-group row">
                                <label htmlFor="first-name" className="col-sm-4 col-form-label">First Name: </label>
                                <div className="col-sm">
                                    <input type="text" readOnly className="form-control-plaintext" id="first-name" defaultValue={user.first_name} />
                                </div>
                                </div>
                                <div className="form-group row">
                                <label htmlFor="last-name" className="col-sm-4 col-form-label">Last Name: </label>
                                <div className="col-sm">
                                    <input type="text" readOnly className="form-control-plaintext" id="last-name" defaultValue={user.last_name} />
                                </div>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="form-group row">
                                <label htmlFor="last-name" className="col-sm-4 col-form-label">Mobile No: </label>
                                <div className="col-sm">
                                    <input type="text" readOnly className="form-control-plaintext" id="last-name" defaultValue={user.mobile_number} />
                                </div>
                                </div>
                                <div className="form-group row">
                                <label htmlFor="last-name" className="col-sm-4 col-form-label">Address: </label>
                                <div className="col-sm">
                                    <input type="text" readOnly className="form-control-plaintext" id="last-name" defaultValue={user.address} />
                                </div>
                                </div>
                                <div id="modify-element" className="float-right">
                                <button type="submit" className="btn btn-primary">EDIT</button>
                                <button type="submit" className="btn btn-primary">CHANGE PASSWORD</button>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="container border p-3 mt-4">
                            <p>My Order</p>
                            <table className="table text-center">
                            <thead>
                                <tr>
                                <th scope="col">Order No</th>
                                <th scope="col">Date</th>
                                <th scope="col">Price</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>34634634644000</td>
                                <td>08/12/19</td>
                                <td>600</td>
                                <td><a href>Manage</a></td>
                                </tr>
                                <tr>
                                <td>34634634644000</td>
                                <td>08/12/19</td>
                                <td>600</td>
                                <td><a href>Manage</a></td>
                                </tr>
                                <tr>
                                <td>34634634644000</td>
                                <td>08/12/19</td>
                                <td>600</td>
                                <td><a href>Manage</a></td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        </div>
                        <div className="col-sm" />
                    </div>
                </div>
            </Fragment>
        )
    };
    return (
        <Layout title='Login' description='Login here'>
            {showProfile()}
        </Layout>
    );
}

export default Profile
