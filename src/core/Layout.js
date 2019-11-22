import React from 'react';

const Layout = ({ children }) => (
    <div>
		{/* Logged IN */}
        {/* <div id='nav'>
			<ul className="nav bg-secondary">
				<li className="nav-item">
					<a className="nav-link text-white" href="#">Welcome, John Doe</a>
				</li>
				<a className="nav-link text-white float-right text-right" href="#">My Profile</a>
			</ul>
            <div className='row p-3'>
                <div className='col-sm-1'>
                    <label className='mt-2 ' htmlFor='exampleInputEmail1'>
                        Titan Supertools
                    </label>
                </div>
                <div className='col-sm-8'>
                    <form className='form-inline'>
                        <input
                            className='form-control mr-sm-2 w-75'
                            type='search'
                            placeholder='Search'
                            aria-label='Search'
                        />
                        <button
                            className='btn btn-outline-success my-2 my-sm-0'
                            type='submit'
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>
			<ul className="nav bg-secondary">
				<li className="nav-item">
					<a className="nav-link text-white" href="#">Categories</a>
				</li>
				<li className="nav-item">
					<a className="nav-link text-white" href="#">Home</a>
				</li>
				<li className="nav-item">
					<a className="nav-link text-white" href="#">Shop</a>
				</li>
				<li className="nav-item">
					<a className="nav-link text-white" href="#">My Cart</a>
				</li>
				<li className="nav-item">
					<a className="nav-link text-white" href="#">Orders</a>
				</li>
			</ul>
        </div> */}
		{/* Not Logged IN */}
		<div id='nav'>
			<ul className="nav justify-content-end bg-secondary">
				<li className="nav-item">
					<a className="nav-link text-white" href="#">Login</a>
				</li>
				<li className="nav-item">
					<a className="nav-link text-white" href="#">Register</a>
				</li>
			</ul>
            <div className='row p-3'>
                <div className='col-sm-1'>
                    <label className='mt-2 ' htmlFor='exampleInputEmail1'>
                        Titan Supertools
                    </label>
                </div>
                <div className='col-sm-8'>
                    <form className='form-inline'>
                        <input
                            className='form-control mr-sm-2 w-75'
                            type='search'
                            placeholder='Search'
                            aria-label='Search'
                        />
                        <button
                            className='btn btn-outline-success my-2 my-sm-0'
                            type='submit'
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>
			<ul className="nav bg-secondary">
				<li className="nav-item">
					<a className="nav-link text-white" href="#">Categories</a>
				</li>
				<li className="nav-item">
					<a className="nav-link text-white" href="#">Home</a>
				</li>
				<li className="nav-item">
					<a className="nav-link text-white" href="#">Shop</a>
				</li>
				<li className="nav-item">
					<a className="nav-link text-white" href="#">My Cart</a>
				</li>
				<li className="nav-item">
					<a className="nav-link text-white" href="#">Orders</a>
				</li>
			</ul>
        </div>
        <div style={{ display: 'block' }}>
            <div
                style={{
                    display: 'block',
                    position: 'fixed',
                    bottom: '70px',
                    right: '20px',
                    zIndex: 1000
                }}
            >
                <div>
                    <span className='dot text-center '>
                        <i
                            className='fa fa-commenting middle'
                            style={{ fontSize: '24px' }}
                        />
                    </span>
                </div>
            </div>
        </div>
        <h1 className='text-center mt-5'>TITAN SUPERTOOLS</h1>
        <div style={{ minHeight: '60vh' }}>{children}</div>
        <footer className='text-center mt-5 mb-5'>
            Titan Super Tools 2020 - titansupertools.com
        </footer>
    </div>
);

export default Layout;
