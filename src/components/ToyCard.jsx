import React, { Component } from 'react';

class ToyCard extends Component {

  handleDelete = (evt) => {
    fetch(`http://localhost:3000/toys/${this.props.display.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then((nothing) => {
      // console.log("THIS SHOULD BE DELETED:", deleteObj)
      this.props.deleteToyFromState(this.props.display.id)
    })
  }

  handleUpdate = (evt) => {
    fetch(`http://localhost:3000/toys/${this.props.display.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "Application/json"
      },
      body: JSON.stringify({
        likes: this.props.display.likes + 1
      })
    })
    .then(res => res.json())
    .then(updatedToy => {
      this.props.updateLikeFromState(updatedToy)
    })
  }

  render() {
 let {name, image, likes} = this.props.display
    return (
      <div className="card">
        <h2>{name}</h2>
        <img src={image} alt={name} className="toy-avatar" />
        <p>{likes} Likes </p>
        <button className="like-btn"onClick={this.handleUpdate}>Like {'<3'}</button>
        <button className="del-btn" onClick={this.handleDelete}>Donate to GoodWill</button> 
      </div>
    );
  }

}

export default ToyCard;
