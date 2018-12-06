import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from './App';
import {
  Header,
  Home,
  Login,
  Register,
  RecipeDetails,
  ShoppingList,
  PageNotFound,
  ListForm,
  ListsUser,
  ListDetails
} from "./components";

import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <div className="App-container">
      <Header />
      <div className="App-main">
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/Home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/user/:userId/lists" component={ListsUser} />
          <Route exact path="/list" component={ListForm} />
          <Route
            exact
            path="/user/:userId/lists/:recipeListId"
            component={ListDetails}
          />
          <Route path="/recipe/:id" component={RecipeDetails} />
          <Route path="/shopping-list" component={ShoppingList} />

          <Route component={PageNotFound} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>, document.getElementById('root'));