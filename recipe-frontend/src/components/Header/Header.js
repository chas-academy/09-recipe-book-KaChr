import React, { Component } from "react";
import { Link } from "react-router-dom";
// TODO 
// import { isLoggedIn } from "../../helpers/isLoggedIn";
import AuthHelperMethods from '../../components/AuthHelperMethods/AuthHelperMethods';
// import { getUser } from "../../helpers/getUser"; 

import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: null
    };
    // this.onClick = this-this._handleLogout.bind(this);
  }

  Auth = new AuthHelperMethods();

  componentDidMount() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      this.setState({ userId: user.data.id });
    }
  }

  _handleLogout() {
    // this.Auth.logout();
    sessionStorage.clear();
    
    // debugger;
    this.props.history.replace('/login');
    // debugger;
  }

  // handleLogout() {
  //   sessionStorage.clear();
  //   this.props.history.push("/login");
  // }

  render() {
    return (
      <div className="App-header">
        <h1 className="App-title">
          <Link to="/">Recipe book</Link>
        </h1>

        {this.Auth.isLoggedIn() ? (
          <div className="navbar nav--link">
            <Link className="navbar-item" to="/#" onClick={this._handleLogout}>
              Log out
            </Link>
            <Link
              className="navbar-item"
              to={`/user/${this.state.userId}/lists`}
            >
              My lists
            </Link>
            <Link className="navbar-item" to="/shopping-list">
              Groceries
            </Link>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    );
  }
}

export default Header;
