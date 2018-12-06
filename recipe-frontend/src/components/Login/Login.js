import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { errorHandler } from "../../helpers/errorHandler";
// import { getUser } from "../../helpers/getUser";
// import { isLoggedIn } from '../../helpers/isLoggedIn';

// TODO 
import AuthHelperMethods from '../../components/AuthHelperMethods/AuthHelperMethods';

class Login extends Component {

  Auth = new AuthHelperMethods();

  constructor (props) {
    super(props );
    this.state = {
      email: '',
      password: '',
      errorIsActive: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    if (this.Auth.isLoggedIn()) {
    // if(isLoggedIn()) {
      this.props.history.replace('/Home');
    }
  }


  //TODO 
  onSubmit(e) {

    e.preventDefault();

    this.Auth.fetch(this.state.email, this.state.password)
    .then(res => {
        if (res === false) {
            return alert("Sorry those credentials don't exist!");
        }
        this.props.history.replace('/Home');
    })
    .catch(err => {
        alert(err);
    })

    // const user = { 
    //   email: this.state.email,
    //   password: this.state.password
    // };

    // if(this.state.email && this.state.password){
    //   fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
    //     method: 'POST',
    //     headers: {
    //       "Accept": "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(user)
    //   })
    //   .then(res => {
    //     if (res.status >= 400 && res.status < 600) {
    //       throw new Error("Bad response from server");
    //     }
    //     return res.json()
    //   })
    //   .then((result) => {
    //     if (result.data.access_token) {
    //       sessionStorage.setItem('credentials', JSON.stringify(result.data));
    //       getUser();
    //       this.props.history.push('/');
    //     }
    //   })
    //   .catch(err => {
    //     this.setState({
    //       errorIsActive: true
    //     })
    //   })
    // }
  }


  _onChange(e) {
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
              <input type="email" className="form-control" name="email" placeholder="Email" onChange={this._onChange}/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" name="password" placeholder="Password" onChange={this._onChange}/>
            </div>
            {this.state.errorIsActive ? errorHandler('Invalid username or password. Please try again!') : ''}
            <button type="submit" value="login" className="btn btn-primary button--detail">Login</button>
          </form>
          <Link to="/register">Sign up</Link>
        </div>
      </div>
    );
  }
}

export default Login;