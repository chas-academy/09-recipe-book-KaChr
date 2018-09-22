import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isLoggedIn } from '../../helpers/isLoggedIn';

import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: isLoggedIn()
    };
  }

  componentWillReceiveProps() {
    console.log('header here'); 
  }

  handleLogout() {
    sessionStorage.clear();
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="App-header">
        <h1 className="App-title">Recipe book</h1>
        {this.state.isLoggedIn ? (
          <Link to="/#" onClick={this.handleLogout}>Log out</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    );
  }
}

export default Header;
