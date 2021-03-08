import React, { useState } from 'react';

function ToyForm(props) {

  console.log(props)

  let [name, setToyName] = useState("")
  let [image, setToyImage] = useState("")
  let [likes, setToyLikes] = useState(0)

  let handleSubmit = (evt) => {
    evt.preventDefault()
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-type": "Application/json"
      },
      body: JSON.stringify({
        name,
        image,
        likes
      })
    })
    .then(res => res.json())
    .then(newToy => {
      props.addAToy(newToy)
      setToyName("")
      setToyImage("")
    })
  }

    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={handleSubmit}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" id="toy_name" value={name} onChange={e => {setToyName(e.target.value)}} placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input type="text" name="image" id="toy_image" value={image} onChange={e => {setToyImage(e.target.value)}} placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
}

export default ToyForm;
