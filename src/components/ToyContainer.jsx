import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {


  let toysArray = props.toys.map((singleToy)=> {
    return <ToyCard
              key={singleToy.id}
              toy={singleToy}
              deleteToy={props.deleteToy}
              updateToy={props.updateToy}
            />
  })

  return(
    <div id="toy-collection">
      { toysArray }
    </div>
  )
}

export default ToyContainer;
