import React, { Component } from "react";
import Filter from "./Filter/Filter";

class SearchFilter extends Component {
  constructor() {
    super();

    this.state = {
      filters: [
        {
          name: "Lacto Vegetarian",
          tag: "388^Lacto vegetarian",
          type: "diet",
          checked: false
        },
        {
          name: "Ovo-vegetarian",
          tag: "389^Ovo vegetarian",
          type: "diet",
          checked: false
        },
        {
          name: "Pescetarian",
          tag: "390^Pescetarian",
          type: "diet",
          checked: false
        },
        { 
          name: "Vegan",
          tag: "386^Vegan",
          type: "diet",
          checked:  false
         },
        { 
          name: "Lacto-ovo vegetarian",
          tag: "387^Lacto-ovo vegetarian",
          type: "diet",
          checked:  false
         },
        { 
          name: "Paleo",
          tag: "403^Paleo",
          type: "diet",
          checked:  false
         },
        { 
          name: "Main Dishes",
          tag: "course^course-Main Dishes",
          type: "course",
          checked:  true
         },
        { 
          name: "Appetizers",
          tag: "course^course-Appetizers",
          type: "course",
          checked:  false
         },
        { 
          name: "Desserts",
          tag: "course^course-Desserts",
          type: "course",
          checked:  false
         }
      ]      
    };

    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(index, event) {
    const { filters } = this.state;
    
    filters[index].checked = !filters[index].checked

    this.setState({
      filters
    });

    this.props.filterChanged(filters);
  }

  render() {
    const { filters } = this.state;

    return (
      <div>
        <legend>Allergy or preference:</legend>
        <legend>Type of dish:</legend>

        {filters.map((filter, index) => {
          if (index < 6) {
            return (
              <Filter
                className="form-check-input"
                type={"checkbox"}
                checked={filter.checked}
                onFilterChange={this.handleFilterChange.bind(this, index)}
                name={filter.name}
                value={filter.tag}
              />
            );
          } else {
            return (
              <Filter
                className="form-check-input"
                type={"radio"}
                checked={filter.checked}
                onFilterChange={this.handleFilterChange.bind(this, index)}
                name={filter.name}
                value={filter.tag}
              />
            );
          }
        })}
        { this.props.children }
      </div>
    );
  }
}

export default SearchFilter;
