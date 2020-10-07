import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import data from './data'


class App extends React.Component{

  state = {
    display: []
  }
  

 componentDidMount() {
   fetch('http://localhost:3000/toys')
   .then(res => res.json())
   .then((arrayOfToys) => {
     console.log(arrayOfToys)
     this.setState( {
       display: arrayOfToys
     })
   })
 }


 addToyToState = (newlyCreatedToy) => {
  let copyOfToys = [...this.state.display, newlyCreatedToy]
  this.setState({
    display: copyOfToys
  })

}

deleteToyFromState = (deletedID) => {
  console.log("THIS IS THE DELETED ID", deletedID)
  let copyOfToys2 = this.state.display.filter(toyObj => {
    return toyObj.id !== deletedID
  })
  console.log("ARRAY OF NON-DELETED TOYS", copyOfToys2)
  this.setState({display: copyOfToys2})
}

updateLikeFromState = (updatedObj) => {
  let copyOfToys = this.state.display.map(toy => {
    if (toy.id === updatedObj.id) {
      return updatedObj
    } else {
      return toy
    }
  })
  this.setState({display: copyOfToys})
}

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  render(){

    return (
     
       <div className = "App">
        <Header />
          
          <ToyForm addToyToState = {this.addToyToState}/>
            
    
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer 
        display = {this.state.display} 
        deleteToyFromState = {this.deleteToyFromState} 
        updateLikeFromState = {this.updateLikeFromState}/>
        </div>
    );
  }

}

export default App;
