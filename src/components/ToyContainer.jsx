import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {

  console.log(props)
  let toys = props.toys.map(toy => {
    return <ToyCard
      key={toy.id}
      toy={toy}
      deleteAToy={props.deleteAToy}
      increaseLikes={props.increaseLikes}
    />
  })
  return(
    <div id="toy-collection">
      {toys}
    </div>
  );
}

export default ToyContainer;
