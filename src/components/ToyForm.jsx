import React, { Component } from 'react'

class ToyForm extends Component {
  state = {
    name: "",
    image: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  handleSubmit = (event) => {
    event.preventDefault()
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        image: this.state.image,
        likes: 0
      })
    })
    .then(r => r.json())
    .then((newToy) => {
      this.props.addNewToy(newToy)
    })
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.handleSubmit}>

          <h3>Create a toy!</h3>

          <input
            type="text"
            name="name"
            placeholder="Enter a toy's name..."
            className="input-text"
            onChange={this.handleChange}
            autoComplete="off"
          />

          <br/>

          <input
            type="text"
            name="image"
            placeholder="Enter a toy's image URL..."
            className="input-text"
            onChange={this.handleChange}
            autoComplete="off"
          />

          <br/>

          <input
            type="submit"
            name="submit"
            placeholder="Create New Toy"
            className="submit"
          />
        </form>
      </div>
    );
  }

}

export default ToyForm;
