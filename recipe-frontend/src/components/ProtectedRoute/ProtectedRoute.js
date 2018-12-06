import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom';
import { isLoggedIn } from '../../helpers/isLoggedIn';
// import AuthHelperMethods from '../../components/AuthHelperMethods/AuthHelperMethods';

// const Auth = new AuthHelperMethods;

const PrivateRoute = ({ component: Component, ...rest }) => 
  <Route
    {...rest}
    render={props =>
      isLoggedIn()
        ? <Component {...props} />
        : <Redirect push
            to={{
              pathname: 'login'
            }}
          />}
  />;

export default withRouter(PrivateRoute);