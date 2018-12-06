import React, { Component } from "react";
import './ShoppingList.css';
import withAuth from '../../helpers/withAuth';

class ShoppingList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groceries: []
    };
  }

  componentDidMount() {
    let groceries = sessionStorage.getItem("ingredients");

    if (groceries) {
      groceries = JSON.parse(groceries);
      this.setState({
        groceries: groceries
      });
    }
  }

  render() {
    return (
      <ul className="shopping--list">
        {this.state.groceries.length ?
          this.state.groceries.map((grocery, i) => {
         return <li key={i} className="">{grocery}</li>
        }) : 
        <p>You have no items in your shopping list yet...</p>
        }
      </ul>
    );
  }
}

export default withAuth(ShoppingList);
