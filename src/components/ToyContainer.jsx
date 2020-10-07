import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  

  const toys = props.toys
  return(
    <div id="toy-collection">
      {toys.map(toy => <ToyCard like={props.like} delete={props.delete} key={toy.id} {...toy} />)}
    </div>
  );
}
export default ToyContainer;
