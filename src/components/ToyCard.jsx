import React, { Component } from 'react'

class ToyCard extends Component {
  handleDelete = (event) => {
    fetch(`http://localhost:3000/toys/${this.props.singleToy.id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then((singleToy) => {
      this.props.deleteToyFunc(this.props.singleToy.id)
    })
  }

  handleUpdate = (event) => {
    fetch(`http://localhost:3000/toys/${this.props.singleToy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: this.props.singleToy.likes + 1
      })
    })
    .then(r => r.json())
    .then((selectedToy) => {
      this.props.updateToyFunc(selectedToy)
    })
  }

  render() {
    let {name, image, likes} = this.props.singleToy

    return (
      <div className="card">
        <h2>{name}</h2>
        <img src={image} alt={name} className="toy-avatar" />
        <p>{likes} Likes </p>
        <button className="like-btn" onClick={this.handleUpdate}>Like {'<3'}</button>
        <button className="del-btn" onClick={this.handleDelete}>Donate to GoodWill</button>
      </div>
    )
  }
}

export default ToyCard