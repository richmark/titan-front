import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';

const HomePage = () => {
	const showHomePage = () => {
		return (
			<div>
                <div style={{display: 'block'}}>
                <div style={{display: 'block', position: 'fixed', bottom: '70px', right: '20px', zIndex: 1000}}>
                    <div>
                    <span className="dot text-center "><i className="fa fa-commenting middle" style={{fontSize: '24px'}} /></span>
                    </div>
                </div>
                </div>
                <div className="container mt-5">
                <div className="row">
                    <div className="col-sm" />
                    <div className="col-10">
                    <div id="demo" className="carousel slide p-3" data-ride="carousel">
                        {/* Indicators */}
                        <ul className="carousel-indicators">
                        <li data-target="#demo" data-slide-to={0} className="active" />
                        <li data-target="#demo" data-slide-to={1} />
                        <li data-target="#demo" data-slide-to={2} />
                        </ul>
                        {/* The slideshow */}
                        <div className="carousel-inner text-center">
                        <div className="carousel-item active">
                            <img src="../images/wide-image.PNG" alt="Los Angeles" width={800} height={300} />
                        </div>
                        <div className="carousel-item">
                            <img src="../images/wide-image.PNG" alt="Chicago" width={800} height={300} />
                        </div>
                        <div className="carousel-item">
                            <img src="../images/wide-image.PNG" alt="New York" width={800} height={300} />
                        </div>
                        </div>
                        {/* Left and right controls */}
                        <a className="carousel-control-prev" href="#demo" data-slide="prev">
                        <span className="carousel-control-prev-icon" />
                        </a>
                        <a className="carousel-control-next" href="#demo" data-slide="next">
                        <span className="carousel-control-next-icon" />
                        </a>
                    </div>
                    <div id="categories">
                        <p>Categories</p>
                        <div>
                        <div className="row">
                            <div className="col-sm-3 mt-2">
                            <div className="card text-center align-middle">
                                <div className="card-body">
                                <div className="mt-4 mb-4">
                                    <img src="../images/default.PNG" style={{width: '150px', height: '150px'}} />
                                    <p>Category Name</p>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="col-sm-3 mt-2">
                            <div className="card text-center align-middle">
                                <div className="card-body">
                                <div className="mt-4 mb-4">
                                    <img src="../images/default.PNG" style={{width: '150px', height: '150px'}} />
                                    <p>Category Name</p>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="col-sm-3 mt-2">
                            <div className="card text-center align-middle">
                                <div className="card-body">
                                <div className="mt-4 mb-4">
                                    <img src="../images/default.PNG" style={{width: '150px', height: '150px'}} />
                                    <p>Category Name</p>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="col-sm-3 mt-2">
                            <div className="card text-center align-middle">
                                <div className="card-body">
                                <div className="mt-4 mb-4">
                                    <img src="../images/default.PNG" style={{width: '150px', height: '150px'}} />
                                    <p>Category Name</p>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="col-sm-3 mt-2">
                            <div className="card text-center align-middle">
                                <div className="card-body">
                                <div className="mt-4 mb-4">
                                    <img src="../images/default.PNG" style={{width: '150px', height: '150px'}} />
                                    <p>Category Name</p>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="col-sm-3 mt-2">
                            <div className="card text-center align-middle">
                                <div className="card-body">
                                <div className="mt-4 mb-4">
                                    <img src="../images/default.PNG" style={{width: '150px', height: '150px'}} />
                                    <p>Category Name</p>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="col-sm-3 mt-2">
                            <div className="card text-center align-middle">
                                <div className="card-body">
                                <div className="mt-4 mb-4">
                                    <img src="../images/default.PNG" style={{width: '150px', height: '150px'}} />
                                    <p>Category Name</p>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="col-sm-3 mt-2">
                            <div className="card text-center align-middle">
                                <div className="card-body">
                                <div className="mt-4 mb-4">
                                    <img src="../images/default.PNG" style={{width: '150px', height: '150px'}} />
                                    <p>Category Name</p>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        {/* <img src="../images/default.PNG" alt=""> */}
                        </div>
                    </div>
                    <div id="products" className=" mt-5">
                        <p>Our Products</p>
                        <div className="row mt-2">
                        <div className="col-sm-2">
                            <div className="card mb-2">
                            <img className="card-img-top" src="../images/default.PNG" alt="Card image cap" />
                            <div className="card-body pt-1 pb-2">
                                <p id="product_name" className="card-title mb-0" style={{fontSize: '14px'}}>Product</p>
                                <p id="product_price" className="card-title" style={{fontSize: '14px'}}>P 5,000</p>
                                <button href="#" className="btn btn-primary" style={{fontSize: '12px'}}>Add to cart</button>
                            </div>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <div className="card mb-2">
                            <img className="card-img-top" src="../images/default.PNG" alt="Card image cap" />
                            <div className="card-body pt-1 pb-2">
                                <p id="product_name" className="card-title mb-0" style={{fontSize: '14px'}}>Product</p>
                                <p id="product_price" className="card-title" style={{fontSize: '14px'}}>P 5,000</p>
                                <button href="#" className="btn btn-primary" style={{fontSize: '12px'}}>Add to cart</button>
                            </div>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <div className="card mb-2">
                            <img className="card-img-top" src="../images/default.PNG" alt="Card image cap" />
                            <div className="card-body pt-1 pb-2">
                                <p id="product_name" className="card-title mb-0" style={{fontSize: '14px'}}>Product</p>
                                <p id="product_price" className="card-title" style={{fontSize: '14px'}}>P 5,000</p>
                                <button href="#" className="btn btn-primary" style={{fontSize: '12px'}}>Add to cart</button>
                            </div>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <div className="card mb-2">
                            <img className="card-img-top" src="../images/default.PNG" alt="Card image cap" />
                            <div className="card-body pt-1 pb-2">
                                <p id="product_name" className="card-title mb-0" style={{fontSize: '14px'}}>Product</p>
                                <p id="product_price" className="card-title" style={{fontSize: '14px'}}>P 5,000</p>
                                <button href="#" className="btn btn-primary" style={{fontSize: '12px'}}>Add to cart</button>
                            </div>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <div className="card mb-2">
                            <img className="card-img-top" src="../images/default.PNG" alt="Card image cap" />
                            <div className="card-body pt-1 pb-2">
                                <p id="product_name" className="card-title mb-0" style={{fontSize: '14px'}}>Product</p>
                                <p id="product_price" className="card-title" style={{fontSize: '14px'}}>P 5,000</p>
                                <button href="#" className="btn btn-primary" style={{fontSize: '12px'}}>Add to cart</button>
                            </div>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <div className="card mb-2">
                            <img className="card-img-top" src="../images/default.PNG" alt="Card image cap" />
                            <div className="card-body pt-1 pb-2">
                                <p id="product_name" className="card-title mb-0" style={{fontSize: '14px'}}>Product</p>
                                <p id="product_price" className="card-title" style={{fontSize: '14px'}}>P 5,000</p>
                                <button href="#" className="btn btn-primary" style={{fontSize: '12px'}}>Add to cart</button>
                            </div>
                            </div>
                        </div>
                        {/*  */}
                        <div className="col-sm-2">
                            <div className="card mb-2">
                            <img className="card-img-top" src="../images/default.PNG" alt="Card image cap" />
                            <div className="card-body pt-1 pb-2">
                                <p id="product_name" className="card-title mb-0" style={{fontSize: '14px'}}>Product</p>
                                <p id="product_price" className="card-title" style={{fontSize: '14px'}}>P 5,000</p>
                                <button href="#" className="btn btn-primary" style={{fontSize: '12px'}}>Add to cart</button>
                            </div>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <div className="card mb-2">
                            <img className="card-img-top" src="../images/default.PNG" alt="Card image cap" />
                            <div className="card-body pt-1 pb-2">
                                <p id="product_name" className="card-title mb-0" style={{fontSize: '14px'}}>Product</p>
                                <p id="product_price" className="card-title" style={{fontSize: '14px'}}>P 5,000</p>
                                <button href="#" className="btn btn-primary" style={{fontSize: '12px'}}>Add to cart</button>
                            </div>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <div className="card mb-2">
                            <img className="card-img-top" src="../images/default.PNG" alt="Card image cap" />
                            <div className="card-body pt-1 pb-2">
                                <p id="product_name" className="card-title mb-0" style={{fontSize: '14px'}}>Product</p>
                                <p id="product_price" className="card-title" style={{fontSize: '14px'}}>P 5,000</p>
                                <button href="#" className="btn btn-primary" style={{fontSize: '12px'}}>Add to cart</button>
                            </div>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <div className="card mb-2">
                            <img className="card-img-top" src="../images/default.PNG" alt="Card image cap" />
                            <div className="card-body pt-1 pb-2">
                                <p id="product_name" className="card-title mb-0" style={{fontSize: '14px'}}>Product</p>
                                <p id="product_price" className="card-title" style={{fontSize: '14px'}}>P 5,000</p>
                                <button href="#" className="btn btn-primary" style={{fontSize: '12px'}}>Add to cart</button>
                            </div>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <div className="card mb-2">
                            <img className="card-img-top" src="../images/default.PNG" alt="Card image cap" />
                            <div className="card-body pt-1 pb-2">
                                <p id="product_name" className="card-title mb-0" style={{fontSize: '14px'}}>Product</p>
                                <p id="product_price" className="card-title" style={{fontSize: '14px'}}>P 5,000</p>
                                <button href="#" className="btn btn-primary" style={{fontSize: '12px'}}>Add to cart</button>
                            </div>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <div className="card mb-2">
                            <img className="card-img-top" src="../images/default.PNG" alt="Card image cap" />
                            <div className="card-body pt-1 pb-2">
                                <p id="product_name" className="card-title mb-0" style={{fontSize: '14px'}}>Product</p>
                                <p id="product_price" className="card-title" style={{fontSize: '14px'}}>P 5,000</p>
                                <button href="#" className="btn btn-primary" style={{fontSize: '12px'}}>Add to cart</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="text-center mt-5">
                        <button type="submit" className="btn btn-primary">Load more</button>
                    </div>
                    </div>
                    <div className="col-sm" />
                </div>
                </div>
            </div>
		);
	};
	return <Layout>{showHomePage()}</Layout>;
};

export default HomePage;
