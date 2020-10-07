import React from 'react';
import ToyCard from './ToyCard'

function ToyContainer(props){

  console.log('FROM ToyContainer: ', props.toys)

  let arrayOfToyComponents = props.toys.map((singularToyObj) => {
    return <ToyCard key={singularToyObj.id} toy={singularToyObj} updateToyFromState={props.updateToyFromState}/>
  })

  return(
    <div id="toy-collection">
      <ul> { arrayOfToyComponents } </ul>
    </div>
  );
}

export default ToyContainer;
