import React, { Component } from "react";
import { Link } from "react-router-dom";

import SearchResult from "./SearchResult/SearchResult";

import "./SearchResults.css";

class SearchResults extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { results } = this.props;
    
    return results.length
      ? results.map((result, index) => {
          return (
            <ul>
              <SearchResult key={index} result={result} />
            </ul>
          );
        })
      : "";
  }
}

export default SearchResults;
