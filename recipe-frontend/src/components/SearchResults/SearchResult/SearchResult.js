import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class SearchResult extends Component {
  constructor(props) {
    super(props);
  }

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
      <li>
        <div className="card" id="card_sponsor">
          <div className="card-body">
            <div className="row p-3">
              <div className="col-12">
                <h3>{result.recipeName}</h3>
                <img src={recipeImageUrl} className="img-fluid" />
                <hr />
                <div className="row mb-2 justify-content-center">
                  <div className="col-sm text-center">
                    <i className="fa fa-pen" />
                    <br /> ingredients
                    <h4>{result.ingredients.length}</h4>
                  </div>
                  <div className="col-sm text-center">
                    <i className="fa fa-star" />
                    <br /> ating
                    <h4>{result.rating}</h4>
                  </div>
                  <div className="col-sm text-center">
                    <i className="fa fa-clock" />
                    <br /> prep time
                    <h4>{result.totalTimeInSeconds / 60}</h4>
                  </div>
                </div>
                <Link to={`/recipe/${result.id}`} className="btn btn-secondary">
                  View recipe!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}
