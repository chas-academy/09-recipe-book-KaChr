import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./SearchResult.css";

export default class SearchResult extends Component {
  render() {
    const { result } = this.props;
    let recipeImagePath;
    let recipeImageUrl;

    if (result) {
      if (result.imageUrlsBySize) {
        recipeImagePath = result.imageUrlsBySize["90"].split("=")[0];
      } else {
        recipeImagePath = `//unsplash.it/400x200`;
      }

      recipeImageUrl = `${recipeImagePath}=s350`;
    }

    return (
      <div className="card" id="card_sponsor">
        <div className="card-body">
          <div className="row p-3">
            <div className="col-12">
              <h3>{result.recipeName}</h3>
              <img
                className="img-fluid img--search"
                src={recipeImageUrl}
                alt={result.recipeName}
              />
              <hr />
              <div className="row mb-2 justify-content-center">
                <div className="col-sm text-center">
                  <i className="fa fa-pen" />
                  <br /> ingredients
                  <h4>{result.ingredients.length}</h4>
                </div>
                <div className="col-sm text-center">
                  <i className="fa fa-star" />
                  <br /> rating
                  <h4>{result.rating}</h4>
                </div>
                <div className="col-sm text-center">
                  <i className="fa fa-clock" />
                  <br /> prep time
                  <h4>{result.totalTimeInSeconds / 60}</h4>
                </div>
              </div>
              <Link
                to={`/recipe/${result.id}`}
                className="btn btn-secondary button--detail"
              >
                View recipe!
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
