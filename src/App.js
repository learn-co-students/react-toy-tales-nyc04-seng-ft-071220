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

  componentDidMount() {

    fetch('http://localhost:3000/toys')
      .then(response => response.json())
      .then((arrayOftoys) => {
        this.setState({
          toys: arrayOftoys
        })
      })

  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  addToyToState = (newlyCreatedtoy) => {
    let copyOfToys = [...this.state.toys, newlyCreatedtoy]
    this.setState({
      toys: copyOfToys
    })
  }

  updateToyFromState = (updatedObj) => {
    let copyOfToys = this.state.toys.map((toy) => {
      if(toy.id === updatedObj.id) {
        return updatedObj
      } else {
        return toy
      }
    })

    this.setState({
      toys: copyOfToys
    })

  }

  deleteToyFromState = () => {

    fetch('http://localhost:3000/toys')
      .then(response => response.json())
      .then((arrayOftoys) => {
        console.log('FROM APP: ', arrayOftoys)
        this.setState({
          toys: arrayOftoys
        })
      })
  }



  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addToyToState={this.addToyToState} />
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} updateToyFromState={this.updateToyFromState} deleteToyFromState={this.deleteToyFromState}/>
      </>
    );
  }

}

export default App;
