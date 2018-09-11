import React, { Component } from 'react';

class RecipeDetails extends Component {
  state = {
    activeRecipe: null
  };

  componentDidMount () {
      let yummlyAppKey = process.env.REACT_APP_YUMMLY_APP_KEY;
      let yummlyAppId = process.env.REACT_APP_YUMMLY_APP_ID;

      const recipeId = this.props.match.params.id;
    
      fetch(`http://api.yummly.com/v1/api/recipe/${recipeId}?_app_id=${yummlyAppId}&_app_key=${yummlyAppKey}`)        
        .then(res => res.json())
        .then(res => {
          console.log(res);
          this.setState({
            activeRecipe: res
          });
        })
        .catch(err => {
          console.error(err);
        });
      
  }


  render() {
    const recipeDetail = this.state.activeRecipe;

    return (
      <div className="container">
        <div className="active-recipe">
        { recipeDetail ? (
          <React.Fragment>
            <h2>{recipeDetail.name}</h2>
            <img src={recipeDetail.images[0].hostedLargeUrl} alt={recipeDetail.name} />
            <h5>Prepp time: {recipeDetail.totalTime}</h5>
            <h6>{recipeDetail.numberOfServings} Servings</h6>
            <h4>Ingrediens:</h4>
            <ul>
              {
                recipeDetail.ingredientLines && recipeDetail.ingredientLines.length ? 
                recipeDetail.ingredientLines.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))
                :
                ''
              }
            </ul>
            <button onClick={() => {this.props.history.goBack()}} >GO BACK</button>
            </React.Fragment>) : (<p>Loading...</p>) }
          </div>
      </div>
    );
  }
}

export default RecipeDetails;