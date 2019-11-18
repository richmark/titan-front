import React from 'react';

const Layout = ({ children }) => (
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
		{children}
		<footer className='text-center mt-5'>
			Titan Super Tools 2020 - titansupertools.com
		</footer>
	</div>
);

export default Layout;
