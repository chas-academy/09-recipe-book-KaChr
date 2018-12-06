import React, { Component } from "react";
import "./RecipeDetails.css";
import { successHandler } from "../../helpers/successHandler";
import withAuth from "../../helpers/withAuth";

class RecipeDetails extends Component {
  constructor() {
    super();
    this.state = {
      activeRecipe: null,
      activeList: [],
      lists: [],
      successIsActive: false,
      currentCount: 5,
      successMessageIntervalId: null
    };

    this.handleListChange = this.handleListChange.bind(this);
  }

  triggerInterval() {
    if (this.state.successMessageIntervalId) {
      clearInterval(this.state.successMessageIntervalId);
    }

    this.successMessageIntervalId = setInterval(this.timer.bind(this), 1000);

    this.setState({
      successMessageIntervalId: this.successMessageIntervalId
    });
  }

  timer() {
    let newCount = this.state.currentCount - 1;
    if (newCount >= 0) { 
      this.setState({ currentCount: newCount, successIsActive: true });
    } else {
      clearInterval(this.state.successMessageIntervalId);
      this.setState({ currentCount: 5, successIsActive: false });
    }
 }

  async componentDidMount() {
    const yummlyAppKey = process.env.REACT_APP_YUMMLY_APP_KEY;
    const yummlyAppId = process.env.REACT_APP_YUMMLY_APP_ID;
  //  TODO 
    const url = process.env.REACT_APP_API_BASE_URL;

    
    const credentials = JSON.parse(sessionStorage.getItem("credentials"));
    const userId = credentials.user.id;

    fetch(`${url}/user/${userId}/lists`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.access_token}`
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          lists: res.data,
          activeList: res.data[res.data.length - 1]
        });
      })
      .catch(error => {
        console.error(error);
      });

    const recipeId = this.props.match.params.id;

    fetch(
      `http://api.yummly.com/v1/api/recipe/${recipeId}?_app_id=${yummlyAppId}&_app_key=${yummlyAppKey}`
    )
      .then(res => res.json())
      .then(res => {
        this.setState({
          activeRecipe: res
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentWillUnmount() {
    clearInterval(this.successMessageIntervalId);
  }
  

  addToList(recipe) {
    const credentials = JSON.parse(sessionStorage.getItem("credentials"));

    fetch(`${process.env.REACT_APP_API_BASE_URL}/list/${this.state.activeList.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.access_token}`
      },
      body: JSON.stringify({
        recipe_id: recipe.id
      })
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          successIsActive: true
        }, () => {
          this.triggerInterval();
        })
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleListChange(e) {
    const title = e.target.selectedOptions[0].text;
    const id = e.target.selectedOptions[0].value;
    return this.setState({
      activeList: {
        title: title,
        id: id
      }
    });
  }

  storeGroceries() {
    let ingredients = [];
    ingredients = this.state.activeRecipe.ingredientLines;

    this.setState({
      successIsActive: true
    }, () => {
      this.triggerInterval();
    });

    return sessionStorage.setItem("ingredients", JSON.stringify(ingredients));
  }

  render() {
    const recipeDetail = this.state.activeRecipe;

    return (
      <div className="container">
        <div className="active-recipe">
          {recipeDetail ? (
            <React.Fragment>
              <div className="cont--detail">
                <h1>{recipeDetail.name}</h1>
                <img
                  className="img--detail"
                  src={recipeDetail.images[0].hostedLargeUrl}
                  alt={recipeDetail.name}
                />
                <h5>Prepp time: {recipeDetail.totalTime}</h5>
                <h6>{recipeDetail.numberOfServings} Servings</h6>
              </div>
              <h4>Ingrediens:</h4>
              <ul>
                {recipeDetail.ingredientLines &&
                recipeDetail.ingredientLines.length
                  ? recipeDetail.ingredientLines.map((ingredient, i) => (
                      <li key={i}>{ingredient}</li>
                    ))
                  : ""}
              </ul>
              {this.state.successIsActive
                ? successHandler("Recipe added successfully.")
                : ""}
              <select onChange={this.handleListChange}>
                {this.state.lists.map((list, i) => {
                  if (list.id === this.state.activeList.id) {
                    return (
                      <option key={i} value={list.id} defaultValue={list.id}>
                        {list.title}
                      </option>
                    );
                  } else {
                    return (
                      <option key={i} value={list.id}>
                        {list.title}
                      </option>
                    );
                  }
                })}
              </select>
              <div>
                <button
                  onClick={() => this.addToList(recipeDetail)}
                  type="button"
                  className="btn btn-primary button--detail button--detail-group"
                >
                  Add recipe to list
                </button>
                <button
                  onClick={() => this.storeGroceries()}
                  type="button"
                  className="btn btn-primary button--detail button--detail-group"
                >
                  Create grocery list
                </button>
                <button
                  onClick={() => {
                    this.props.history.goBack();
                  }}
                  type="button"
                  className="btn btn-primary button--detail button--detail-group"
                >
                  GO BACK
                </button>
              </div>
            </React.Fragment>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    );
  }
}

export default withAuth(RecipeDetails);
