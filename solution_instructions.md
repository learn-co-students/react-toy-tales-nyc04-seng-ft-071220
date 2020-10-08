# Solution Instructions
## Table of contents
* [Getting started](#getting-started)
* [Challenge 1](#challenge-1)
* [Challenge 2](#challenge-2)
* [Challenge 3](#challenge-3)
* [BONUS: Challenge 4](#challenge-4)

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

<a name="challenge-1"/>

## Challenge 1
**Render the ToyCard component on to the page for each toy instance.**

What does this mean?
* Access the information about the toys from the backend (which is our `db.json` file).
* Send all the toy instances to the ToyContainer.
* Iterate through all the toy instances and return a ToyCard.

#### 1. Add a `toys` attribute to the state in `App.js` and assign it to an empty array.

```javascript
state = {
  display: false,
  toys: []
}
```

#### 2. Write a `componentDidMount()` method and a GET fetch request to get all the toy instances.
Pass in `localhost:3000/toys` to the fetch request.
In the first `then` statement, take the response and turn it into a JSON object.

```javascript
componentDidMount(){
  fetch("http://localhost:3000/toys")
  .then(r => r.json())
  .then()
}
```

In the second `then` statement, take the new toys array from our JSON object and change the state for the `toys` attribute. We're going to update the state so that the `toys` attribute is no longer an empty array, but instead, filled with all the new toy instances.

```javascript
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

Et voilà! That is how you solve all the deliverables for this lab. 🌟