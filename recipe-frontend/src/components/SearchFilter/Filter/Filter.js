import React, { Component } from "react";

export default class Filter extends Component {
  render() {
    return (
      <div className="form-check form-check-inline">
        <input
          onChange={this.props.onFilterChange}
          checked={this.props.checked}
          type={this.props.type}
          name={this.props.name}
          value={this.props.value}
        />
        <label className="form-check-label" htmlFor={this.props.name}>
          {this.props.name}
        </label>
      </div>
    );
  }
}
