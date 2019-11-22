import React from 'react';

const Layout = ({ children }) => (
    <div>
        <div id='nav'>
            <nav className='navbar navbar-light bg-dark'>
                <a href='' className='float-right'>
                    Login
                </a>
                <a href='' className='float-right'>
                    Register
                </a>
            </nav>
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
            <div className='row'>sdgsdg</div>
        </div>

        <nav className='navbar navbar-light bg-light'>
            <div className='row mt-3'>
                <div className='col-sm-4'>
                    <label className='mt-2 ' htmlFor='exampleInputEmail1'>
                        Titan Supertools
                    </label>
                </div>
                <div className='col-sm-8'>
                    <form className='form-inline'>
                        <input
                            className='form-control mr-sm-2 w-100'
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
            <form className='form-inline'>
                <input
                    className='form-control mr-sm-2'
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
            {/* <a className='navbar-brand'>Titan Supertools</a>
			
			<form className='form-inline'>
				<input
					className='form-control mr-sm-2'
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
			</form> */}
        </nav>
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
