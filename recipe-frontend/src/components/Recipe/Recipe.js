import React, { Component } from 'react'

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
        console.log(res);
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
    let recipeContent;
    console.log(this.props.recipeId)

    if (recipe) {
      recipeContent = (
        <div>
          <h4>{recipe.name}</h4>
          <img src={recipe.images[0].hostedMediumUrl} alt={recipe.name} />
          <button type="button" className="btn btn-danger">Remove recipe from list</button>
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
