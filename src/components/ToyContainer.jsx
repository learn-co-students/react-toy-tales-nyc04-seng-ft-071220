import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {

  let toysArr = props.toys.map((toy) => {
    return <ToyCard key={toy.id} toy={toy}/>
  })

  return(
    <div id="toy-collection">
      { toysArr }
    </div>
  )
}

export default ToyContainer