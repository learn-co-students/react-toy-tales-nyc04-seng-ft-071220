import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {

  const arrayOfComponents = props.toys.map(toy => {
    return(<ToyCard key={toy.id} toyObj={toy}/>)
  })

  return(
    <div id="toy-collection">
      {arrayOfComponents}
    </div>
  );
}

export default ToyContainer;
