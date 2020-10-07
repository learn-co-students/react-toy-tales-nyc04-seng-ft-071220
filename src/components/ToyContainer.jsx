import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {

  let arrayOfToys = props.display.map((singularToy) => {
    console.log(singularToy)

    return <ToyCard 
    
    key = {singularToy.id}
    display = {singularToy}
    />
  })
  return(
    <div id="toy-collection">
      {arrayOfToys}
    </div>
  );
}

export default ToyContainer;
