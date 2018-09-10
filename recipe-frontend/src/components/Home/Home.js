import React, { Component } from 'react';
import Search from '../Search/Search';
import SearchResult from '../SearchResult/SearchResult';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      results: []
    };

    this.searchRecipe = this.searchRecipe.bind(this);
  }

  componentDidMount() {
    this.searchRecipe();
  }

  searchRecipe(query = 'cherry pie') {
    let yummlyAppKey = process.env.REACT_APP_YUMMLY_APP_KEY;
    let yummlyAppId = process.env.REACT_APP_YUMMLY_APP_ID;
  
    fetch(`http://api.yummly.com/v1/api/recipes?_app_id=${yummlyAppId}&_app_key=${yummlyAppKey}&q=${query}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          results: res.matches
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
 
  render() {
    return (
      <div>
        <Search onSearch = {this.searchRecipe} />
        {this.state.results.length ? 
          this.state.results.map((result, index) => {
            return <SearchResult key={index} result={result} />;
          })
          :''
        }
      </div>
    );
  }
}

export default Home;