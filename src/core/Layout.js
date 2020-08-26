import React, { Fragment, useEffect, useState } from "react";
import { signin, authenticateUser, isAuthenticated } from "../auth/authUtil";
import { Redirect } from "react-router-dom";
import {
  Navbar,
  Nav,
  Badge,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Col,
  Row,
  InputGroup,
  DropdownButton,
  Dropdown,
  Container,
  Image
} from "react-bootstrap";
import { getTotalCount } from "./client/cartHelpers";
import { Link } from "react-router-dom";
import { IMAGE_API } from "../config";
import { getAllCategories } from "../core/admin/categories/categoriesApi";
import MessengerChat from '../user/MessengerChat';

const Layout = ({
  loader = "none",
  run = undefined,
  oGetCategory = () => {},
  children,
  searchPlaceHolder = "Search here",
  messenger = true
}) => {
  const { user } = isAuthenticated();
  const [iCount, setCount] = useState(0);
  const [sSearchQuery, setSearchQuery] = useState("");
  const [mLoader, setLoader] = useState(loader);
  const [oCategories, setCategories] = useState(false);
  const [oCategoriesFooter, spliceCategories] = useState(false);
  const [sPlaceHolder, setPlaceHolder] = useState(searchPlaceHolder);
  const searchUrl = "/search/result/" + sSearchQuery;

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

  const handleQueryChange = oEvent => {
    setSearchQuery(oEvent.target.value.trim());
  };

  const handleSearchClick = oEvent => {
    window.location.replace(searchUrl);
  };

  const handleSearchboxClick = oEvent => {
    setPlaceHolder("");
  };

  const splice = aCategories => {
    if (aCategories.length > 10) {
      var aTempCatA = JSON.parse(JSON.stringify(aCategories));
      var aTempCatB = JSON.parse(JSON.stringify(aCategories));
      var aFirstHalf = aTempCatA.splice(0, aTempCatA.length / 2);
      var aSecondHalf = aTempCatB.splice(
        aTempCatB.length / 2,
        aTempCatB.length
      );
      return { aFirst: aFirstHalf, aSecond: aSecondHalf };
    }
    return aCategories;
  };

  const showBadge = () => {
    return (
      <Badge variant="dark" style={{ color: "red" }}>
        {iCount}
      </Badge>
    );
  };

  const getStyle = () => {
    var oStyle = {
      backgroundColor: "white"
    }
    if (window.location.pathname === "/" || window.location.pathname === "/about-us") {
      oStyle = {
        backgroundImage: `url(${IMAGE_API}/images/others/background.png)`
      };
    }
    oStyle.fontFamily = 'Oswald, sans-serif';
    return oStyle;
  };

  const getFontColor = () => {
    // if (window.location.pathname === "/" || window.location.pathname === "/about-us") {
    //   return {
    //     color: 'white',
    //     textDecoration: 'none'
    //   };
    // }
    return { color: "white", textDecoration: 'none' };
  };

  const showRegisterLogout = () => {
    if (user) {
      return (
        <Fragment>
          <a href="/signout" className="text-white">
            <i className="fas fa-sign-out-alt" style={{ color: "#ffc044" }}></i>{" "}Logout
          </a>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <a
          href="/signup"
          className="text-white"
          style={{
            backgroundImage: `url(${IMAGE_API}/images/others/register.png)`,
            backgroundPosition: "6px -2px",
            backgroundSize: "20px",
            backgroundRepeat: "no-repeat",
            height: "22px",
            width: "24px",
            cursor: "pointer",
            paddingLeft: "25px"
          }}
        >
          Register
        </a>
      </Fragment>
    );
  }

  const showLoginIcons = () => {
    var sHref = '/login';
    var sLogin = 'Login';
    if (user) {
      sHref = `/profile/${user._id}`;
      sLogin = 'My Profile'
    }
    return (
      <Fragment>
        <Col xs={12} sm={6} className="mt-2 mb-2 ellipsis login-nav">
          <a href={sHref} className="text-white mr-3">
            <i className="fas fa-user" style={{ color: "#ffc044" }}></i> {sLogin}
          </a>
          {showRegisterLogout()}
        </Col>
      </Fragment>
    );
  }

  const showUserGuest = () => {
    return (
      <Fragment>
        <div className="container" style={{ display: "flex", flexWrap: "wrap"}}>
          <Col xs={12} sm={6} className="mt-2 mb-2 ellipsis pl-0 pr-0 info-nav">
            <span className="text-white mr-3">
              <i className="far fa-envelope" style={{ color: "#ffc044" }}></i>{" "}
              admin@titan.com
            </span>
            <span id="top" className="text-white">
              <i className="fas fa-phone-alt" style={{ color: "#ffc044" }}></i>{" "}
              028-00000
            </span>
          </Col>
          {showLoginIcons()}
        </div>
      </Fragment>
    );
  };

  const showNavCategories = () => {
    if (oCategories) {
      if (oCategories.length > 10) {
        var aTempCategory = JSON.parse(JSON.stringify(oCategories));
        var aCategorySplit = aTempCategory.splice(0, 10);
        aCategorySplit.push({ name: "Load More...", _id: "list/show" });
        return (
          <Dropdown.Menu className="mb-1">
            {aCategorySplit.map((oCategory, iIndex) => {
              return (
                <Dropdown.Item
                  key={iIndex}
                  href={`/categories/${oCategory._id}`}
                >
                  {oCategory.name}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        );
      }
      return (
        <Dropdown.Menu>
          {oCategories.map((oCategory, iIndex) => {
            return (
              <Dropdown.Item key={iIndex} href={`/categories/${oCategory._id}`}>
                {oCategory.name}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      );
    }
  };

  const showFooterCategories = () => {
    if (oCategoriesFooter && oCategoriesFooter["aFirst"] !== undefined) {
      return (
        <Fragment>
          <Col className="text-left">
            <p style={{ color: "#ffc044" }}>CATEGORIES</p>
            {oCategoriesFooter["aFirst"].map((oCategory, iIndex) => {
              return (
                <p className="mb-0" key={iIndex}>
                  <a
                    href={`/categories/${oCategory._id}`}
                    className="text-white text-uppercase"
                  >
                    {oCategory.name}
                  </a>
                </p>
              );
            })}
          </Col>
          <Col className="text-left" style={{ paddingTop: "2.5rem" }}>
            {oCategoriesFooter["aSecond"].map((oCategory, iIndex) => {
              return (
                <p className="mb-0" key={iIndex}>
                  <a
                    href={`/categories/${oCategory._id}`}
                    className="text-white text-uppercase"
                  >
                    {oCategory.name}
                  </a>
                </p>
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
            <p style={{ color: "#ffc044" }}>CATEGORIES</p>
            {oCategoriesFooter.map((oCategory, iIndex) => {
              return (
                <p className="mb-0" key={iIndex}>
                  <a
                    href={`/categories/${oCategory._id}`}
                    className="text-white text-uppercase"
                  >
                    {oCategory.name}
                  </a>
                </p>
              );
            })}
          </Col>
        </Fragment>
      );
    }
  };

  const showNavFirst = () => {
    return (
      <Nav
        style={{
          backgroundColor: "#4c4847",
          marginRight: "auto",
          marginLeft: "auto"
        }}
        activeKey="/home"
      >
        {showUserGuest()}
      </Nav>
    );
  };

  const showNavBarSecond = () => {
    return (
      <Navbar
        expand="lg"
        style={{ borderBottom: "8px solid #ffc044", backgroundColor: "black" }}
      >
        <Container>
          <Navbar.Brand href="/" className="ml-1">
            <Image
              src={`${IMAGE_API}/images/others/titan-supertools-logo.png`}
              alt="Titan Super Tools"
              className="brand-nav"
              style={{ width: "15.5rem", height: "auto" }}
            ></Image>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-dark" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Col lg={3}>
                <Dropdown className="collapse-dropdown">
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    className="rounded-pill categories-nav"
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #ced4da",
                      color: "black",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      width: "100%"
                    }}
                  >
                    Categories
                  </Dropdown.Toggle>
                  {showNavCategories()}
                </Dropdown>
              </Col>
              <Col lg={9}>
                <InputGroup className="search-nav">
                  <FormControl
                    placeholder={sPlaceHolder}
                    aria-label="Search here"
                    aria-describedby="basic-addon2"
                    style={{
                      borderTopLeftRadius: "50rem",
                      borderBottomLeftRadius: "50rem"
                    }}
                    onChange={handleQueryChange}
                    onClick={handleSearchboxClick}
                    onKeyPress={handleEnterSearch}
                  />
                  <InputGroup.Append>
                    <Button
                      style={{
                        borderTopRightRadius: "50rem",
                        borderBottomRightRadius: "50rem",
                        backgroundColor: "#ffc044",
                        border: "1px solid #ffc044",
                        height: "2.4rem"
                      }}
                      className="text-white"
                      onClick={handleSearchClick}
                    >
                      Search
                    </Button>
                  </InputGroup.Append>
                  <a href="/checkout" className="cart-nav" style={{ textDecoration: "none"}}>
                    <i
                      className="fas fa-shopping-cart mt-3 ml-3"
                      style={{ color: "white" }}
                    ></i>
                    {showBadge()}
                    <p className="text-white">Your Cart</p>
                </a>
                </InputGroup>
                
              </Col>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };
  const showNavBarThird = () => {
    return (
      <Fragment>
        <Container style={{backgroundColor: "#4c4847"}} fluid>
          <Nav activeKey="/home" className="container" style={{fontSize : "1.25rem"}}>
            <Nav.Item>
              <Nav.Link style={getFontColor()} href="/">
                <span>
                  <strong>Home</strong>
                </span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                style={getFontColor()}
                href="/search/result"
              >
                <span>
                  <strong>Shop</strong>
                </span>
              </Nav.Link>
            </Nav.Item>
            {user && <Nav.Item>
              <Nav.Link
                style={getFontColor()}
                href={user && `/profile/${user._id}`}
              >
                <span>
                  <strong>Your Order</strong>
                </span>
              </Nav.Link>
            </Nav.Item>}
            <Nav.Item>
              <Nav.Link
                style={getFontColor()}
                href={`/bundles`}
              >
                <span>
                  <strong>Bundle Deals</strong>
                </span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
        <div style={{ borderBottom: "8px solid #ffc044", backgroundColor: "black" }}>
        </div>
      </Fragment>
    );
  };

  const showFooter = () => {
    return (
      oCategories && (
        <footer
          className="text-center p-5 text-white"
          style={{ backgroundColor: "black" }}
        >
          <Container>
            <Row className="border-bottom pb-5 mb-1">
              <Col xs={12} md={12} lg={4} sm={12} className="text-left">
                <p style={{ color: "#ffc044" }}>NAVIGATION</p>
                <a href="/" className="text-white">
                  HOME
                </a>
                <br></br>
                <a href="/about-us" className="text-white">
                  ABOUT US
                </a>
                <br></br>
                <a href="/" className="text-white">
                  SHOP
                </a>
                <br></br>
                <a href="/" className="text-white">
                  PRODUCTS
                </a>
                <br></br>
                <a href="/contact-us" className="text-white">
                  CONTACT US
                </a>
                <br></br>
              </Col>
              {showFooterCategories()}
              <Col xs={12} md={12} lg={3} sm={12} className="text-left">
                <p style={{ color: "#ffc044" }}>ABOUT US</p>
                <p>
                  Titan Supertools Hardware is a company that carries multiple
                  brands for the assortment of the clients to choose from at an
                  affordable price
                </p>

                <p style={{ color: "#ffc044" }}>STORE INFORMATION</p>
                <p>273 Rizal Avenue Extension, Caloocan City</p>
                <p>
                  <i
                    className="fas fa-phone-alt"
                    style={{ color: "#ffc044" }}
                  ></i>{" "}
                  (02)285-7337 0916-2927228
                </p>
                <p style={{wordWrap : "break-word"}}>
                  <i
                    className="fas fa-paper-plane"
                    style={{ color: "#ffc044" }}
                  ></i>{" "}
                  sales.tsthardware@gmail.com
                </p>
              </Col>
            </Row>
            <div className="float-left">© 2020 Titan. All rights reserved</div>
            <div className="float-right">
              <a href="/" style={{ color: "white" }}>
                follow us<i className="ml-2 fab fa-facebook-square"></i>
              </a>
            </div>
            <div className="mt-5">
              <a href="#top" className="titan-link" style={{textDecoration: 'none'}}>
                Back to top
              </a>
            </div>
          </Container>
        </footer>
      )
    );
  };

  const showLoader = () => {
    return (
      <Fragment>
        <div
          style={{
            position: "absolute",
            zIndex: 99999,
            backgroundColor: "rgba(99, 99, 99, 0.6)",
            width: "100%",
            height: "100%",
            display: mLoader
          }}
        >
          <div
            style={{
              width: "20%",
              position: "fixed",
              textAlign: "center",
              height: "10%",
              left: "40%",
              top: "45%"
            }}
          >
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
  };

  const handleEnterSearch = oEvent => {
    oEvent.persist();
    if (oEvent.key === 'Enter') {
      return handleSearchClick();
    }
  };

  return (
    <Fragment>
      {showLoader()}
      <div style={getStyle()}>
        {showNavFirst()}
        {showNavBarSecond()}
        {showNavBarThird()}
        <div style={{ minHeight: "60vh" }} className="mt-5">
          {children}
        </div>
        {oCategories && showFooter()}
        {/* {messenger === true && <MessengerChat />} */}
      </div>
    </Fragment>
  );
};

export default Layout;
