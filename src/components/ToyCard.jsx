import React, { Component } from 'react';

class ToyCard extends Component {



  handleDelete = (event) => {
    fetch(`http://localhost:3000/toys/${this.props.toy.id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then((toy) => {
      this.props.deleteToy(this.props.toy.id)
    })
  }

  handleUpdate = (event) => {
    fetch(`http://localhost:3000/toys/${this.props.toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: this.props.toy.likes + 1
      })
    })
    .then(r => r.json())
    .then((selectedToy) => {
      this.props.updateToy(selectedToy)
    })
  }



  render() {


    let {name, image, likes} = this.props.toy

    return (
      <div className="card">
        <h2>{ name }</h2>
        <img src={ image } alt={ name } className="toy-avatar" />
        <p>{ likes } Likes </p>
        <button onClick={this.handleUpdate} className="like-btn">Like {'<3'}</button>
        <button onClick={this.handleDelete} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
