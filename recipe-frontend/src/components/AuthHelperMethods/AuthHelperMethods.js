export default class AuthHelperMethods {

  // TODO 
  fetch = (email, password) => {
    // const user = { 
    //   email: this.state.email,
    //   password: this.state.password
    // };

    // if(this.state.email && this.state.password){
     return fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password
        })

        // body: JSON.stringify(user)
      })
      .then(res => {
        if (res.status >= 400 && res.status < 600) {
          throw new Error("Bad response from server");
        }
        return res.json()
      })
      .then((result) => {
        if (result.data.access_token) {
          sessionStorage.setItem('credentials', JSON.stringify(result.data));
          this.getUser();
          // this.props.history.push('/Home');
        }
      })
      .catch(err => {
        this.setState({
          errorIsActive: true
        })
      })
    // }
  }

  getUser = async () => {
    let user = JSON.parse(sessionStorage.getItem('user'));
    let credentials = JSON.parse(sessionStorage.getItem('credentials'));
  
    if (!user) {
      user = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/user`, {
        method: "GET",
        credentials: 'include',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${credentials.access_token}`
        }
      })
      .then(res => res.json())
      .then(res => sessionStorage.setItem('user', JSON.stringify(res)))
      .catch(err => console.error(err));
    }
  
    return user;
  }

  isLoggedIn = () => {
    const credentials = JSON.parse(sessionStorage.getItem('credentials'));
  
    return credentials ? true : false;
  }

  logout = () => {
    sessionStorage.clear();
  }
}