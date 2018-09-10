import React, {Component} from'react';


class SearchResult extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {result} = this.props;
      return (
        <div  className="card card--width">
          <img src={result.smallImageUrls[0]} alt={result.recipeName} className="image--height" />
          <h5>{result.recipeName}</h5>
        </div>
      );
  }
}
        
export default SearchResult;