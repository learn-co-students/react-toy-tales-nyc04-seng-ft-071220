import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  // debugger
  // Turn Array of Toys to an Array of Components
  let arrayOfComponents = props.toys.map((toyObj) => {
    // debugger
    return <ToyCard 
      key={toyObj.name} 
      toy={toyObj}
      deleteToy={props.deleteToy}
      updateToy={props.updateToy}/>
  })

  return(
    <div id="toy-collection">
      {arrayOfComponents}
    </div>
  );
}

export default ToyContainer;
