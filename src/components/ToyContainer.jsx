import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  // console.log(props.toys)

  const toys = props.toys
  return(
    <div id="toy-collection">
      {/* Render the collection of ToyCards */}
      {
        toys.map(toy => <ToyCard like={props.like} delete={props.delete} key={toy.id} {...toy} />)
      }
    </div>
  );
}
export default ToyContainer;
