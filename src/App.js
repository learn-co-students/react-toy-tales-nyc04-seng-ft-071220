import React from 'react'
import './App.css'
import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

class App extends React.Component{
  state = {
    display: false,
    toys: []
  }

  componentDidMount(){
    fetch("http://localhost:3000/toys")
    .then(r => r.json())
    .then((newToysArray) => {
      this.setState({
        toys: newToysArray
      })
    })
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  addNewToy = (newToy) => {
    let newToysArr = [...this.state.toys, newToy]
    this.setState({
      toys: newToysArr
    })
  }

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

  deleteToy = (selectedToyId) => {
    let newToysArr = this.state.toys.filter((toy) => {
      return toy.id !== selectedToyId
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
          updateToy={this.updateToy}
          deleteToy={this.deleteToy}
        />
      </>
  )
  }
}

export default App;
