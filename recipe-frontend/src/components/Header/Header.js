import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../../helpers/isLoggedIn";

import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: isLoggedIn(),
      userId: null
    };
  }

  componentDidMount() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      this.setState({ userId: user.data.id });
    }
  }

  componentWillReceiveProps() {
    console.log("header here");
  }

  handleLogout() {
    sessionStorage.clear();
    this.props.history.push("/login");
  }

  render() {
    return (
      <div className="App-header">
        <h1 className="App-title">
          <Link to="/">Recipe book</Link>
        </h1>
        {this.state.isLoggedIn && this.state.userId ? (
          <div className="navbar nav--link">
            <Link className="navbar-item" to="/#" onClick={this.handleLogout}>
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
