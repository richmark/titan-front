import React, { Fragment } from 'react';
import { APP_URL } from '../../config';


const Navbar = () => {
    const showNavbar = () => {
        return (
            <nav className='navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow'>
                {/* Sidebar Toggle (Topbar) */}
                <button
                    id='sidebarToggleTop'
                    className='btn btn-link d-md-none rounded-circle mr-3'
                >
                    <i className='fa fa-bars' />
                </button>
                {/* Topbar Navbar */}
                <ul className='navbar-nav ml-auto'>
                    {/* <div class="topbar-divider d-none d-sm-block"></div> */}
                    {/* Nav Item - User Information */}
                    <li className='nav-item dropdown no-arrow'>
                        <a
                            className='nav-link dropdown-toggle'
                            href='#'
                            id='userDropdown'
                            role='button'
                            data-toggle='dropdown'
                            aria-haspopup='true'
                            aria-expanded='false'
                        >
                            <span className='mr-2 d-none d-lg-inline text-gray-600 small'>
                                Valerie Luna
                            </span>
                            <img
                                className='img-profile rounded-circle'
                                src='https://source.unsplash.com/QAB-WJcbgJk/60x60'
                            />
                        </a>
                        {/* Dropdown - User Information */}
                        <div
                            className='dropdown-menu dropdown-menu-right shadow animated--grow-in'
                            aria-labelledby='userDropdown'
                        >
                            <a className='dropdown-item' href='signout'>
                                <i className='fas fa-user fa-sm fa-fw mr-2 text-gray-400' />
                                Profile
                            </a>
                            <a className='dropdown-item' href='#'>
                                <i className='fas fa-cogs fa-sm fa-fw mr-2 text-gray-400' />
                                Settings
                            </a>
                            <div className='dropdown-divider' />
                            <a
                                href={`${APP_URL}/signout`}
                                className='dropdown-item'
                            >
                                <i className='fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400' />
                                Logout
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>
        );
    };
    return <Fragment>{showNavbar()}</Fragment>;
};

export default Navbar;
