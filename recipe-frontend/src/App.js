import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import { Header, Home, Login, Register, PageNotFound } from './components';
import RecipeList from './components/RecipeList/RecipeList';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';

import { isLoggedIn } from "./helpers/isLoggedIn";
import PrivateRoute from "./components/ProtectedRoute/ProtectedRoute";

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
      <BrowserRouter>
        <div className="App-container">
          <Header />
          <div className="App-main">
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/lists" component={RecipeList} />
              <Route path="/recipe/:id" component={RecipeDetails} />

              {/*
              <Route path="/lists/:id" component={Lists} />
              console.log( ) 
              */}
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
