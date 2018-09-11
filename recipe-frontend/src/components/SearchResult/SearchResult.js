import React, {Component} from'react';

import { Link } from "react-router-dom";


class SearchResult extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {result} = this.props;
      return (
        <Link to={{ pathname: `/recipe/${result.id}`, state: { result: result.recipeName } }}>
          <div  className="card card--width">
            <img src={result.smallImageUrls[0]} alt={result.recipeName} className="image--height" />
            <h5>{result.recipeName}</h5>
          </div>
        </Link>
      );
  }
}
        
export default SearchResult;