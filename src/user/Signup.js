import React from 'react';
import Layout from '../core/Layout';

const Signup = () => {
	const showFooter = () => {
		return (
			<div className='navbar navbar-light bg-light'>
				<a className='navbar-brand'>Titan Supertools</a>
			</div>
		);
	};
	const showForm = () => {
		return (
			<div>
				<nav className='navbar navbar-light bg-light'>
					<a className='navbar-brand'>Titan Supertools</a>
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
				<h1 className='text-center'>TITAN SUPERTOOLS</h1>
				<div className='container mt-5 text-center'>
					<div className='row'>
						<div className='col-sm border-right'>
							<button
								type='button'
								className='btn btn-success mb-5'
							>
								Personal
							</button>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation
								ullamco laboris nisi ut aliquip ex ea commodo
								consequat. Duis aute irure dolor in
								reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint
								occaecat cupidatat non proident, sunt in culpa
								qui officia deserunt mollit anim id est laborum.
							</p>
						</div>
						<div className='col-sm border-right'>
							<button
								type='button'
								className='btn btn-success mb-5'
							>
								Corporate
							</button>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation
								ullamco laboris nisi ut aliquip ex ea commodo
								consequat. Duis aute irure dolor in
								reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint
								occaecat cupidatat non proident, sunt in culpa
								qui officia deserunt mollit anim id est laborum.
							</p>
						</div>
						<div className='col-sm'>
							<button
								type='button'
								className='btn btn-success mb-5'
							>
								Whole Sale
							</button>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation
								ullamco laboris nisi ut aliquip ex ea commodo
								consequat. Duis aute irure dolor in
								reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint
								occaecat cupidatat non proident, sunt in culpa
								qui officia deserunt mollit anim id est laborum.
							</p>
						</div>
					</div>
				</div>
				<footer className='text-center mt-5'>
					Titan Super Tools 2020 - titansupertools.com
				</footer>
			</div>
		);
	};

	return (
		<Layout title='Signup' description='Sign up here'>
			{showForm()}
			{showFooter()}
		</Layout>
	);
};

export default Signup;
