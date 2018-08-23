import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import { Header, Home, Login, Register, PageNotFound } from './components';
import RecipeList from './components/RecipeList/RecipeList';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/lists" component={RecipeList} />

            {/*
            <Route path="/lists/:id" component={Lists} />
            console.log( ) 
            */}
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
