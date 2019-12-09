import React, { Fragment, useEffect, useState } from 'react';
import { signin, authenticateUser, isAuthenticated } from '../auth/authUtil';
import { Navbar, Nav, Badge, NavDropdown, Form, FormControl, Button, Col, Row} from 'react-bootstrap';
import { getTotalCount } from './client/cartHelpers';

const Layout = ({ run=undefined, children }) => {
    console.log(getTotalCount());
    const { user } = isAuthenticated();
    const [iCount, setCount] = useState(0);

    useEffect(() => {
        setCount(getTotalCount());
    }, [run]);
    
    const showBadge = () => {
        return (
            <Badge variant="dark">{iCount}</Badge>
        );
    };

    const showUserGuest = () => {
        if (user) {
            return (
                <Fragment>
                    <Nav.Item>
                        <Nav.Link className="text-white" href={`/profile/${user._id}`}>My Profile</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className="text-white" href="/signout">Logout</Nav.Link>
                    </Nav.Item>
                </Fragment>
            );  
        }
        return (
            <Fragment>
                <Nav.Item>
                    <Nav.Link className="text-white" href="/login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="text-white" href="/signup">Register</Nav.Link>
                </Nav.Item>
            </Fragment>
        );
    }

    const showNavFirst = () => {
        return (
            <Nav className="justify-content-end bg-secondary" activeKey="/home">
                {showUserGuest()}
            </Nav>
        );
    };

    const showNavBarSecond = () => {
        return (
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Titan Super Tools</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">  
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" style={{ width : '50vw' }}/>
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
            </Navbar>
        );
    };

    const showNavBarThird = () => {
        return (
            <Nav className="bg-secondary" activeKey="/home">
                <Nav.Item>
                    <Nav.Link className="text-white" href="/">Categories</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="text-white" href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="text-white" href="/">Shop</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link className="text-white" href="#">My Cart {showBadge()}</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="text-white" href="#">Orders</Nav.Link>
                </Nav.Item>
            </Nav>
        );
    };

    const showFooter = () => {
        return (
            <footer className='text-center mt-5 mb-5'>
                Titan Super Tools 2020 - titansupertools.com
            </footer>
        );
    };

    return (
        <Fragment>
            {showNavFirst()}
            {showNavBarSecond()}
            {showNavBarThird()}
            <h1 className='text-center mt-5'>TITAN SUPERTOOLS</h1>
            <div style={{ minHeight: '60vh' }}>{children}</div>
            {showFooter()}
        </Fragment>
    );
};

export default Layout;
