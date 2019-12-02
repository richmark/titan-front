import React, { useState, Fragment } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/authUtil';
import { Container, Row, Col, Form, Card, Button, Table, Modal } from 'react-bootstrap';
import BasicFormInput from './format/BasicFormInput';
import BasicAlert from './format/BasicAlert';
import { oValidatorLibrary } from '../libraries/validatorLibrary';
import { sendUpdateUserData, updateUserData, sendUpdateUserPassword } from '../core/client/clientApi';

const Profile = ({match}) => {

    const { user, sToken } = isAuthenticated();
    const [modalEdit, setModalEdit] = useState(false);
    const [modalPassword, setModalPassword] = useState(false);
    
    const showProfileCard = () => {
        return (
            <Card className="px-3 py-2" style={{ fontSize: "16px"}}>
                <Container>
                    <Row className="mt-3">Personal Profile</Row>
                        <Row className="mt-3">
                            <Col>
                                <Row>
                                    <Col sm={3} className="p-0">Email:</Col>
                                    <Col className="text-left">{user.email}</Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col sm={3} className="p-0">Mobile No:</Col>
                                    <Col className="text-left">{user.mobile_number}</Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <Row>
                                    <Col sm={3} className="p-0">First Name:</Col>
                                    <Col className="text-left">{user.first_name}</Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col sm={3} className="p-0">Address:</Col>
                                    <Col className="text-left">{user.address}</Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col sm={{ span: 6}}>
                                <Row>
                                    <Col sm={3} className="p-0">Last Name:</Col>
                                    <Col className="text-left">{user.last_name}</Col>
                                </Row>
                            </Col>
                        </Row>
                    <Row className="my-3">
                        <Col sm={{ offset: 7}}>
                            <Row>
                                <Button variant="primary" className="m-1" onClick={() => setModalEdit(true)}>Edit</Button>
                                <Button variant="primary" className="m-1" onClick={() => setModalPassword(true)}>Change Password</Button>
                            </Row>
                        </Col>
                    </Row>       
                </Container>
            </Card>
        );
    };

    const showOrderCard = () => {
        return (
            <Card className="mt-3 px-3 py-2" style={{ fontSize: "16px"}}>
                <Card.Body>
                    <Row>My Order</Row>
                    <Row className="mt-3">
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Order No</th>
                                    <th>Date</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Table cell</td>
                                    <td>Table cell</td>
                                    <td>Manage</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Table cell</td>
                                    <td>Table cell</td>
                                    <td>Manage</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Table cell</td>
                                    <td>Table cell</td>
                                    <td>Manage</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Row>
                </Card.Body>
            </Card>
        );
    };

    const showProfile = () => {
        return (
            <Container className="mt-5">
                <Row>
                    <Col sm={{ span: 10, offset: 1 }}>
                        <Card className="mt-3 px-3 py-2">
                            <Card.Body>
                                <Card.Title>
                                    <h4>Manage My Account (Personal)</h4>
                                    {showProfileCard()}
                                    {showOrderCard()}
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col> 
                </Row>
            </Container>
        );
    };

    const EditProfileModal = (props) => {
        const aFormLabel = [3,0];
        const iFormLength = 8;
        const oEmpty = () => {};
        const oData = {
            first_name : '',
            last_name : '',
            mobile_number : '',
            address : ''
        }
        const [danger, setDanger] = useState(oData);
        const [message, setMessage] = useState('');
        const [success, setSuccess] = useState(false);
        const [profile, setProfile] = useState({
            first_name: user.first_name,
            last_name: user.last_name,
            mobile_number: user.mobile_number,
            address: user.address
        });

        const closeModal = (props) => {
            if (success !== false) {
                setTimeout(() => {
                    props.onHide();
                }, 1000);
                return BasicAlert('success', 'Update Successful!');
            }
        };

        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Profile {`(${user.email})`}
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitProfile(setDanger, setMessage, oData, {profile, setProfile}, setSuccess)}>
                <Modal.Body>
                    <Fragment>
                        {BasicFormInput('First Name', 'text', 'formfirstName', oEmpty, aFormLabel, iFormLength, danger.first_name, profile.first_name)}
                        {BasicFormInput('Last Name', 'text', 'formLastName', oEmpty, aFormLabel, iFormLength, danger.last_name, profile.last_name)}
                        {BasicFormInput('Mobile Number', 'text', 'formMobileNumber', oEmpty, aFormLabel, iFormLength, danger.mobile_number, profile.mobile_number)}
                        {BasicFormInput('Address', 'text', 'formAddress', oEmpty, aFormLabel, iFormLength, danger.address, profile.address)}
                        {message !== '' ? BasicAlert('danger', message) : ''}
                        {closeModal(props)}
                    </Fragment>            
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="m-1" type="submit">Save</Button>
                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
                </Form>
            </Modal>
        );
    };

    const checkSameUserData = (oCheck, oProfile) => {
        const oData = {
            first_name : oProfile.first_name,
            last_name : oProfile.last_name,
            mobile_number : oProfile.mobile_number,
            address : oProfile.address
        }
        if (JSON.stringify(oData) === JSON.stringify(oCheck)) {
            return true;
        }
        return false;
    }

    const submitProfile = (oDanger, oMessage, oInitial, oProfile, oSuccess) => (oEvent) => {
        oEvent.preventDefault();
        oDanger(oInitial);
        oMessage('');
        const oData = {
            first_name    : getValue('formfirstName'),
            last_name     : getValue('formLastName'),
            mobile_number : getValue('formMobileNumber'),
            address       : getValue('formAddress'),
        }
        if (checkSameUserData(oData, oProfile.profile) === true) {
            return;
        }
        var oValidator = oValidatorLibrary();
        oValidator.message('first_name', oData.first_name, 'required|alpha_space');
        oValidator.message('last_name', oData.last_name, 'required|alpha_space');
        oValidator.message('mobile_number', oData.mobile_number, 'required|contact_number');
        oValidator.message('address', oData.address, 'required|alpha_num_dash_space|max:500');
        if (oValidator.allValid()) {
            // fetch call goes here
            const oForm = new FormData();
            Object.keys(oData).map(sKey => {
                oForm.set(sKey, oData[sKey]);
            });
            sendUpdateUserData(match.params.userId, sToken, oForm).then((oData) => {
                if (oData.error) {
                    console.log(oData.error)
                } else {
                    updateUserData(oData.data, () => {
                        oProfile.setProfile({
                            first_name : oData.data.first_name,
                            last_name : oData.data.last_name,
                            mobile_number : oData.data.mobile_number,
                            address : oData.data.address
                        });
                        oSuccess(true);
                    });
                }
            });
            return;
        }
        // error messages goes here
        var oError = oValidator.getErrorMessages();
        var sMessage = setErrorMessage(oError);
        oMessage(sMessage);
        oDanger({
            first_name : setErrorBorder(oError.first_name),
            last_name : setErrorBorder(oError.last_name),
            mobile_number :setErrorBorder(oError.mobile_number),
            address : setErrorBorder(oError.address)
        });
    };

    const EditPasswordModal = (props) => {
        const aFormLabel = [3,0];
        const iFormLength = 8;
        const oEmpty = () => {};
        const oData = {
            current_password : '',
            new_password : '',
            confirm_password : '',
        }
        const [danger, setDanger] = useState(oData);
        const [message, setMessage] = useState('');
        const [success, setSuccess] = useState({
            status : false,
            message: ''
        });
        const closeModal = (props, sMessage) => {
            if (success.status !== false) {
                setTimeout(() => {
                    props.onHide();
                }, 1000);
                return BasicAlert('success', sMessage);
            }
        };

        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Change Password
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitChangePassword(setDanger, setMessage, oData, {success, setSuccess})}>
                <Modal.Body>
                    {BasicFormInput('Current Password', 'password', 'formCurrentPassword', oEmpty, aFormLabel, iFormLength, danger.current_password)}
                    {BasicFormInput('New Password', 'password', 'formNewPassword', oEmpty, aFormLabel, iFormLength, danger.new_password)}
                    {BasicFormInput('Confirm Password', 'password', 'formConfirmPassword', oEmpty, aFormLabel, iFormLength, danger.confirm_password)}
                    {message !== '' ? BasicAlert('danger', message) : ''}
                    {closeModal(props, success.message)}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="m-1" type="submit">Save</Button>
                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
                </Form>
            </Modal>
        );
    };

    const submitChangePassword = (oDanger, oMessage, oInitial, oSuccess) => oEvent => {
        oEvent.preventDefault();
        oDanger(oInitial);
        oMessage('');
        var oValidator = oValidatorLibrary();
        const oData = {
            current_password    : getValue('formCurrentPassword'),
            password        : getValue('formNewPassword'),
            confirm_password    : getValue('formConfirmPassword'),
        }

        var oConfirm = {
            messages: {
                in: 'The field confirm password must match new password',
                not_in : 'The field new password must not match current password'
            }
        }
        oValidator.message('current_password', oData.current_password, 'required|password');
        oValidator.message('password', oData.password, 'required|password|not_in:' + oData.current_password, oConfirm);
        oValidator.message('confirm_password', oData.confirm_password, 'required|in:' + oData.password, oConfirm);

        if (oValidator.allValid()) {
            //fetch call goes here
            delete oData.confirm_password;
            sendUpdateUserPassword(match.params.userId, sToken, oData).then((oResponse) => {
                if (oResponse.error) {
                    oDanger({
                        current_password : setErrorBorder(oResponse.error),
                    });
                    oMessage(oResponse.error);
                    return;
                } else {
                    oSuccess.setSuccess({
                        status : true,
                        message : oResponse.message
                    });
                    return;
                }
            });
            return;
        }
        // error messages goes here
        var oError = oValidator.getErrorMessages();
        var sMessage = setErrorMessage(oError);
        oMessage(sMessage);
        oDanger({
            current_password : setErrorBorder(oError.current_password),
            new_password : setErrorBorder(oError.new_password),
            confirm_password :setErrorBorder(oError.confirm_password)
        });
    };

    const getValue = (sValue) => {
        return document.getElementById(sValue).value.trim()
    }

    const setErrorBorder = (sName) => {
        return (sName === null) ? '' : 'border-danger';
    };

    const setErrorMessage = (oError) => {
        var aMessage = [];
        Object.keys(oError).map(mKey => {
            aMessage.push((typeof oError[mKey] === 'object') ? '' : oError[mKey]); 
        });
        return aMessage;
    };

    return (
        <Layout title='Login' description='Login here'>
            {showProfile()}
            <EditProfileModal 
                show={modalEdit}
                onHide={() => setModalEdit(false)}
            />
            <EditPasswordModal 
                show={modalPassword}
                onHide={() => setModalPassword(false)}
            />
        </Layout>
    );
}

export default Profile;