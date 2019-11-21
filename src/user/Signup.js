import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../core/Layout';
import { sendSignup } from '../core/client/clientApi';

const Signup = ({ match }) => {
    const [result, setResult] = useState(false);
    const [message, setMessage] = useState('');
    const [values, setValues] = useState({
        first_name: 'Richmark Jinn',
        last_name: 'Ravina',
        email: 'richmark.jinn.ravina@gmail.com',
        mobile_number: '09771877285',
        address: 'BLK 138 Lot 6 Zone 7 AFP Housing Bulihan, Silang, Cavite',
        password: 'qweqwe123',
        confirm_password: 'qweqwe123'
    });
    const [danger, setDanger] = useState({
        danger_first: '',
        danger_last: '',
        danger_email: '',
        danger_mobile: '',
        danger_address: '',
        danger_password: '',
        danger_confirm: ''
    });
    const {
        first_name,
        last_name,
        email,
        mobile_number,
        address,
        password,
        confirm_password
    } = values;
    const {
        danger_first,
        danger_last,
        danger_email,
        danger_mobile,
        danger_address,
        danger_password,
        danger_confirm
    } = danger;

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = oEvent => {
        const sDanger = 'border-danger';
        var sMessage = '';
        const oDanger = {};
        const sLettersOnly = /^[a-z ]+$/i;
        const sNumbersOnly = /^[0-9]+$/i;
        const sValidEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        oEvent.preventDefault();
        if (confirm_password !== password) {
            sMessage += '- Password not match \n';
            oDanger.danger_password = sDanger;
            oDanger.danger_confirm = sDanger;
        }

        if (password.length < 8 || password.length > 16) {
            sMessage +=
                '- Password must be atleast 8 characters and max of 16 characters \n';
            oDanger.danger_password = sDanger;
        }

        if (email.match(sValidEmail) === null) {
            sMessage += '- Invalid email. \n';
            oDanger.danger_email = sDanger;
        }

        if (last_name.match(sLettersOnly) === null) {
            sMessage += '- Invalid last name. \n';
            oDanger.danger_last = sDanger;
        }

        if (address.length <= 5) {
            sMessage += '- Invalid address. \n';
            oDanger.danger_address = sDanger;
        }

        if (first_name.match(sLettersOnly) === null) {
            sMessage += '- Invalid first name. \n';
            oDanger.danger_first = sDanger;
        }

        if (
            mobile_number.length !== 11 &&
            mobile_number.substring(0, 2) !== '09' &&
            mobile_number.match(sNumbersOnly) === null
        ) {
            oDanger.danger_mobile = sDanger;
            sMessage += '- Invalid mobile number. \n';
        }

        if (sMessage !== '') {
            setDanger(oDanger);
            return alert(sMessage);
        }

        sendSignup(values).then(oData => {
            if (oData.error) {
                console.log(oData.error);
            } else {
                console.log(oData);
                setResult(true);
                setMessage(oData.message);
            }
        });
    };
    const showTitle = () => {
        if (match.params.roleId === 'personal') {
            return <h3>REGISTER (PERSONAL)</h3>;
        } else if (
            match.params.roleId === 'wholesaler' ||
            match.params.roleId === 'corporate'
        ) {
            return <h6>REGISTER (WHOLESALER - CORPORATE)</h6>;
        }
    };
    const showUploadImage = () => {
        return (
            <div className='col-sm p-5 align-content-center text-center'>
                <h4 className='mb-5'>Upload Image</h4>
                <label
                    htmlFor='upload-photo'
                    className='mr-5 mb-5'
                    style={{ cursor: 'pointer' }}
                >
                    Store Front <i className='fa fa-upload' />
                </label>
                <img
                    className='float-right mr-5'
                    src='./image/default.PNG'
                    style={{ width: '100px', height: '50px' }}
                />
                <input
                    type='file'
                    name='photo'
                    id='upload-photo'
                    style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
                />
                <br />
                <label
                    htmlFor='upload-photo'
                    className='mr-5 mb-5'
                    style={{ cursor: 'pointer' }}
                >
                    Company BIR 2307 <i className='fa fa-upload' />
                </label>
                <img
                    className='float-right mr-5'
                    src='./image/default.PNG'
                    style={{ width: '100px', height: '50px' }}
                />
                <input
                    type='file'
                    name='photo'
                    id='upload-photo'
                    style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
                />
                <br />
                <label
                    htmlFor='upload-photo'
                    className='mr-5 mb-5'
                    style={{ cursor: 'pointer' }}
                >
                    Mayor’s Permit <i className='fa fa-upload' />
                </label>
                <img
                    className='float-right mr-5'
                    src='./image/default.PNG'
                    style={{ width: '100px', height: '50px' }}
                />
                <input
                    type='file'
                    name='photo'
                    id='upload-photo'
                    style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
                />
                <br />
            </div>
        );
    };
    const showCommonForm = () => {
        return (
            <Fragment>
                {showTitle()}
                <div className='form-group'>
                    <label htmlFor='exampleInputEmail1'>Email address</label>
                    <input
                        onChange={handleChange('email')}
                        value={email}
                        type='email'
                        className={`form-control ${danger_email}`}
                        placeholder='Enter email'
                    />
                    <small id='emailHelp' className='form-text text-muted'>
                        We'll never share your email with anyone else.
                    </small>
                </div>
                <div className='form-group'>
                    <label htmlFor='exampleInputEmail1'>First Name</label>
                    <input
                        onChange={handleChange('first_name')}
                        className={`form-control ${danger_first}`}
                        value={first_name}
                        type='text'
                        placeholder='Enter First Name'
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='exampleInputEmail1'>Last Name</label>
                    <input
                        onChange={handleChange('last_name')}
                        className={`form-control ${danger_last}`}
                        value={last_name}
                        type='text'
                        placeholder='Enter Last Name'
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='exampleInputEmail1'>Mobile Number</label>
                    <input
                        onChange={handleChange('mobile_number')}
                        className={`form-control ${danger_mobile}`}
                        value={mobile_number}
                        type='text'
                        placeholder='Enter Mobile Number'
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='exampleInputEmail1'>Address</label>
                    <input
                        onChange={handleChange('address')}
                        className={`form-control ${danger_address}`}
                        value={address}
                        type='text'
                        placeholder='Enter Address'
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='exampleInputPassword1'>
                        Password input
                    </label>
                    <input
                        onChange={handleChange('password')}
                        type='password'
                        className={`form-control ${danger_password}`}
                        value={password}
                        placeholder='Password'
                    />
                </div>
            </Fragment>
        );
    };
    const showPersonal = () => {
        return (
            <Fragment>
                <div className='col-sm'></div>
                <div className='col-sm border m-5 p-5'>{showCommonForm()}</div>
                <div className='col-sm'></div>
            </Fragment>
        );
    };
    const showWholeSalerCorporate = () => {
        return (
            <Fragment>
                <div className='col-sm'>{showCommonForm()}</div>
                {showUploadImage()}
            </Fragment>
        );
    };
    const showConditionalForm = () => {
        if (match.params.roleId === 'personal') {
            return showPersonal();
        } else if (
            match.params.roleId === 'wholesaler' ||
            match.params.roleId === 'corporate'
        ) {
            return showWholeSalerCorporate();
        }
    };
    const showForm = () =>
        !result && (
            <div className='container text-center'>
                <div className='row'>{showConditionalForm()}</div>
                <button
                    onClick={clickSubmit}
                    type='button'
                    className='btn btn-success'
                >
                    REGISTER
                </button>
            </div>
        );

    const showSuccess = () =>
        result && <div className='alert alert-info'>{message}</div>;

    return (
        <Layout title='Signup' description='Sign up here'>
            {showSuccess()}
            {showForm()}
        </Layout>
    );
};

export default Signup;
