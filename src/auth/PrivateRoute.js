import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './authUtil';

const PrivateRoute = ({ props, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
// {
//   const mAuth = isAuthenticated();
//   const checkRoute = props => {
//     if (mAuth) {
//       if (mAuth.user.role === 1) {
//         // authenticated but admin role
//         return (
//           <Redirect to={{ pathname: '/', state: { from: props.location } }} />
//         );
//       }
//       // authenticated but not admin role
//       return <Component {...props} />;
//     }
//     return (
//       <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
//     );
//   };
//   return <Route {...rest} render={checkRoute} />;
// };
export default PrivateRoute;
