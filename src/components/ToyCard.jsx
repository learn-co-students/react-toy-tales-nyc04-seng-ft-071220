import React, { Component } from 'react';

class ToyCard extends Component {

  handleDelete = (evt) => {
    // debugger
    fetch(`http://localhost:3000/toys/${this.props.toy.id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then((nothing) => {
      // debugger
      this.props.deleteToy(this.props.toy.id)
    })
  }

  handleUpdate = (evt) => {
    // debugger
    fetch(`http://localhost:3000/toys/${this.props.toy.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likes: this.props.toy.likes + 1
      })
    })
    .then(res => res.json())
    .then(updatedToyObj => {
      this.props.updateToy(updatedToyObj)
    })
  }

  render() {
    return (
      <div className="card">
        <h2>{this.props.toy.name}</h2>
        <img src={this.props.toy.image} alt={this.props.toy.name} className="toy-avatar" />
        <p>{this.props.toy.likes} Likes </p>
        <button className="like-btn" onClick={this.handleUpdate}>Like {'<3'}</button>
        <button className="del-btn" onClick={this.handleDelete}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;