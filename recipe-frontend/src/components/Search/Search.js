import React, { Component } from "react";
import "./Search.css";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchText: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      searchText: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSearch(this.query.value);

    this.setState({
      searchText: ""
    });
  }

  render() {
    return (
      <form
        className="form-inline my-2 my-lg-0 Search mr-3 ml-3"
        name="searchForm"
        onSubmit={this.onSubmit}
      >
        <input
          value={this.state.searchText}
          className="form-control mr-sm-2"
          type="text"
          onChange={this.onChange}
          name="search"
          ref={input => (this.query = input)}
          placeholder="Search..."
        />
        <button className="btn btn-success my-2 my-sm-0 button--detail" type="submit">
          Go!
        </button>
      </form>
    );
  }
}

export default Search;
