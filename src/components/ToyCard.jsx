import React, { Component } from 'react';

class ToyCard extends Component {
  
  render() {
    // console.log(this.props)
    return (
      
      <div className="card">
        <h2>{this.props.toyObj.name}</h2>
         <img src={this.props.toyObj.image} alt={this.props.toyObj.name} className="toy-avatar" />
         <p>{this.props.toyObj.likes} Likes </p>
         <button className="like-btn">Like {'<3'}</button> 
         <button className="del-btn">Donate to GoodWill</button>
      </div>
    )
  }

}

export default ToyCard;
