import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div>
          <form>
            <div className="form-group">
              <input type="email" className="form-control" placeholder="Email"/>
            </div>
            <div className="form-group">
              <input type="password" className="form-control"  placeholder="Password"/>
            </div>
            <button type="submit" className="btn btn-primary">Sign in</button>
          </form>
      </div>
    );
  }
}

export default Login;