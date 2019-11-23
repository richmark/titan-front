import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
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

    const [danger, setDanger] = useState({
        danger_email: '',
        danger_password: '',
    });

    const {
        danger_email,
        danger_password
    } = danger;
    const { user } = isAuthenticated();
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };
    const { email, password, error, redirectToReferrer } = values;
    const clickSubmit = oEvent => {
        const sDanger = 'border-danger';
        var sMessage = '';
        const oDanger = {};
        const sValidEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        oEvent.preventDefault();

        if (email.match(sValidEmail) === null) {
            sMessage += '- Invalid email. \n';
            oDanger.danger_email = sDanger;
        }

        if (password.length < 8 || password.length > 16) {
            sMessage +=
                '- Password must be atleast 8 characters and max of 16 characters \n';
            oDanger.danger_password = sDanger;
        }

        if (sMessage !== '') {
            setDanger(oDanger);
            return alert(sMessage);
        }

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
                    <div className='col-sm-5 border p-5'>
                        <h3 className='text-center mb-5'>LOGIN</h3>
                        <div className="row">
                            <div className="col-sm-3">
                                <label className="mt-2" htmlFor="exampleInputEmail1" style={{fontSize: '16px'}}>Email</label>
                            </div>
                            <div className="col-sm">
                            <input
                                onChange={handleChange('email')}
                                value={email}
                                type='email'
                                className={`form-control ${danger_email}`}
                                placeholder='Enter email'
                                required
                            />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-sm-3">
                                <label className="mt-2 " htmlFor="exampleInputEmail1">Password</label>
                            </div>
                            <div className="col-sm">
                            <input
                                onChange={handleChange('password')}
                                value={password}
                                type='password'
                                className={`form-control ${danger_password}`}
                                placeholder='Enter Password'
                                required
                            />
                            </div>
                        </div>
                        <Link to="/forgotPassword">
                            <p className="mt-1 offset-3">
                               Forgot password
                            </p>
                        </Link>
                        <div className='align-content-center text-center mt-2'>
                            <button
                                onClick={clickSubmit}
                                type='submit'
                                className='btn btn-primary mb-2 px-4'
                            >
                                Login
                            </button>
                            <Link to="/signup">
                                <p>Not yet a member? Register here</p> 
                            </Link> 
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
            }
            return <Redirect to='/user/dashboard' />;
        }
    };
    return (
        <Layout title='Login' description='Login here'>
            {showError()}
            <form>
                {showLoginForm()}
            </form>
            {redirectUser()}
        </Layout>
    );
};

export default Login;
