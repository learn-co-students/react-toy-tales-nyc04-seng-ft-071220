import React, { Component } from 'react';

class ToyForm extends Component {

  state = {
    name: "",
    image: ""
  }

  handleInputChange = (evt) => {
    // console.log(evt.target.value)
    this.setState({
      [evt.target.name] : evt.target.value
    })
  }
  
  handleSubmit = (evt) => {
    evt.preventDefault()
    this.props.toyInfo(this.state)
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.handleSubmit}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input type="text" name="image" value={this.state.image} onChange={this.handleInputChange} placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
