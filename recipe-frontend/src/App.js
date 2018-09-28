import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import {
  Header,
  Home,
  Login,
  Register,
  PageNotFound,
  ListForm,
  ListsUser,
  ListDetails
} from "./components";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import ShoppingList from "./components/ShoppingList/ShoppingList";
import PrivateRoute from "./components/ProtectedRoute/ProtectedRoute";

class App extends Component {
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
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
