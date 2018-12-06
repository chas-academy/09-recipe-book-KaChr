import React, { Component } from 'react';
// import { isLoggedIn } from './isLoggedIn';
import AuthHelperMethods from '../components/AuthHelperMethods/AuthHelperMethods';

export default function withAuth(AuthComponent) {

  const Auth = new AuthHelperMethods();

  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        user: null,
        loaded: false
      };
    }

    // componentWillMount() {
    //   if(!isLoggedIn()) {
    //     // sessionStorage.clear();
    //     this.props.history.push("/login");
    //   }

    componentWillMount() {
      if (!Auth.isLoggedIn()) {

          this.props.history.push('/login');
      }
      else {
          try {
              
              const user = Auth.getUser()
              // console.log("confirmation is:", user);
              this.setState({
                  user: user,
                  loaded: true
              })
          }
          catch (err) {
              console.log(err);
              Auth.logout()
              this.props.history.replace('/login');
          }
      }
    }

    render() {
        if (this.state.loaded === true) {
            if (this.state.user) {
                console.log("confirmed!")
                return (
                    <AuthComponent history={this.props.history} match={this.props.match} user={this.state.user} />
                )
            }
            else {
                console.log("not confirmed!")
                return null
            }
        }
        else {
            return null
        }

    }
  }
}