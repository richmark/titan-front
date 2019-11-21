import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';

const PreRegister = () => {
    const [role, setRole] = useState(0);
    const clickSubmit = number => oEvent => {
        oEvent.preventDefault();
        setRole(number);
    };
    const showPreRegisterView = () => {
        return (
            <div className='container mt-5 text-center'>
                <div className='row'>
                    <div className='col-sm border-right'>
                        <button
                            onClick={clickSubmit(1)}
                            className='btn btn-success mb-5'
                        >
                            Personal
                        </button>
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
                        <button
                            onClick={clickSubmit(2)}
                            className='btn btn-success mb-5'
                        >
                            Corporate
                        </button>
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
                        <button
                            onClick={clickSubmit(2)}
                            className='btn btn-success mb-5'
                        >
                            Whole Sale
                        </button>
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
    const redirectToSignup = () => {
        // console.log(role);
        if (role === 1) {
            return <Redirect to='/signup/personal' />;
        } else if (role === 2) {
            return <Redirect to='/signup/wholesaler' />;
        } else {
            return <Redirect to='/signup' />;
        }
    };
    return (
        <Layout>
            {showPreRegisterView()}
            {redirectToSignup()}
        </Layout>
    );
};

export default PreRegister;
