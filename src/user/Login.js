import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { sendSignin } from '../core/client/clientApi';
import { authenticate, isAuthenticated } from '../auth/authUtil';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        redirectToReferrer: false
    });
    const { user } = isAuthenticated();
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };
    const { email, password, error, redirectToReferrer } = values;
    const clickSubmit = oEvent => {
        oEvent.preventDefault();
        sendSignin(values).then(oData => {
            if (oData.error) {
                setValues({ ...values, error: oData.error });
            } else {
                authenticate(oData, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };
    const showError = () => {
        if (error !== '') {
            return <div className='alert alert-warning'>{error}</div>;
        }
    };
    const showLoginForm = () => {
        return (
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-sm' />
                    <div className='col-sm border p-4'>
                        <h3 className='text-center mb-5'>LOGIN</h3>
                        <div className='form-group'>
                            <label htmlFor='exampleInputEmail1'>
                                Email address
                            </label>
                            <input
                                onChange={handleChange('email')}
                                value={email}
                                type='email'
                                className='form-control'
                                placeholder='Enter email'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='exampleInputPassword1'>
                                Password
                            </label>
                            <input
                                onChange={handleChange('password')}
                                value={password}
                                type='password'
                                className='form-control'
                                placeholder='Password'
                            />
                        </div>
                        <div className='align-content-center text-center mt-2'>
                            <button
                                onClick={clickSubmit}
                                type='submit'
                                className='btn btn-primary mx-auto'
                            >
                                Login
                            </button>
                            <p>
                                <a href='#'>Not yet a member? Register here</a>
                            </p>
                        </div>
                    </div>
                    <div className='col-sm' />
                </div>
            </div>
        );
    };
    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to='/admin/dashboard' />;
                // admin
                //   return <Redirect to='/admin/dashboard' />;
            }
            return <Redirect to='/user/dashboard' />;
        }
    };
    return (
        <Layout title='Login' description='Login here'>
            {showError()}
            {showLoginForm()}
            {redirectUser()}
        </Layout>
    );
};

export default Login;
