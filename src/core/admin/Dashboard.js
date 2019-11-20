import React from 'react';

const Dashboard = () => {
  return (
    <div>
      {/* Page Wrapper */}
      <div id="wrapper">
        {/* Sidebar */}
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
          {/* Sidebar - Brand */}
          <a className="sidebar-brand d-flex align-items-center justify-content-center">
            <div className="sidebar-brand-text mx-3">TITAL SUPER TOOLS</div>
          </a>
          {/* Divider */}
          <hr className="sidebar-divider my-0" />
          {/* Nav Item - Dashboard */}
          <li className="nav-item active">
            <a className="nav-link">
              <i className="fas fa-fw fa-tachometer-alt" />
              <span>Dashboard</span></a>
          </li>
          {/* Divider */}
          <hr className="sidebar-divider" />
          {/* Nav Item - Pages Collapse Menu */}
          <li className="nav-item">
            <a className="nav-link collapsed"  data-toggle="collapse" data-target="#prodMgmt" aria-expanded="true" aria-controls="collapseTwo">
              <span>Product Management</span>
            </a>
            <div id="prodMgmt" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <a className="collapse-item" >Add Products</a>
                <a className="collapse-item" >All Products</a>
                <a className="collapse-item" >Categories</a>
              </div>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed"  data-toggle="collapse" data-target="#bundleMgmt" aria-expanded="true" aria-controls="collapseTwo">
              <span>Bundle Deals Management</span>
            </a>
            <div id="bundleMgmt" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <a className="collapse-item" >All bundles</a>
                <a className="collapse-item" >Make bundle</a>
              </div>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed"  data-toggle="collapse" data-target="#shipperMgmt" aria-expanded="true" aria-controls="collapseTwo">
              <span>Shipper Management</span>
            </a>
            <div id="shipperMgmt" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <a className="collapse-item" >All Shipper</a>
              </div>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed"  data-toggle="collapse" data-target="#orderMgmt" aria-expanded="true" aria-controls="collapseTwo">
              <span>Order Management</span>
            </a>
            <div id="orderMgmt" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <a className="collapse-item" >All Order</a>
                <a className="collapse-item" >Process Order</a>
              </div>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed"  data-toggle="collapse" data-target="#couponMgmt" aria-expanded="true" aria-controls="collapseTwo">
              <span>Coupon Management</span>
            </a>
            <div id="couponMgmt" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <a className="collapse-item" >All Products</a>
                <a className="collapse-item" >Add Coupons</a>
              </div>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed"  data-toggle="collapse" data-target="#wholesaleApp" aria-expanded="true" aria-controls="collapseTwo">
              <span>Wholsale User Applications</span>
            </a>
            <div id="wholesaleApp" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <a className="collapse-item" >All Wholesale User</a>
                <a className="collapse-item" >Process User</a>
              </div>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed"  data-toggle="collapse" data-target="#reviewMgmt" aria-expanded="true" aria-controls="collapseTwo">
              <span>Review Management</span>
            </a>
            <div id="reviewMgmt" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <a className="collapse-item" >All Products</a>
              </div>
            </div>
          </li>
          {/* Divider */}
          <hr className="sidebar-divider d-none d-md-block" />
          {/* Sidebar Toggler (Sidebar) */}
          <div className="text-center d-none d-md-inline">
            <button className="rounded-circle border-0" id="sidebarToggle" />
          </div>
        </ul>
        {/* End of Sidebar */}
        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
            {/* Topbar */}
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              {/* Sidebar Toggle (Topbar) */}
              <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars" />
              </button>
              {/* Topbar Navbar */}
              <ul className="navbar-nav ml-auto">
                {/* <div class="topbar-divider d-none d-sm-block"></div> */}
                {/* Nav Item - User Information */}
                <li className="nav-item dropdown no-arrow">
                  <a className="nav-link dropdown-toggle"  id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">Valerie Luna</span>
                    <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
                  </a>
                  {/* Dropdown - User Information */}
                  <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                    <a className="dropdown-item" >
                      <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                      Profile
                    </a>
                    <a className="dropdown-item" >
                      <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                      Settings
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item"  data-toggle="modal" data-target="#logoutModal">
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                      Logout
                    </a>
                  </div>
                </li>
              </ul>
            </nav>
            {/* End of Topbar */}
            {/* Begin Page Content */}
            <div className="container-fluid">
              <div className="breadcrumb">
                <div className="breadcrumb-item"><a >Product Management</a></div>
                <div className="breadcrumb-item">All Products</div>
              </div>
              <div className="row">
                <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
                  <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                      <h4>Search and filter</h4>
                      <div className="form-group row">
                        <label htmlFor="product-name" className="col-sm-2 col-form-label">Product Name</label>
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
                      <select id="category" className="btn btn-light border mr-2">
                        <option value="null" disabled selected>Select a Category</option>
                      </select>
                      <select id="category" className="btn btn-light border mr-2">
                        <option value="null" disabled selected>Filter by stock</option>
                        <option value="null">In stock</option>
                        <option value="null">Out of stock</option>
                      </select>
                      <button className="btn btn-primary">Filter</button>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-sm-12 col-xl-12 mb-4">
                  <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                      <div className="float-left"><span>10</span> Items</div>
                      <div className="float-right mb-2">
                        <button className="btn btn-danger"><i className="fa fa-trash" /> Delete</button>
                      </div>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th scope="col" style={{width: '3%'}}><input type="checkbox" /></th>
                            <th scope="col" style={{width: '10%'}}>Thumbnail</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Price</th>
                            <th scope="col">Category</th>
                            <th scope="col">Date Created</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row"><input type="checkbox" /></th>
                            <td><img src="./img/default.PNG" style={{width: '100%'}} /></td>
                            <td>Otto</td>
                            <td>12</td>
                            <td>1000</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                          </tr>
                          <tr>
                            <th scope="row"><input type="checkbox" /></th>
                            <td><img src="./img/default.PNG" style={{width: '100%'}} /></td>
                            <td>Thornton</td>
                            <td>12</td>
                            <td>1000</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                          </tr>
                          <tr>
                            <th scope="row"><input type="checkbox" /></th>
                            <td><img src="./img/default.PNG" style={{width: '100%'}} /></td>
                            <td>Name</td>
                            <td>12</td>
                            <td>1000</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className=" text-center">
                        <nav aria-label="Page navigation example text-center">
                          <ul className="pagination">
                            <li className="page-item"><a className="page-link" >Previous</a></li>
                            <li className="page-item"><a className="page-link" >1</a></li>
                            <li className="page-item"><a className="page-link" >2</a></li>
                            <li className="page-item"><a className="page-link" >3</a></li>
                            <li className="page-item"><a className="page-link" >Next</a></li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </div>
          {/* End of Main Content */}
          {/* Footer */}
          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright © Your Website 2019</span>
              </div>
            </div>
          </footer>
          {/* End of Footer */}
        </div>
        {/* End of Content Wrapper */}
      </div>
      {/* End of Page Wrapper */}
      {/* Scroll to Top Button*/}
      <a className="scroll-to-top rounded">
        <i className="fas fa-angle-up" />
      </a>
      {/* Logout Modal*/}
      <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
              <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
            <div className="modal-footer">
              <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
              <a className="btn btn-primary">Logout</a>
            </div>
          </div>
        </div>
      </div>
      {/* Bootstrap core JavaScript*/}
      {/* Core plugin JavaScript*/}
      {/* Custom scripts for all pages*/}
      {/* Page level plugins */}
      {/* Page level custom scripts */}
    </div>
  );
}

export default Dashboard;