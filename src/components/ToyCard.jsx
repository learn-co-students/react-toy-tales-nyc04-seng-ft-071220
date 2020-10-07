import React, { Component } from 'react';

class ToyCard extends Component {
  
  handleDelete = (evt) => {
    fetch(`http://localhost:3000/toys/${this.props.toyObj.id}`, {
        method: "DELETE"
        })
        .then(res => res.json())
        .then((deletedToy) => {
            this.props.deleteToyFromState(deletedToy.id)
        })
  }

  render() {
    // console.log(this.props)
    return (
      
      <div className="card">
        <h2>{this.props.toyObj.name}</h2>
         <img src={this.props.toyObj.image} alt={this.props.toyObj.name} className="toy-avatar" />
         <p>{this.props.toyObj.likes} Likes </p>
         <button className="like-btn" >Like {'<3'}</button>
         <button className="del-btn" onClick={this.handleDelete} >Donate to GoodWill</button>
      </div>
    )
  }

}

export default ToyCard;
