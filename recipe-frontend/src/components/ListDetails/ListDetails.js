import React, { Component } from 'react';
import Recipe from '../Recipe/Recipe';
import './ListDetails.css';

class ListDetails extends Component {
  constructor (props) {
    super(props);

    this.state = {
      list: null,
      recipes: []
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, recipeId) {  
    const credentials = JSON.parse(sessionStorage.getItem("credentials"));

    return fetch(`${process.env.REACT_APP_API_BASE_URL}/list/${this.state.list.id}`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${credentials.access_token}`
      }, body: JSON.stringify({
        recipe_id: recipeId
      })
    })
      .then(res => res.json())
      .then(res => {
        let recipes = this.state.recipes.filter(recipe => recipe.props.recipeId !== recipeId);

        return this.setState({
          recipes: recipes
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  fetchRecipe(recipeId) {
    let yummlyAppKey = process.env.REACT_APP_YUMMLY_APP_KEY;
    let yummlyAppId = process.env.REACT_APP_YUMMLY_APP_ID;
    
    return fetch(`http://api.yummly.com/v1/api/recipe/${recipeId}?_app_id=${yummlyAppId}&_app_key=${yummlyAppKey}`)
      .then(res => res.json())
      .then(res => res)
      .catch(err => {
        console.error(err);
      });
  }

  async componentDidMount() {
    const credentials = JSON.parse(sessionStorage.getItem("credentials"));

    fetch(`${process.env.REACT_APP_API_BASE_URL}/user/${this.props.match.params.userId}/lists/${this.props.match.params.recipeListId}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${credentials.access_token}`
      }
    })
    .then(res => res.json())
    .then(async (res) => {
      let yummlyRecipes = res.data.recipes.map((recipeId, i) => {
        return <Recipe recipeId={recipeId} key={i} handleClick={this.handleClick} />
      });

      return this.setState({
        list: res.data,
        recipes: yummlyRecipes
      });

     })
    .catch(err => console.log(err))
  }

  render() {
    let view = "";
    if (this.state.list && this.state.recipes.length > 0) {
      view = (
        <div className="user--list">
          <h1>{this.state.list.title}</h1>
          <ul>
            {this.state.recipes}
          </ul>
        </div>
      )
    } else {
      view = (
        <h1>Loading...</h1>
      );
    }
    return (
      <React.Fragment>
        {view}
      </React.Fragment>
    )
  }
}

export default ListDetails;