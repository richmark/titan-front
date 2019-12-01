import React, { useState, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { sendSignin, resendTokenEmail } from '../core/client/clientApi';
import { authenticate, isAuthenticated } from '../auth/authUtil';
import { REGEX_EMAIL } from '../config';
import {Col, Container, Row, Card, Button} from 'react-bootstrap';
import BasicFormInput from './format/BasicFormInput';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        redirectToReferrer: false
    });
    const [sendToken, setSendToken] = useState({
        email: '',
        resend: false
    });

    const [verify, setVerify] = useState(false);

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
        console.log(name);
        setValues({ ...values, [name]: event.target.value });
    };
    const { email, password, error, redirectToReferrer } = values;
    
    const clickSubmit = oEvent => {
        oEvent.preventDefault();
        const sDanger = 'border-danger';
        var sMessage = '';
        const oDanger = {};
        const sValidEmail = REGEX_EMAIL;
        setSendToken({
            ...sendToken,
            resend: false
        });
        setVerify(false);

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
                if (oData.email) {
                    setSendToken({
                        ...sendToken,
                        email: oData.email,
                        resend: true
                    });
                }
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
            return (
                <div className='alert alert-warning'>
                    {error}
                    {resendTokenButton()}
                </div>
            );
        }
    };

    const showVerificationMessage = () => {
        if (verify !== false) {
            return (
                <div className='alert alert-info'>
                    {verify}
                </div>    
            );
        }
    }

    const resendTokenButton = () => {
        if (sendToken.resend) {
            return (
                <Fragment>
                    <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={resendToken(sendToken.email)}>  Resend Token</span>
                </Fragment>
            );
        }
    };

    const resendToken = sEmail => oEvent => {
        oEvent.preventDefault();
        setSendToken({
            ...sendToken,
            resend: false
        });
        setValues({
            ...values,
            error: ''
        });
        resendTokenEmail({ email: sEmail}).then(oData => {
            setVerify(oData.message);
            console.log(oData.message);
        });
    };

    const bootstrapLogin = () => {
        const aFormLabel = [3,0];
        const iFormLength = 8;
        return(
            <Container className="px-3 py-2">
                <Row>
                    <Col sm={{span: 6, offset:3}}>
                        <Card className="mx-4 pt-2 pb-4">
                            <Card.Title className="text-center p-3 mt-3" style={{fontSize : "27px"}}>LOGIN</Card.Title>
                            <Card.Body>
                                {BasicFormInput('Email', 'text', 'formEmail', handleChange('email'), aFormLabel, iFormLength, danger_email)}
                                {BasicFormInput('Password', 'password', 'formPassword', handleChange('password'), aFormLabel, iFormLength, danger_password)}
                                <Row>
                                    <Col sm={{span: 6, offset:3}}>
                                        <Link to="/forgotPassword">
                                            Forgot password
                                        </Link>
                                    </Col>
                                </Row>
                                <Row className="my-3">
                                    <Col sm={{ offset: 5}}>
                                        <Row>
                                            <Button variant="primary" className="px-4">Login</Button>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={{span: 7, offset:3}}>
                                        <Link to="/signup">
                                            Not yet a member? Register here
                                        </Link>
                                    </Col>
                                </Row>  
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }

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
            if (user.verified_admin === false && user.role > 2) {
                return <Redirect to='/upload' />;
            }
            return <Redirect to='/' />;
        }
    };
    return (
        <Layout title='Login' description='Login here'>
            {showError()}
            {showVerificationMessage()}
            <form>
                {showLoginForm()}
                {bootstrapLogin()}
            </form>
            
            {redirectUser()}
        </Layout>
    );
};

export default Login;
