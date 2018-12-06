import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './App.css';

//TODO

import AuthHelperMethods from './components/AuthHelperMethods/AuthHelperMethods';

import withAuth from './helpers/withAuth';

class App extends Component {


  Auth = new AuthHelperMethods();

  render() {

    console.log("Rendering Appjs!")
    return (
      
      <div className="App">
        {
           this.props.history.location.pathname === "/" ? <Redirect to="/Home" /> : null
        }
      </div>
    );
  }
}

export default withAuth(App);