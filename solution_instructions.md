# Solution Instructions
## Table of contents
* [Getting started](#getting-started)
* [Relationship hierarchy](#relationship-hierarchy)
* [Challenge 1](#challenge-1)
* [Challenge 2](#challenge-2)
* [Challenge 3](#challenge-3)

<a name="getting-started"/>

## Getting started
* Copy the repo URL and run `git clone` in your terminal. `cd` into the new directory and run these commands.

```
npm install -g json-server
json-server --watch db.json
```

* Open up a new terminal and run the following command:

```
npm start
```

* The terminal will ask you to start a new server since we already have the JSON server running on `localhost:3000`. Enter `y` to start a new server on `localhost:3001`.
* Open `http://localhost:3001` in the browser to see your app.
* Make a copy of `db.json` and save it as `original_db.json`. This is so that you can always refer back to the original database in case you mess up the database with incorrect PATCH requests.

<a name="relationship-hierarchy"/>

## Relationship hierarchy
Here's a diagram of how the components in this app can talk to each other.
![hierarchy diagram of app components](https://i.imgur.com/a0c52yZ.png)

<a name="challenge-1"/>

## Challenge 1
**Render the ToyCard component on to the page for each toy instance.**

What does this mean?
* Access the information about the toys from the backend (which is our `db.json` file).
* Send all the toy instances to the ToyContainer.
* Iterate through all the toy instances and return a ToyCard.

#### 1. In `App.js`, add a `toys` attribute to the state and assign it to an empty array.

```javascript
// App.js

state = {
  display: false,
  toys: []
}
```

#### 2. Write a `componentDidMount()` method and a GET fetch request to get all the toy instances.
Pass in `localhost:3000/toys` to the fetch request.
In the first `then` statement, take the response and turn it into a JSON object.

```javascript
// App.js

componentDidMount(){
  fetch("http://localhost:3000/toys")
  .then(r => r.json())
  .then()
}
```

In the second `then` statement, take the new toys array from our JSON object and change the state for the `toys` attribute. We're going to update the state so that the `toys` attribute is no longer an empty array, but instead, filled with all the new toy instances.

```javascript
// App.js

componentDidMount(){
  fetch("http://localhost:3000/toys")
  .then(r => r.json())
  .then((newToysArray) => {
    this.setState({
      toys: newToysArray
    })
  })
}
```

#### 3. Now that our state is updated with the new toys array, send it down to the ToyContainer component as props.
This will allow the ToyContainer component to access the toys array.

```javascript
// App.js

render(){
  return (
    <>
      <Header/>
      { this.state.display
          ?
        <ToyForm/>
          :
        null
      }
      <div className="buttonContainer">
        <button onClick={this.handleClick}> Add a Toy </button>
      </div>

      {/* here's where we're adding toys as props */}
      <ToyContainer toys={this.state.toys}/>
    </>
  )
}
```

This is how your `App.js` file should look at the end of this step.

```javascript
// App.js

import React from 'react'
import './App.css'
import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

class App extends React.Component{
  state = {
    display: false,
    toys: []
  }

  componentDidMount(){
    fetch("http://localhost:3000/toys")
    .then(r => r.json())
    .then((newToysArray) => {
      this.setState({
        toys: newToysArray
      })
    })
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>

        <ToyContainer toys={this.state.toys}/>
      </>
    )
  }
}

export default App
```

#### 4. In `ToyContainer.jsx`, iterate through the toys props and return a ToyCard component for each instance.
Since ToyContainer is a functional component, we need to pass in `props` as the function argument.

```javascript
// ToyContainer.jsx

const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
      {/* Render the collection of ToyCards */}
    </div>
  )
}
```

Above the `return()` statement, create a new variable called `toysArray`.

```javascript
// ToyContainer.jsx

const ToyContainer = (props) => {

  // here's the new variable
  let toysArr

  return(
    <div id="toy-collection">
      {/* Render the collection of ToyCards */}
    </div>
  )
}
```

Use `map()` to iterate over the toys props and set this value to be `toysArray`.

```javascript
// ToyContainer.jsx

const ToyContainer = (props) => {

  let toysArr = props.toys.map()

  return(
    <div id="toy-collection">
      {/* Render the collection of ToyCards */}
    </div>
  )
}
```

Fill out the `map()` statement so that it returns a ToyCard component.

```javascript
// ToyContainer.jsx

const ToyContainer = (props) => {

  let toysArr = props.toys.map((toy) => {
    return <ToyCard />
  })

  return(
    <div id="toy-collection">
      {/* Render the collection of ToyCards */}
    </div>
  )
}
```

Send down the individual toy instance and its id attribute as props to the ToyCard component. Creating a `key` prop is a requirement in React when creating child components. The `key` props must be a totally unique value for each child component.

```javascript
// ToyContainer.jsx

const ToyContainer = (props) => {

  let toysArr = props.toys.map((toy) => {
    return <ToyCard key={toy.id} toy={toy}/>
  })

  return(
    <div id="toy-collection">
      {/* Render the collection of ToyCards */}
    </div>
  )
}
```

Render `toysArr` inside the `return()` method.

```javascript
// ToyContainer.jsx

const ToyContainer = (props) => {

  let toysArr = props.toys.map((toy) => {
    return <ToyCard key={toy.id} toy={toy}/>
  })

  return(
    <div id="toy-collection">
      { toysArr }
    </div>
  )
}
```

This is how your `ToyContainer.jsx` file should look at the end of this step.

```javascript
// ToyContainer.jsx

import React from 'react'
import ToyCard from './ToyCard'

const ToyContainer = (props) => {

  let toysArr = props.toys.map((toy) => {
    return <ToyCard key={toy.id} toy={toy}/>
  })

  return(
    <div id="toy-collection">
      { toysArr }
    </div>
  )
}

export default ToyContainer
```

#### 5. In `ToyCard.jsx`, fill out each HTML element with the relevant toy attribute.
First, let's destructure the toy props that we're receiving from the ToyContainer component. Write this statement inside the `render()` method, but before the `return()`.

```javascript
// ToyCard.jsx

class ToyCard extends Component {

  render() {
    let {name, image, likes} = this.props.toy

    return (
      <div className="card">
        <h2>{'' /* Toy's Name */}</h2>
        <img src={'' /* Toy's Image */} alt={'' /* Toy's Name */} className="toy-avatar" />
        <p>{'' /* Toy's Likes */} Likes </p>
        <button className="like-btn">Like {'<3'}</button>
        <button className="del-btn">Donate to GoodWill</button>
      </div>
    )
  }
}
```

Next, place the destructured attributes in the commented sections.

```javascript
// ToyCard.jsx

class ToyCard extends Component {

  render() {
    let {name, image, likes} = this.props.toy
    
    return (
      <div className="card">
        <h2>{ name }</h2>
        <img src={ image } alt={ name } className="toy-avatar" />
        <p>{ likes } Likes </p>
        <button className="like-btn">Like {'<3'}</button>
        <button className="del-btn">Donate to GoodWill</button>
      </div>
    )
  }
}
```

This is how your `ToyCard.jsx` file should look at the end of this step.

```javascript
// ToyCard.jsx

import React, { Component } from 'react'

class ToyCard extends Component {

  render() {
    let {name, image, likes} = this.props.toy
    
    return (
      <div className="card">
        <h2>{ name }</h2>
        <img src={ image } alt={ name } className="toy-avatar" />
        <p>{ likes } Likes </p>
        <button className="like-btn">Like {'<3'}</button>
        <button className="del-btn">Donate to GoodWill</button>
      </div>
    )
  }
}

export default ToyCard
```

Et voilà! That is how you render all the toys on to the page. 🌟

## Challenge 2
**Build out the functionality for the ToyForm. Using the ideas of controlled form and inverse data-flow, think about how to render a new ToyCard for the toy that you created.**

What does this mean?
* When the user fills out the toy form, by inputting a name and image link, the new toy should persist in the backend (our `db.json` file) and show up on the page without refreshing.

#### 1. In `App.js`, create a helper method that will push the new toy instance into the toys array in the state.

```javascript
// App.js

handleClick = () => {
  let newBoolean = !this.state.display
  this.setState({
    display: newBoolean
  })
}

// here's our helper method
addNewToy = () => {

}

render() {
  return(
    ...
  )
}
```

Pass in the new toy instance as an argument.

```javascript
// App.js

addNewToy = (newToy) => {
  
}
```

Create a new variable called `newToysArr`. Set it to equal an array that uses the spread operator to include our existing array of toys from the state, and then the new toy instance. We want to use the spread operator – instead of simply pushing the new toy instance into the array – so that we can make a non-destructive change and avoid directly mutating the state.

```javascript
// App.js

addNewToy = (newToy) => {
  let newToysArr = [...this.state.toys, newToy]
}
```

Use `this.setState()` to set the state's toys attribute to equal the new toys array.

```javascript
// App.js

addNewToy = (newToy) => {
  let newToysArr = [...this.state.toys, newToy]
  this.setState({
    toys: newToysArr
  })
}
```

Now, let's pass down this helper method as props to the `ToyForm` component. This will allow the `ToyForm` to have access to this helper method and invoke it.

```javascript
// App.js

render(){
  return (
    <>
      <Header/>
      { this.state.display
          ?
        // here's where we're passing down the helper method as props
        <ToyForm addNewToy={this.addNewToy}/>
          :
        null
      }
      <div className="buttonContainer">
        <button onClick={this.handleClick}> Add a Toy </button>
      </div>
      <ToyContainer toys={this.state.toys} />
    </>
  )
}
```

This is how your `App.js` file should look at the end of this step.

```javascript
// App.js

import React from 'react'
import './App.css'
import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

class App extends React.Component{
  state = {
    display: false,
    toys: []
  }

  componentDidMount(){
    fetch("http://localhost:3000/toys")
    .then(r => r.json())
    .then((newToysArray) => {
      this.setState({
        toys: newToysArray
      })
    })
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  addNewToy = (newToy) => {
    let newToysArr = [...this.state.toys, newToy]
    this.setState({
      toys: newToysArr
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addNewToy={this.addNewToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} />
      </>
    )
  }
}

export default App
```

#### 2. In `ToyForm.jsx`, create state so that we can save the user's inputs.

```javascript
// ToyForm.jsx

class ToyForm extends Component {
  state = {
    
  }

  render() {
    return(
      ...
    )
  }
}

export default ToyForm
```

Add `name` and `image` as attributes in the state. Set them to equal empty strings.

```javascript
// ToyForm.jsx

class ToyForm extends Component {
  state = {
    name: "",
    image: ""
  }

  render() {
    return(
      ...
    )
  }
}

export default ToyForm
```

#### 3. Create event listeners for each input field in the form.
Create a helper method called `handleChange()` that changes the state whenever a user enters an input for the name and image fields.

```javascript
// ToyForm.jsx

class ToyForm extends Component {
  state = {
    name: "",
    image: ""
  }

  // here's our new helper method
  handleChange = () => {
    
  }

  render() {
    return(
      ...
    )
  }
}

export default ToyForm
```

Pass in `event` as an argument for `handleChange()`.

```javascript
// ToyForm.jsx

class ToyForm extends Component {
  state = {
    name: "",
    image: ""
  }

  handleChange = (event) => {
    
  }

  render() {
    return(
      ...
    )
  }
}

export default ToyForm
```

Write a `this.setState()` method to update the state. We're going to use the name and value attributes of the event's target to dynamically inform us which state attributes are being updated.

```javascript
// ToyForm.jsx

class ToyForm extends Component {
  state = {
    name: "",
    image: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return(
      ...
    )
  }
}

export default ToyForm
```

If this is confusing, let's look at this input field as an example. Here you can see that the HTML element is an `input` tag. Its `name` is set to `image`, so when we call `event.target.name` on this input field, it'll return `image`. The `event.target.value` will be whatever the user enters in the field. The `placeholder` is set to `Enter a toy's image URL...`, so that will be the default text that shows in the input field when it's empty.

```javascript
<input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
```

Now, let's add `onChange` event listeners to each of the input fields in the form. Set the event listeners to equal the helper method that we just wrote, so that it gets invoked every time a change occurs on the input.

```javascript
// ToyForm.jsx

class ToyForm extends Component {
  state = {
    name: "",
    image: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form">
          <h3>Create a toy!</h3>

          {/* we're going to add the onChange event listener at the end of the input tag */}
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text" onChange={this.handleChange}/>
          <br/>

          {/* same idea for this one */}
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text" onChange={this.handleChange}/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    )
  }
}

export default ToyForm
```

#### 4. Create a POST request to save the user's input in the backend.
We're successfully able to change the state to capture the user's input, but now we have to send that data to the backend. You can also write `console.log(this.state.name)` and `console.log(this.state.image)` inside the `render()` method to see the state getting updated dynamically!

Let's create a helper method called `handleSubmit()` that houses our fetch POST request.

```javascript
// ToyForm.jsx

class ToyForm extends Component {
  state = {
    name: "",
    image: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // here's our new helper method
  handleSubmit = () => {

  }

  render() {
    return (
      ...
    )
  }
}

export default ToyForm
```

Pass in `event` as an argument.

```javascript
// ToyForm.jsx

handleSubmit = (event) => {

}
```

Let's stop the page from refreshing when the user hits the submit button by writing in `event.preventDefault()`.

```javascript
// ToyForm.jsx

handleSubmit = (event) => {
  event.preventDefault()
}
```

Write a fetch request using the POST method. Pass in `localhost:3000/toys` to the fetch request. Get the values for the name and image of the new toy instance from the state. Since it's impossible for a newly created toy to have any likes yet, set the likes to equal 0.

```javascript
// ToyForm.jsx

handleSubmit = (event) => {
  event.preventDefault()

  fetch(`localhost:3000/toys`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: this.state.name,
      image: this.state.image,
      likes: 0
    })
  })
  .then()
  .then()
}
```

In the first `then` statement, take the response and turn it into a JSON object.

```javascript
// ToyForm.jsx

handleSubmit = (event) => {
  event.preventDefault()

  fetch(`localhost:3000/toys`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: this.state.name,
      image: this.state.image,
      likes: 0
    })
  })
  .then(r => r.json())
  .then()
}
```

In the second `then` statement, invoke the helper method we wrote in `App.js` called `addNewToy(newToy)`. Pass in the new toy instance as the argument.

```javascript
// ToyForm.jsx

handleSubmit = (event) => {
  event.preventDefault()

  fetch(`localhost:3000/toys`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: this.state.name,
      image: this.state.image,
      likes: 0
    })
  })
  .then(r => r.json())
  .then((newlyCreatedToy) => {
    this.props.addNewToy(newlyCreatedToy)
  })
}
```

#### 5. Add an `onSubmit` event listener to the form. Set the event listener to equal the `handleSubmit()` helper method.
This is how your `ToyForm.js` file should look at the end of this step.

```javascript
// ToyForm.jsx

import React, { Component } from 'react'

class ToyForm extends Component {
  state = {
    name: "",
    image: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  handleSubmit = (event) => {
    event.preventDefault()

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        image: this.state.image,
        likes: 0
      })
    })
    .then(r => r.json())
    .then((newlyCreatedToy) => {
      this.props.addNewToy(newlyCreatedToy)
    })
  }

  render() {
    return (
      <div className="container">

        {/* here's where we're adding the submit event listener*/}
        <form className="add-toy-form" onSubmit={this.handleSubmit}>
          <h3>Create a toy!</h3>

          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text" onChange={this.handleChange}/>

          <br/>

          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text" onChange={this.handleChange}/>

          <br/>

          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    )
  }
}

export default ToyForm
```

<a name="challenge-3"/>

## Challenge 3
**Consider building out the delete functionality. When you click on the `Donate to Goodwill` button, the ToyCard that you clicked on should be removed from the DOM as well as the backend.**

#### 1. In `App.js`, create a helper method for removing a toy from the state's toys array.
#### 2. Pass down the helper method as props to `ToyContainer.jsx`.
#### 3. Pass down this helper method *again* as props to each `ToyCard` component.
#### 4. Create a helper method called `handleDelete()` that has a fetch DELETE request.
Invoke the helper method that was passed down as props.

#### 5. Create an event listener for the `Donate to GoodWill` button on the ToyCard.
Invoke the `handleDelete()` helper method.

## Challenge 4
**Consider building out the like functionality. Clicking on the button should increase the number of likes on the DOM as well as the backend.**

#### 1. In `App.js`, create a helper method for updating a toy from the state's toys array.
#### 2. Pass down the helper method as props to `ToyContainer.jsx`.
#### 3. Pass down this helper method *again* as props to each `ToyCard` component.
#### 4. Create a helper method called `handleDelete()` that has a fetch PATCH request.
Invoke the helper method that was passed down as props.

#### 5. Create an event listener for the `Like` button on the ToyCard.
Invoke the `handleDelete()` helper method.
