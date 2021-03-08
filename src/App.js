import React, {useState, useEffect} from 'react';

import './App.css';
// import arrayOfToys from './db'
import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


function App() {

  let [toys, setToys] = useState([])
  let [display, setDisplay] = useState(false)

  // state = {
  //   toys: [],
  //   display: false
  // }

  useEffect(() => {
    fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(arrayOfToys => {
      setToys(arrayOfToys)
    })
  }, [])

  // componentDidMount() {
  //   fetch("http://localhost:3000/toys")
  //   .then(res => res.json())
  //   .then(arrayOfToys => {
  //     this.setState({
  //       toys: arrayOfToys
  //     })
  //   })        
  // }

  let handleClick = () => {
    let newBoolean = !display
    setDisplay({
      display: newBoolean
    })
  }

  let addAToy = (newToy) => {
    let copyOfToys = [...toys, newToy]
    setToys(copyOfToys)
  }

  let deleteAToy = (deletedID) => {
    let copyOfToys = toys.filter(toyObj => {
      return toyObj.id !== deletedID
    })
    setToys(copyOfToys)
  }

  let increaseLikes = (updatedToy) => {
    let copyOfToys = toys.map(toy => {
      if(toy.id === updatedToy.id) {
        return updatedToy
      } else {
        return toy
      }
    })
    setToys(copyOfToys)
  }

    return (
      <>
        <Header/>
        { display
            ?
          <ToyForm addAToy={addAToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={toys} deleteAToy={deleteAToy} increaseLikes={increaseLikes}/>
      </>
    );
}

export default App;
