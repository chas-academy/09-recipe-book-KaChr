import React, { Component } from 'react';

class Register extends Component {
  render() {
    return (
      <div>
        <form>
            <div className="form-group">
              <input type="name" className="form-control" placeholder="Name"/>
            </div>
            <div className="form-group">
              <input type="email" className="form-control" placeholder="Email"/>
            </div>
            <div className="form-group">
              <input type="password" className="form-control"  placeholder="Password"/>
            </div>
            <div className="form-group">
              <input type="repeat-password" className="form-control"  placeholder="Repeat password"/>
            </div>
            <button type="submit" className="btn btn-primary">Sign up</button>
          </form>
      </div>
    );
  }
}

export default Register;