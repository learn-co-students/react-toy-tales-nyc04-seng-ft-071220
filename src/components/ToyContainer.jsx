import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {

  let toyArry = props.toys.map(toyObj => {
    return <ToyCard 
              key={toyObj.id} 
              toy={toyObj}
              updatedToyFun={props.updatedToyFun}
              deletedToyFun={props.deletedToyFun}
            />
  })

  return(
    <div id="toy-collection">
      {toyArry}
    </div>
  );
}

export default ToyContainer;
