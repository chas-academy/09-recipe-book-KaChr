import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../../helpers/isLoggedIn';

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

export default PrivateRoute;
