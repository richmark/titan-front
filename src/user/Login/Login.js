import React, { useState, Fragment } from "react";
import { Redirect, Link } from "react-router-dom";
import Layout from "../../core/Layout";
import { sendSignin, resendTokenEmail } from "../../core/client/clientApi";
import { authenticate, isAuthenticated } from "../../auth/authUtil";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import BasicFormInput from "../format/BasicFormInput";
import BasicAlert from "../format/BasicAlert";
import { oValidatorLibrary } from "../../libraries/validatorLibrary";
import './Login.css';

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false
  });
  const [sendToken, setSendToken] = useState({
    email: "",
    resend: false
  });

  const [verify, setVerify] = useState(false);

  const [danger, setDanger] = useState({
    danger_email: "",
    danger_password: ""
  });

  const { danger_email, danger_password } = danger;

  const { user } = isAuthenticated();

  const [message, setMessage] = useState("");

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { email, password, error, redirectToReferrer } = values;

  const sendSubmit = oEvent => {
    var oValidator = oValidatorLibrary();
    setMessage("");
    setDanger({
      danger_email: "",
      danger_password: ""
    });
    oValidator.message("email", values.email, "required");
    oValidator.message("password", values.password, "required");
    if (oValidator.allValid()) {
      sendSignin(values).then(oData => {
        if (oData.error) {
          setValues({ ...values, error: oData.error });
          setMessage(oData.error);
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
      return;
    }
    var oError = oValidator.getErrorMessages();
    var sMessage = setErrorMessage(oError);
    setMessage(sMessage);
    setDanger({
      danger_email: setErrorBorder(oError.email),
      danger_password: setErrorBorder(oError.password)
    });
  };

  const setErrorBorder = sName => {
    return sName === null ? "" : "border-danger";
  };

  const setErrorMessage = oError => {
    var aMessage = [];
    Object.keys(oError).map(mKey => {
      aMessage.push(typeof oError[mKey] === "object" ? "" : oError[mKey]);
    });
    return aMessage;
  };

  const showErrorMessage = () => {
    if (message !== "") {
      return <Fragment>{BasicAlert("danger", message)}</Fragment>;
    }
  };

  const showVerificationMessage = () => {
    if (verify !== false) {
      return <div className="alert alert-info">{verify}</div>;
    }
  };

  const showButtons = () => {
    var iOffset = 5;
    var ResendButton = () => {};
    if (sendToken.resend) {
      iOffset = 3;
      ResendButton = () => {
        return (
          <Button
            variant="info"
            className="mx-2"
            onClick={resendToken(sendToken.email)}
          >
            Resend Token
          </Button>
        );
      };
    }
    return (
      <Col sm={{ offset: iOffset }}>
        <Row>
          <Button
            variant="dark"
            style={{ backgroundColor: "black" }}
            className="px-4"
            onClick={sendSubmit}
          >
            Login
          </Button>
          {ResendButton()}
        </Row>
      </Col>
    );
  };

  const resendToken = sEmail => oEvent => {
    oEvent.preventDefault();
    setMessage("");
    setSendToken({
      ...sendToken,
      resend: false
    });
    setValues({
      ...values,
      error: ""
    });
    resendTokenEmail({ email: sEmail }).then(oData => {
      setVerify(oData.message);
    });
  };

  const bootstrapLogin = () => {
    const aFormLabel = [3, 0];
    const iFormLength = 8;
    return (
      <Container className="px-3 py-2 login">
        <Row className="rowParent">
          <Col className="rowCol" sm={{ span: 6, offset: 3 }}>
            <Card
              className="mx-4 pt-2 pb-4 mt-2"
              style={{ backgroundColor: "#ffc044" }}
            >
              <Card.Title
                className="text-center p-3 mt-3"
                style={{ fontSize: "27px", fontFamily: "Oswald, sans-serif", fontWeight: "bold"}}
              >
                LOG IN
              </Card.Title>
              <Card.Body style={{ fontFamily: "Roboto Condensed, sans-serif" }}>
                {BasicFormInput(
                  "Email",
                  "text",
                  "formEmail",
                  handleChange("email"),
                  aFormLabel,
                  iFormLength,
                  danger_email
                )}
                {BasicFormInput(
                  "Password",
                  "password",
                  "formPassword",
                  handleChange("password"),
                  aFormLabel,
                  iFormLength,
                  danger_password
                )}
                {showErrorMessage()}
                <Row>
                  <Col sm={{ span: 6, offset: 3 }}>
                    <Link style={{ color: "black" }} to="/forgotPassword">
                      Forgot password
                    </Link>
                  </Col>
                </Row>
                <Row className="my-3">{showButtons()}</Row>
                <Row>
                  <Col sm={{ span: 7, offset: 3 }}>
                    <Link style={{ color: "black" }} to="/signup">
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
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/products" />;
      }
      if (user && user.role === 5) {
        return <Redirect to="/admin/wholesalers" />;
      }
      if (user.verified_admin === false && user.role > 2) {
        return <Redirect to="/upload" />;
      }
      return <Redirect to="/" />;
    }
  };

  const verifyToken = () => {
    if (localStorage["jwt"] !== undefined) {
      var oUser = JSON.parse(localStorage["jwt"])["user"];
      if (oUser["role"] === 1) {
        return <Redirect to="/admin/dashboard" />;
      }
      return <Redirect to="/" />;
    }
  };

  const doLoginEnter = oEvent => {
    oEvent.persist();
    if (oEvent.key === 'Enter') {
      return sendSubmit();
    }
  };

  return (
    <Layout title="Login" description="Login here">
      {verifyToken()}
      {showVerificationMessage()}
      <form onKeyPress={doLoginEnter}>{bootstrapLogin()}</form>
      {redirectUser()}
    </Layout>
  );
};

export default Login;
