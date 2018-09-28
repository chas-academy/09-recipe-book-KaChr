import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Recipe.css";


export default class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: null
    }

    this.fetchRecipe = this.fetchRecipe.bind(this);
  }

  fetchRecipe(recipeId) {
    let yummlyAppKey = process.env.REACT_APP_YUMMLY_APP_KEY;
    let yummlyAppId = process.env.REACT_APP_YUMMLY_APP_ID;
    
    return fetch(`http://api.yummly.com/v1/api/recipe/${recipeId}?_app_id=${yummlyAppId}&_app_key=${yummlyAppKey}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          recipe: res
        });
      })
      .catch(err => {
        console.error(err);
      });

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.recipeId !== this.props.recipeId) {
      this.fetchRecipe(this.props.recipeId)
    }
  }

  componentDidMount() {
    this.fetchRecipe(this.props.recipeId)
  }

  render() {
    const { recipe } = this.state;
    const { handleClick } = this.props;
    let recipeContent;
    
    if (recipe) {
      recipeContent = (
        <div>
          <Link to={{ pathname: `/recipe/${recipe.id}`, state: { recipe: recipe.recipeName } }}>
          <h4>{recipe.name}</h4>
          <img src={recipe.images[0].hostedMediumUrl} alt={recipe.name} className="recipe-img" />
          </Link>

          <button type="button" className="btn btn-danger button--detail" onClick={(e) => { handleClick(e, recipe.id) }}>Remove recipe from list</button>
        </div>
      );
    } else {
      recipeContent = (
        <h1>Loading...</h1>
      );
    }

    return (
      <div>
        {recipeContent}
      </div>
    )
  }
}
