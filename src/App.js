import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  // initial state
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

  componentDidMount(){
    fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toyArray => {
      this.setState({
        toys: toyArray
      })
    })
  }

  addToy(inputToy){
    let copyOfToys = [...this.state.toys, inputToy]
    this.setState({
      toys: copyOfToys
    })
  }

  deleteToy = (deletedToyID) => {
    // debugger
    let copyOfToys = this.state.toys.filter(toyObj => {
      // debugger
      return toyObj.id !== deletedToyID
    }) 
    this.setState({
      toys: copyOfToys
    })
  }

  updateToy = (updatedToy) => {
    // debugger
    let copyOfToys = this.state.toys.map(toyObj => {
      if (toyObj.id === updatedToy.id) {
        return updatedToy
      } else {
        return toyObj
      }
    })
    this.setState({
      toys: copyOfToys
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} deleteToy={this.deleteToy} updateToy={this.updateToy}/>
      </>
    );
  }

}

export default App;
