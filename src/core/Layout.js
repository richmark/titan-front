import React, { Fragment, useEffect, useState } from 'react';
import { signin, authenticateUser, isAuthenticated } from '../auth/authUtil';
import { Navbar, Nav, Badge, NavDropdown, Form, FormControl, Button, Col, Row, InputGroup, DropdownButton, Dropdown, Container, Image} from 'react-bootstrap';
import { getTotalCount } from './client/cartHelpers';
import { Link } from 'react-router-dom';
import { IMAGE_API } from '../config';
import { getAllCategories } from '../core/admin/categories/categoriesApi';

const Layout = ({ loader='none', run=undefined, oGetCategory = () => {}, children }) => {
    const { user } = isAuthenticated();
    const [iCount, setCount] = useState(0);
    const [mLoader, setLoader] = useState(loader);
    const [oCategories, setCategories] = useState(false);
    const [oCategoriesFooter, spliceCategories] = useState(false);

    useEffect(() => {
        setCount(getTotalCount());
    }, [run]);

    useEffect(() => {
        setLoader(loader);
    }, [loader]);

    useEffect(() => {
        getAllCategories().then(oData => {
            if (oData.error) {
                console.log(oData.error);
            } else {
                setCategories(oData.data);
                oGetCategory(oData.data);
                spliceCategories(splice(oData.data));
            }
        });
    }, []);

    const splice = (aCategories) => {
        if (aCategories.length > 10) {
            var aTempCatA = JSON.parse(JSON.stringify(aCategories));
            var aTempCatB = JSON.parse(JSON.stringify(aCategories));
            var aFirstHalf = aTempCatA.splice(0, aTempCatA.length / 2);
            var aSecondHalf = aTempCatB.splice(aTempCatB.length / 2, aTempCatB.length);
            return { 'aFirst' : aFirstHalf, 'aSecond' : aSecondHalf};
        }
        return aCategories;
    };
    
    const showBadge = () => {
        return (
            <Badge variant="dark" style={{color: 'red'}}>{iCount}</Badge>
        );
    };

    const getStyle = () => {
        if (window.location.pathname === '/') {
            return {backgroundImage: `url(${IMAGE_API}/images/others/background.png)`};
        }
        return {backgroundColor: 'white'};
    };

    const showUserGuest = () => {
        if (user) {
            return (
                <Fragment>
                    <Col className="mt-2 mb-2 text-right ellipsis">
                        <span className="text-white"><i className="far fa-envelope" style={{color: '#ffc044'}}></i> admin@titan.com</span>
                    </Col>
                    <Col xs={1} className="mt-2 mb-2 ellipsis">
                        <span className="text-white"><i className="fas fa-phone-alt" style={{color: '#ffc044'}}></i> 028-00000</span>
                    </Col>
                    <Col className="mt-2 mb-2 text-left ellipsis">
                        <span className="text-white"><i className="fas fa-map-marker-alt" style={{color: '#ffc044'}}></i> 8th ave Caloocan City</span>
                    </Col>
                    <Col className="mt-2 mb-2 text-right ellipsis">
                        <a href={`/profile/${user._id}`} className="text-white"><i className="fas fa-user" style={{color: '#ffc044'}}></i> My Profile</a>
                    </Col>
                    <Col className="mt-2 mb-2 ellipsis">
                        <a href="/signout" className="text-white"><i className="fas fa-sign-out-alt" style={{color: '#ffc044'}}></i> Logout</a>
                    </Col>
                </Fragment>
            );  
        }
        return (
            <Fragment>
                    <Col className="mt-2 mb-2 text-right ellipsis" style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '100%'}}>
                    <span className="text-white"><i className="far fa-envelope" style={{color: '#ffc044'}}></i> admin@titan.com</span>
                    </Col>
                    <Col xs={1} className="mt-2 mb-2 ellipsis" style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '100%'}}>
                    <span className="text-white"><i className="fas fa-phone-alt" style={{color: '#ffc044'}}></i> 028-00000</span>
                    </Col>
                    <Col className="mt-2 mb-2 text-left ellipsis">
                    <span className="text-white"><i className="fas fa-map-marker-alt" style={{color: '#ffc044'}}></i> 8th ave Caloocan City</span>
                    </Col>
                    <Col className="mt-2 mb-2 text-right ellipsis">
                    <a href="/login" className="text-white"><i className="fas fa-user" style={{color: '#ffc044'}}></i> Login</a>
                    </Col>
                    <Col className="mt-2 mb-2 ellipsis">
                    <a href="/signup" className="text-white"><span style={{
                        backgroundImage: `url(${IMAGE_API}/images/others/ICons.png)`,
                        backgroundPosition: '75px -67px',
                        backgroundSize: '47px',
                        height: '22px',
                        width: '24px',
                        display: 'block',
                        cursor: 'pointer',
                        paddingLeft: '28px',
                        marginRight: '30px'
                    }}>Register</span></a>
                    </Col>  
            </Fragment>
        );
    }

    const showNavCategories = () => {
        if (oCategories) {
            return (
                <Dropdown.Menu>
                    {oCategories.map((oCategory, iIndex) => {
                        return (
                        <Dropdown.Item key={iIndex} href={`/categories/${oCategory._id}`}>{oCategory.name}</Dropdown.Item>
                        );
                    })}
                </Dropdown.Menu>
            );
        }
    }

    const showFooterCategories = () => {
        if (oCategoriesFooter && oCategoriesFooter['aFirst'] !== undefined) {
            return (
                <Fragment>
                    <Col className="text-left">
                        <p style={{color: '#ffc044'}}>CATEGORIES</p>
                        {oCategoriesFooter['aFirst'].map((oCategory, iIndex) => {
                            return (
                                <p className="mb-0" key={iIndex}><a href={`/categories/${oCategory._id}`} className="text-white text-uppercase">{oCategory.name}</a></p>
                            );
                        })}
                    </Col>
                    <Col className="text-left" style={{paddingTop: '2.5rem'}}>
                        {oCategoriesFooter['aSecond'].map((oCategory, iIndex) => {
                            return (
                                <p className="mb-0" key={iIndex}><a href={`/categories/${oCategory._id}`} className="text-white text-uppercase">{oCategory.name}</a></p>
                            );
                        })}
                    </Col>
                </Fragment>
            );
        }

        if (oCategoriesFooter) {
            return (
                <Fragment>
                    <Col className="text-left">
                        <p style={{color: '#ffc044'}}>CATEGORIES</p>
                        {oCategoriesFooter.map((oCategory, iIndex) => {
                            return (
                                <p className="mb-0" key={iIndex}><a href={`/categories/${oCategory._id}`} className="text-white text-uppercase">{oCategory.name}</a></p>
                            );
                        })}
                    </Col>
                </Fragment>
            );
        }
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
            <Navbar id="basic-navbar-nav" className="mt-2 mb-2" style={{width : '100%'}}>
                <Col xs={4} md={4} xl={4} sm={4} className="text-white text-right">
                    <Link to='/'>
                        <Image src={`${IMAGE_API}/images/others/titan-supertools-logo.png`} alt="Titan Super Tools" style={{width: '250px', height: 'auto'}}></Image>
                    </Link>
                </Col>
                <Col xs={1} md={1} xl={1} sm={1}>
                    <Dropdown style={{width: '100%'}}>
                        <Dropdown.Toggle id="dropdown-basic" className="rounded-pill" style={{backgroundColor: 'white', border: '1px solid #ced4da', color: 'black', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '100%'}}>
                            Categories
                        </Dropdown.Toggle>

                        {showNavCategories()}
                    </Dropdown>
                </Col>
                <Col xs={4} md={4} xl={4} sm={4}>
                    <InputGroup style={{width: '100%'}}>
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
                <Col xs={3} md={3} xl={3} sm={3}>
                    <Container>
                        <a href="/checkout" style={{textDecoration: 'none'}}>
                            <i className="fas fa-shopping-cart mt-3 ml-3" style={{color: 'white'}}></i>{showBadge()}
                            <p className="text-white">Your Cart</p>
                        </a>
                    </Container>
                </Col>
            </Navbar>
            </Navbar>
        );
    };

    const showNavBarThird = () => {
        return (
            <Nav activeKey="/home" style={{marginLeft: '20%'}}>
                <Nav.Item>
                    <Nav.Link style={{textDecoration: 'none', color: 'black'}} href="/"><span style={{
                        backgroundImage: `url(${IMAGE_API}/images/others/ICons.png)`,
                        backgroundPosition: '125px -152px',
                        backgroundSize: '60px',
                        height: '22px',
                        width: '24px',
                        display: 'block',
                        cursor: 'pointer',
                        paddingLeft: '28px',
                        marginRight: '30px'
                        }}>Home
                    </span></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{textDecoration: 'none', color: 'black'}} href="/"><span style={{
                        backgroundImage: `url(${IMAGE_API}/images/others/ICons.png)`,
                        backgroundPosition: '125px -123px',
                        backgroundSize: '60px',
                        height: '22px',
                        width: '24px',
                        display: 'block',
                        cursor: 'pointer',
                        paddingLeft: '28px',
                        marginRight: '30px'
                    }}>Shop</span></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{textDecoration: 'none', color: 'black'}} href={user && `/profile/${user._id}`}><i className="fas fa-gift" style={{color: '#ffc044'}}></i> Your Orders</Nav.Link>
                </Nav.Item>
            </Nav>
        );
    };

    const showFooter = () => {
        return oCategories && (
            <footer className='text-center p-5 text-white mt-5' style={{backgroundColor: 'black'}}>
                <Container>
                    <Row className="border-bottom pb-5 mb-1">
                        <Col xs={4} md={4} xl={4} sm={4} className="text-left">
                            <p style={{color: '#ffc044'}}>NAVIGATION</p>
                            <a href="/" className="text-white">HOME</a><br></br>
                            <a href="/" className="text-white">ABOUT US</a><br></br>
                            <a href="/" className="text-white">SHOP</a><br></br>
                            <a href="/" className="text-white">PRODUCTS</a><br></br>
                            <a href="/" className="text-white">CONTACT US</a><br></br>            
                        </Col>
                        {showFooterCategories()}
                        {/* <Col className="text-left" style={{paddingTop: '2.5rem'}}>
                            <a href="/" className="text-white">CONSTRUCTION MACHINE</a><br></br>
                            <a href="/" className="text-white">HAND TOOLS</a><br></br>
                            <a href="/" className="text-white">ACCESSORIES</a><br></br>
                            <a href="/" className="text-white">WELDING MACINE</a><br></br>
                        </Col> */}
                        <Col xs={3} md={3} xl={3} sm={3} className="text-left">
                            <p style={{color: '#ffc044'}}>ABOUT US</p>
                            <p>
                                Tital Supertools Hardware is a company that carries multipe brands fot the assortment of the clients to choose from at an affordable price
                            </p>

                            <p style={{color: '#ffc044'}}>STORE INFORMATION</p>
                            <p>273 Rizal Avenue Extension, Caloocan City</p>
                            <p><i className="fas fa-phone-alt" style={{color: '#ffc044'}}></i> (02)285-7337 0916-2927228</p>
                            <p><i className="fas fa-paper-plane" style={{color: '#ffc044'}}></i> sales.tsthardware@gmail.com</p>
                        </Col>
                    </Row>
                    <div className="float-left">
                        © 2020 Titan. All rights reserved
                    </div>
                    <div className="float-right">
                    <a href="/" style={{color: '#ffc044'}}>follow us<i className="ml-2 fab fa-facebook-f"></i></a>
                    </div>
                </Container>
            </footer>
        );
    };

    const showLoader = () => {
        return (
            <Fragment>
                <div style={{position: 'absolute', zIndex: 99999, backgroundColor: 'rgba(99, 99, 99, 0.6)', width: '100%', height: '100%', display: mLoader}}>
                    <div style={{width: '20%', position: 'fixed', textAlign: 'center', height: '10%', left: '40%', top: '45%'}}>
                        <div className="loadingio-spinner-rolling-9vq94p0gkx5">
                            <div className="ldio-o8fa4n59lro">
                                <div></div>
                            </div>
                        </div>
                        <div>Loading...</div>
                    </div>
                </div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            {showLoader()}
            <div style={getStyle()}>
            {showNavFirst()}
            {showNavBarSecond()}
            {showNavBarThird()}
            <div style={{ minHeight: '60vh' }}>{children}</div>
            {oCategories && showFooter()}
            </div>
        </Fragment>
    );
};

export default Layout;
