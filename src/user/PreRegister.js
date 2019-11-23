import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';

const PreRegister = () => {
    
    const showPreRegisterView = () => {
        return (
            <div className='container mt-5 text-center'>
                <div className='row'>
                    <div className='col-sm border-right'>
                        <Link to="/signup/personal">
                            <button className='btn btn-success mb-5'>
                                Personal
                            </button>
                        </Link>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    <div className='col-sm border-right'>
                        <Link to="/signup/corporate">
                            <button className='btn btn-success mb-5'>
                                Corporate
                            </button>
                        </Link>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    <div className='col-sm'>
                        <Link to="/signup/wholesaler">
                            <button className='btn btn-success mb-5'>
                                WholeSaler
                            </button>
                        </Link>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
            </div>
        );
    };
    
    return (
        <Layout>
            {showPreRegisterView()}
        </Layout>
    );
};

export default PreRegister;
