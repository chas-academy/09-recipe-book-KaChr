import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { getUser } from "../../helpers/getUser";
import './ListUser.css';

class ListsUser extends Component {
  constructor() {
    super();
    this.state = {
      lists: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    const user = await getUser();
    const credentials = JSON.parse(sessionStorage.getItem("credentials"));

    fetch(`${process.env.REACT_APP_API_BASE_URL}/user/${user.data.id}/lists`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${credentials.access_token}`
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          lists: res.data,
          activeList: res.data[res.data.length - 1]
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  async handleClick(index, clickedList) {
    const user = await getUser();

    this.setState({
      activeList: clickedList
    }, () => {
      this.props.history.push(`/user/${user.data.id}/lists/${this.state.activeList.id}`);
    })
  }

  
  async handleDelete(e, listId) {
    e.stopPropagation();

    const user = await getUser();
    const credentials = JSON.parse(sessionStorage.getItem("credentials"));

    fetch(`${process.env.REACT_APP_API_BASE_URL}/user/${user.data.id}/lists/${listId}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${credentials.access_token}`
      }
    })
    .then(res => res.json())
    .then(res => { 
      let lists = this.state.lists;
      lists = lists.filter(list => list.id !== listId);
      this.setState({lists: lists});
     })
    .catch(err => console.log(err))
  }

  render() {
    let { lists } = this.state;

    if (lists.length === 0) {
      lists = [{ id: 'N/A', title: 'No lists found yet, why not go make one?' }];
    }
  
    return (
      <div>
        
        {
          lists.map((list, i) => {
            if (list.id === 'N/A') {
              return <p key={i} className="p--list">{list.title} <Link to={"/list"}>Go to list creation</Link></p>
            } else {
              return <h2 className="h2--list" key={i} onClick={(e, key) => this.handleClick(e, list)} >{list.title} <button onClick={(e) => this.handleDelete(e, list.id)} type="button" className="btn btn-danger btn-sm button--detail">X</button></h2>
            }
          })
        }
      </div>
    );
  }
}

export default ListsUser;
