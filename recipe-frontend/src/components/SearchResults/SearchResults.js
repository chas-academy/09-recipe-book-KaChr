import React, { Component } from "react";

import SearchResult from "./SearchResult/SearchResult";

import "./SearchResults.css";

class SearchResults extends Component {

  render() {
    const { results } = this.props;
    
    return results.length
      ? results.map((result, index) => {
          return (
            <div key={index} className="ul--detail">
              <SearchResult result={result} />
            </div>
          );
        })
      : "";
  }
}

export default SearchResults;
