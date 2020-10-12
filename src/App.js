import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


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

  componentDidMount(){
    fetch('http://localhost:3000/toys')
    .then(r => r.json())
    .then(resp => {
      this.setState({
        toys: resp
      })
    })
  }

  newToyFun = (newToy) => {
    let newToyArr = [...this.state.toys, newToy]
    this.setState({
      toys: newToyArr
    })
    
  }

  updatedToyFun = (updatedToy) => {
    let newToyArr = this.state.toys.map(toy =>{
      if (toy.id === updatedToy.id){
        return updatedToy
      } else{
        return toy
      }
    })

    this.setState({
      toys: newToyArr
    })
  }


  deletedToyFun = (deletedToy) => {
    let newToyArr = this.state.toys.filter(toy => {
       return toy.id !== deletedToy.id
    })

    this.setState({
      toys: newToyArr
    })
  }

  render(){
    console.log(this.state.toys)
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm newToyFun={this.newToyFun}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer 
           toys={this.state.toys}
           updatedToyFun={this.updatedToyFun}
           deletedToyFun={this.deletedToyFun}
        />
      </>
    );
  }

}

export default App;
