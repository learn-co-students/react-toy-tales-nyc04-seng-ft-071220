import React, { Component } from 'react';

function ToyCard(props) {

    let {name, image, likes} = props.toy

    let handleDelete = (evt) => {
      // console.log(evt)
      fetch(`http://localhost:3000/toys/${props.toy.id}`, {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(deletedObj => {
        props.deleteAToy(props.toy.id)
      })
    }

    let handleIncrease = (evt) => {
      fetch(`http://localhost:3000/toys/${props.toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "Application/json"
        },
        body: JSON.stringify({
          likes: props.toy.likes + 1
          })
        })
      .then(res => res.json())
      .then(updatedToy => {
        props.increaseLikes(updatedToy)
      })
    }

    return (
      <div className="card">
        <h2>{name}</h2>
        <img src={image} alt={name} className="toy-avatar" />
        <p>{likes} Likes </p>
        <button className="like-btn" onClick={handleIncrease}>Like {'<3'}</button>
        <button className="del-btn" onClick={handleDelete} >Donate to GoodWill</button>
      </div>
    );
}

export default ToyCard;
