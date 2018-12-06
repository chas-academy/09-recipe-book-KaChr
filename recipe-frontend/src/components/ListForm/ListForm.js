import React, { Component } from "react";
import { getUser } from "../../helpers/getUser";
import withAuth from "../../helpers/withAuth";

class ListForm extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    e.preventDefault();

    this.setState({
      title: e.target.value
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    
    const credentials = JSON.parse(sessionStorage.getItem("credentials"));
    const data = { title: this.state.title };
    const user = await getUser();

    if (this.state.title) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/list`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${credentials.access_token}`
        },
        body: JSON.stringify(data)
      })
        .catch(err => console.log(err))
        .then(res => res.json())
        .then(res => this.props.history.push(`/user/${user.data.id}/lists`));
    }

  }

  render() {
    return (
      <div>
        <form name="list" id="list" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>New list</label>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="List name"
              onChange={this.onChange}
            />
          </div>
          <button type="submit" value="title" className="btn btn-primary button--detail">
            Create a new list
          </button>
        </form>
      </div>
    );
  }
}

export default withAuth(ListForm);
