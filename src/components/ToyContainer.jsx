import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {

  let toysArr = props.toysArray.map((toy) => {
    return <ToyCard key={toy.id} singleToy={toy} deleteToyFunc={props.deleteToyFunc} updateToyFunc={props.updateToyFunc}/>
  })

  return(
    <div id="toy-collection">
      { toysArr }
    </div>
  )
}

export default ToyContainer