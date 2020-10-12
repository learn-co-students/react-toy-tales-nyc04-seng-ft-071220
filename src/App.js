import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

// import data from './data'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

 componentDidMount(){

  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then((arrayOfToys) => {
      this.setState({
        toys: arrayOfToys
      })
    })
 }
  
  //this will display the add toy form upon clicking
  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }


  //adding toy helper method
  addNewToy = (newToy) => {
    let newToysArr = [...this.state.toys, newToy]
    this.setState({
      toys: newToysArr
    })
  }


  //delete toy helper method
  deleteToy = (selectedToyId) => {
    let newToysArr = this.state.toys.filter((toy) => {
      return toy.id !== selectedToyId
    })

    this.setState({
      toys: newToysArr
    })
  }


  //update toy helper method

  updateToy = (updatedToy) => {
    let newToysArr = this.state.toys.map((toy) => {
      if (toy.id === updatedToy.id) {
        return updatedToy
      } else {
        return toy
      }
    })

    this.setState({
      toys: newToysArr
    })
  }


  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addNewToy={this.addNewToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer 
          toys={this.state.toys}
          deleteToy={this.deleteToy}
          updateToy={this.updateToy}
        />
      </>
    );
  }

}

export default App;
