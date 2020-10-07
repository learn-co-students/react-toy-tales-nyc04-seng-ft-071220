import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

// import data from './data' 
// (use localhost json instead)


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  toySubmit = (name, img) => {
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: name,
        image: img,
        likes: 0
      })
    })
      .then(() => this.fetchToys())
  }

  fetchToys = () => {
    fetch('http://localhost:3000/toys')
      .then(resp => resp.json())
      .then(toys => this.setState({ toys }))
  }

  deleteToy = (id) => {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
      .then(() => this.fetchToys())
  }

  likeToy = (likes, id) => {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: likes
      })
    })
      .then(() => this.fetchToys())
  }

  componentDidMount() {
    fetch('http://localhost:3000/toys')
      .then(resp => resp.json())
      .then(toys => this.setState({ toys }))
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm submit={this.toySubmit} />
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer like={this.likeToy} delete={this.deleteToy} toys={this.state.toys} />
      </>
    );
  }

}

export default App;