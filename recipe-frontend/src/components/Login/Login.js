import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const user = { 
      email: this.state.email,
      password: this.state.password
    };

    if(this.state.email && this.state.password){
      fetch("/auth/login", {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then((result) => {
        if (result.data.access_token) {
          sessionStorage.setItem('credentials', JSON.stringify(result.data));
          this.props.history.push('/');
        }
      })
    }
  }


  onChange(e) {
    e.preventDefault();
    
    this.setState({
      [e.target.name]:e.target.value
    });

  }

  render() {
    return (
      <div>
        <div>
          <form name="login" id="login" onSubmit={this.onSubmit}>
            <div className="form-group">
            <label>Email</label>
              <input type="email" className="form-control" name="email" placeholder="Email" onChange={this.onChange}/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.onChange}/>
            </div>
            <button type="submit" value="login" className="btn btn-primary">Login</button>
          </form>
          <Link to="/register">Sign up</Link>
        </div>
      </div>
    );
  }
}

export default Login;