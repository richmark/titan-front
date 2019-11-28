import React, { useState, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/authUtil';
import { Container, Row, Col, Form, Card, Button, Table, Modal } from 'react-bootstrap';
import BasicFormInput from './format/BasicFormInput';

const Profile = () => {
    const { user } = isAuthenticated();
    const [modalEdit, setModalEdit] = useState(false);
    const [modalPassword, setModalPassword] = useState(false);
    const [changeEdit, setChangeEdit] = useState({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        address: user.address,
        mobile_number: user.mobile_number
    });

    const handleChange = oName => oEvent => {
		console.log(oName, oEvent.target.value);
    };
    
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
                <Form>
                <Modal.Body>
                    <Fragment>
                        {BasicFormInput('First Name', 'text', 'formfirstName', handleChange('first_name'), aFormLabel, iFormLength, '', user.first_name)}
                        {BasicFormInput('Last Name', 'text', 'formLastName', handleChange('last_name'), aFormLabel, iFormLength, '', user.last_name)}
                        {BasicFormInput('Mobile Number', 'text', 'formMobileNumber', handleChange('mobile_number'), aFormLabel, iFormLength, '', user.mobile_number)}
                        {BasicFormInput('Address', 'text', 'formMobileNumber', handleChange('address'), aFormLabel, iFormLength, '', user.address)}
                    </Fragment>            
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="m-1">Save</Button>
                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
                </Form>
            </Modal>
        );
    };

    const EditPasswordModal = (props) => {
        const aFormLabel = [3,0];
        const iFormLength = 8;
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
                <Modal.Body>
                    {BasicFormInput('Current Password', 'password', 'formCurrentPassword', handleChange('current_password'), aFormLabel, iFormLength)}
                    {BasicFormInput('New Password', 'password', 'formNewPassword', handleChange('new_password'), aFormLabel, iFormLength)}
                    {BasicFormInput('Confirm Password', 'password', 'formConfirmPassword', handleChange('current_password'), aFormLabel, iFormLength)}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="m-1">Save</Button>
                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
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
