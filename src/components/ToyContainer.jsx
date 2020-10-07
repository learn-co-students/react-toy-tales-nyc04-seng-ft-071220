import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
// console.log(props.toys)
  const arrayOfComponents = props.toys.map(toy => {
    return(<ToyCard key={toy.id} toyObj={toy} deleteToyFromState={props.deleteToyFromState}/>)
  })

  return(
    <div id="toy-collection">
      {arrayOfComponents}
    </div>
  );
}

export default ToyContainer;
