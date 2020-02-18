import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./authUtil";

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() &&
      (isAuthenticated().user.role === 1 ||
        isAuthenticated().user.role === 5) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default AdminRoute;
