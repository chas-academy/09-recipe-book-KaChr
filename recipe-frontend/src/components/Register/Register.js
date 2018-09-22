import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    if (this.state.name && this.state.email && this.state.password) {
      fetch("/auth/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      .catch(err => console.log(err))
      .then(user => {
        this.props.history.push("/");
      })
    }
  }

  onChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log("heej");
  }

  render() {
    // if (sessionStorage.getItem('user')){
    //   return (<Redirect to={'/'}/>)
    // }

    return (
      <div>
        <form name="register-form" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="name"
              className="form-control"
              name="name"
              placeholder="Name"
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              onChange={this.onChange}
            />
          </div>
          <button type="submit" value="signup" className="btn btn-primary">
            Sign up
          </button>
        </form>
        <Link to="/">Cancel</Link>
      </div>
    );
  }
}

export default Register;
