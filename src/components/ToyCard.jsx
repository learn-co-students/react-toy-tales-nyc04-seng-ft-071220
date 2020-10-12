import React, { Component } from 'react';

class ToyCard extends Component {


  handleDelete = (evt) => {
    fetch(`http://localhost:3000/toys/${this.props.toy.id}`, {
      method: 'DELETE',
    })
    .then (r => r.json())
    .then(deletedToy => {
      this.props.deletedToyFun(this.props.toy)
    })
  }


  handleUpdate = (evt) => {
    fetch(`http://localhost:3000/toys/${this.props.toy.id}`, {
      method: 'PATCH',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify({
        likes: this.props.toy.likes + 1
      })
    })
    .then (r => r.json())
    .then(updatedToy => {
      this.props.updatedToyFun(updatedToy)
    })
  }

  render() {

    let {name, image, likes} = this.props.toy
    return (
      <div className="card">
        <h2>{name}</h2>
        <img src={image} alt={name} className="toy-avatar" />
        <p>{likes} Likes </p>
        <button className="like-btn" onClick={this.handleUpdate}>Like {'<3'}</button>
        <button className="del-btn" onClick={this.handleDelete}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
