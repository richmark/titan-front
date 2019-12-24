import React, { Fragment, useEffect, useState } from 'react';
import { signin, authenticateUser, isAuthenticated } from '../auth/authUtil';
import { Navbar, Nav, Badge, NavDropdown, Form, FormControl, Button, Col, Row, InputGroup, DropdownButton, Dropdown, Container, Image} from 'react-bootstrap';
import { getTotalCount } from './client/cartHelpers';

const Layout = ({ run=undefined, children }) => {

    const { user } = isAuthenticated();
    const [iCount, setCount] = useState(0);

    useEffect(() => {
        setCount(getTotalCount());
    }, [run]);
    
    const showBadge = () => {
        return (
            <Badge variant="dark" style={{color: 'red'}}>{iCount}</Badge>
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
                    <Col className="mt-2 mb-2 text-right">
                    <span className="text-white"><i className="far fa-envelope" style={{color: '#ffc044'}}></i> admin@titan.com</span>
                    </Col>
                    <Col xs={1} className="mt-2 mb-2">
                    <span className="text-white"><i className="fas fa-phone-alt" style={{color: '#ffc044'}}></i> 028-00000</span>
                    </Col>
                    <Col className="mt-2 mb-2 text-left">
                    <span className="text-white"><i className="fas fa-map-marker-alt" style={{color: '#ffc044'}}></i> 8th ave Caloocan City</span>
                    </Col>
                    <Col className="mt-2 mb-2 text-right">
                    <a href="/login" className="text-white"><i className="fas fa-user" style={{color: '#ffc044'}}></i> Login</a>
                    </Col>
                    <Col className="mt-2 mb-2">
                    <a href="/signup" className="text-white"><i className="fas fa-edit" style={{color: '#ffc044'}}></i> Register</a>
                    </Col>  
            </Fragment>
        );
    }

    const showNavFirst = () => {
        return (
            <Nav style={{backgroundColor: '#4c4847'}} activeKey="/home">
                {showUserGuest()}
            </Nav>
        );
    };

    const showNavBarSecond = () => {
        return (
            <Navbar expand="lg" style={{borderBottom: '8px solid #ffc044', backgroundColor: 'black'}}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="mt-2 mb-2">
                <Col xs={4} className="text-white text-right">
                    <Image src="http://localhost:8000/images/others/titan-supertools-logo.png" alt="Titan Super Tools" style={{width: '250px', height: 'auto'}}></Image>
                </Col>
                <Col xs={5}>
                    <Row>
                        <Col className="col-2" style={{paddingRight: '0px', marginLeft: '5rem!important'}}>
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" className="rounded-pill float-left" style={{backgroundColor: 'white', border: '1px solid #ced4da', color: 'black'}}>
                                    All Categories
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col xs={9}>
                            <InputGroup className="ml-4">
                                <FormControl
                                placeholder="Search here"
                                aria-label="Search here"
                                aria-describedby="basic-addon2"
                                style={{borderTopLeftRadius: '50rem', borderBottomLeftRadius: '50rem'}}
                                />
                                <InputGroup.Append>
                                    <Button style={{borderTopRightRadius: '50rem', borderBottomRightRadius: '50rem', backgroundColor: '#ffc044', border: '1px solid #ffc044 '}} className="text-white">Search</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                </Col>
                <Col xs={3}>
                    <Container>
                        <a href="/checkout" style={{textDecoration: 'none'}}>
                            <i className="fas fa-shopping-cart mt-3 ml-3" style={{color: 'white'}}></i>{showBadge()}
                            <p className="text-white">Your Cart</p>
                        </a>
                    </Container>
                </Col>
            </Navbar.Collapse>
            </Navbar>
        );
    };

    const showNavBarThird = () => {
        return (
            <Nav activeKey="/home" style={{marginLeft: '20%'}}>
                <Nav.Item>
                    <Nav.Link style={{textDecoration: 'none', color: 'black'}} href="/"><i className="fas fa-home" style={{color: '#ffc044'}}></i> Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{textDecoration: 'none', color: 'black'}} href="/"><i className="fas fa-shopping-cart" style={{color: '#ffc044'}}></i> Shop</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{textDecoration: 'none', color: 'black'}} href="#"><i className="fas fa-gift" style={{color: '#ffc044'}}></i> Your Orders</Nav.Link>
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
