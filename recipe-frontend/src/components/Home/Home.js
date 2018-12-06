import React, { Component } from "react";
import withAuth from "../../helpers/withAuth";
import Search from "../Search/Search";
import SearchResults from "../SearchResults/SearchResults";
import SearchFilter from "../SearchFilter/SearchFilter";

import "./Home.css";

// import AuthHelperMethods from './components/AuthHelperMethods';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      query: "cherry pie"
    };

    // Auth = new AuthHelperMethods();

    this.searchRecipe = this.searchRecipe.bind(this);
    this.filterResults = this.filterResults.bind(this);
  }

  componentDidMount() {
    this.searchRecipe("cherry pie");
  }

  handleQueryChange(query) {
    this.setState({
      query: query
    });
  }

  searchRecipe(query, searchFilters = null) {
    let yummlyAppKey = process.env.REACT_APP_YUMMLY_APP_KEY;
    let yummlyAppId = process.env.REACT_APP_YUMMLY_APP_ID;
    let yummlyAPIRoot = `http://api.yummly.com/v1/api/recipes?_app_id=${yummlyAppId}&_app_key=${yummlyAppKey}`;
    let fetchURL;

    fetchURL = searchFilters
      ? `${yummlyAPIRoot}&q=${query}&${searchFilters}`
      : `${yummlyAPIRoot}&q=${query}`;

    fetch(fetchURL)
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

  filterResults(filters) {
    const { results } = this.state;

    if (results.length === 0) {
      return;
    }

    let activeFilters = filters
      .filter(f => f.checked)
      .map(af => {
        if (af.type === "diet") {
          return `allowedDiet[]=${af.tag}`;
        } else if (af.type === "course") {
          return `allowedCourse[]=${af.tag}`;
        }
        return false;
      })
      .join("&");

    this.searchRecipe(this.state.query, activeFilters);
  }

  render() {
    return (
      <div>
        <Search
          onSearch={this.searchRecipe}
          onChange={this.handleQueryChange}
          query={this.state.query}
        />
        <SearchFilter filterChanged={this.filterResults}>
          <SearchResults results={this.state.results} />
        </SearchFilter>
      </div>
    );
  }
}

export default withAuth(Home);
