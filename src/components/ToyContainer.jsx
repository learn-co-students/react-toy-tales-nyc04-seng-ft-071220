import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {

  let toysArr = props.toys.map((toy) => {
    return <ToyCard key={toy.id} toy={toy} deleteToy={props.deleteToy} updateToy={props.updateToy}/>
  })

  return(
    <div id="toy-collection">
      { toysArr }
    </div>
  )
}

export default ToyContainer