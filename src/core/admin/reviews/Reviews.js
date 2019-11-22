import React, { Fragment } from 'react';
import DashboardLayout from '../DashboardLayout';

const Reviews = () => {
    const showReviews = () => {
        return (
            <Fragment>
                <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="form-group row">
                        <label htmlFor="product-name" className="col-sm-2 col-form-label">User name</label>
                        <div className="col-sm-5">
                            <div className="input-group">
                            <input type="text" className="form-control bg-light border-0 small" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button">
                                <i className="fas fa-search fa-sm" />
                                </button>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-sm-12 col-md-12 col-xl-12 mb-4">
                            <div className="text-right mt-3 w-25 float-right">
                            08/12/2019 3:00PM
                            </div>
                            <div className="text-left mt-3">
                            John Doe
                            </div>
                            <div className="border rounded p-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </div>
                            <div id="rating" className="text-right mt-3 w-25 float-right">
                            <span className="fa fa-star checked" />
                            <span className="fa fa-star checked" />
                            <span className="fa fa-star checked" />
                            <span className="fa fa-star" />
                            <span className="fa fa-star" />
                            </div>
                            <div id="rating" className="text-left mt-3">
                            <input type="checkbox"/>Hide
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-xl-12 mb-4">
                            <div className="text-right mt-3 w-25 float-right">
                            08/12/2019 3:00PM
                            </div>
                            <div className="text-left mt-3">
                            John Doe
                            </div>
                            <div className="border rounded p-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </div>
                            <div id="rating" className="text-right mt-3 w-25 float-right">
                            <span className="fa fa-star checked" />
                            <span className="fa fa-star checked" />
                            <span className="fa fa-star checked" />
                            <span className="fa fa-star" />
                            <span className="fa fa-star" />
                            </div>
                            <div id="rating" className="text-left mt-3">
                            <input type="checkbox" name id />Hide
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-xl-12 mb-4">
                            <div className="text-right mt-3 w-25 float-right">
                            08/12/2019 3:00PM
                            </div>
                            <div className="text-left mt-3">
                            John Doe
                            </div>
                            <div className="border rounded p-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </div>
                            <div id="rating" className="text-right mt-3 w-25 float-right">
                            <span className="fa fa-star checked" />
                            <span className="fa fa-star checked" />
                            <span className="fa fa-star checked" />
                            <span className="fa fa-star" />
                            <span className="fa fa-star" />
                            </div>
                            <div id="rating" className="text-left mt-3">
                            <input type="checkbox" name id />Hide
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-xl-12 mb-4">
                            <div className="text-right mt-3 w-25 float-right">
                            08/12/2019 3:00PM
                            </div>
                            <div className="text-left mt-3">
                            John Doe
                            </div>
                            <div className="border rounded p-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </div>
                            <div id="rating" className="text-right mt-3 w-25 float-right">
                            <span className="fa fa-star checked" />
                            <span className="fa fa-star checked" />
                            <span className="fa fa-star checked" />
                            <span className="fa fa-star" />
                            <span className="fa fa-star" />
                            </div>
                            <div id="rating" className="text-left mt-3">
                            <input type="checkbox" name id />Hide
                            </div>
                        </div>
                        </div>
                        <div className=" text-center">
                        <nav aria-label="Page navigation example text-center">
                            <ul className="pagination">
                            <li className="page-item"><a className="page-link">Previous</a></li>
                            <li className="page-item"><a className="page-link">1</a></li>
                            <li className="page-item"><a className="page-link">2</a></li>
                            <li className="page-item"><a className="page-link">3</a></li>
                            <li className="page-item"><a className="page-link">Next</a></li>
                            </ul>
                        </nav>
                        </div>
                    </div>
                    </div>
                </div>
            </Fragment>
        )
    };
    return (
        <DashboardLayout name='Review Management' detail='All Reviews'>
            {showReviews()}
        </DashboardLayout>
    );
}

export default Reviews
