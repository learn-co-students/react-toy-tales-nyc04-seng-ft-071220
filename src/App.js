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
        display = {this.state.display} />
        </div>
    );
  }

}

export default App;
