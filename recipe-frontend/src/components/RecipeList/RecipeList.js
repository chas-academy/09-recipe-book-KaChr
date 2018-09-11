import React, { Component } from 'react';
import Recipe from '../Recipe/Recipe';

class RecipeList extends Component {
  constructor() {
    super();
    this.state = {
      lists: []
    };

    this.handleClick = this.handleClick.bind(this);
  }
  
  componentDidMount() {
    fetch("list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        lists: res.data,
        activeList: res.data[0]
      });
  })
  .catch(error => {
    console.error(error);
  });
}

handleClick(index, clickedList) {

  this.setState({
    activeList: clickedList
  }, () => {
    console.log(this.state)
  })
}

render() {
  const { lists } = this.state;
  
  return (
    <div>
      {lists.map((list, i)=> {
      return <p key={i} onClick={(e, key) => this.handleClick(e, list)} >{list.title}</p>})}   
       
       {this.state.activeList ? this.state.activeList.recipes.map((recipe, i) => {
         return <Recipe recipeId={recipe} key={i} onClick={this.onClick}/>
       }): 'Fetching recipe lists...'}
    </div>
  );
  }
}

export default RecipeList;