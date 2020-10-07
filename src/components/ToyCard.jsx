import React, { Component } from 'react';

class ToyCard extends Component {

  state = {
    likes: this.props.likes 
  }

  handleDeleteClick = e => {
    this.props.delete(this.props.id)
  }

  handleLikeClick = e => {
    let likeCount = parseInt(this.state.likes)
    likeCount += 1
    this.props.like(likeCount, this.props.id)
    this.setState({
      likes: likeCount
    })
  }

  render() {
    const {name, image, likes} = this.props

    return (
      <div className="card">
        <h2>{name}</h2>
        <img src={image} className="toy-avatar" />
        <p>{likes} Likes </p>
        <button onClick={this.handleLikeClick} className="like-btn">Like {'♥️'}</button>
        <button onClick={this.handleDeleteClick} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
