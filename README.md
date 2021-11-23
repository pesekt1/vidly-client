# Vidly client - React.js

## Branches sequence
- Hello world
- Movies list component
- Delete-button
- like-component
- pagination
- filtering
- sorting-1
- sorting-2
- sorting-3
- routing
- forms-1
- forms-2
- forms-3
- forms-4
- forms-5

## Forms - Part 5

Note that we removed joi-browser package and instead installed joi package:
https://joi.dev/api/?v=17.4.2


```
yarn remove joi-browser
yarn add joi
```

Joi package has different syntax:
```javascript
validateInput() {
  const joiOptions = { abortEarly: false };
  const result = Joi.object(this.schema).validate(
    this.state.data,
    joiOptions
  );
```

Create a registration form - use the Form component:
```javascript
import Joi from "joi";

class RegisterForm extends Form {
  //username and password cannot be null or undefined because they are used as an input value in the form.
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  //label is just for rendering the error messages
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  onSubmit = () => {
    //call the server
    console.log("registration submitted to the server");
  };

  //name, label, type
  render() {
    return (
      <div>
        <h1>register from</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name", "text")}
          {this.renderSubmitButton("Register")}
        </form>
      </div>
    );
  }
}
```

Implement our movie form:
- title
- genre
- number in stock
- daily rental rate
- save button

Genre should be input with options so that we can select.


```javascript
import Joi from "joi";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Form {
  //attributes cannot be null or undefined because they are used as an input value in the form.
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  //label is just for rendering the error messages
  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().required().label("Number in stock"),
    dailyRentalRate: Joi.number().required().label("Rate"),
  };

  componentDidMount() {
    this.setState({ genres: getGenres() });

    const movieId = this.props.match.params.id;

    if (movieId === "new") return;

    const movie = getMovie(this.props.match.params.id);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  onSubmit = () => {
    //call to the server
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Movie</h1>
          {this.renderInput("title", "Title", "text")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in stock", "text")}
          {this.renderInput("dailyRentalRate", "Rate", "text")}
          {this.renderSubmitButton("Save")}
        </form>
      </div>
    );
  }
}
```
In componentDidMount: 
- we get the genres using our fake service
- if id === new ... we dont do anything, because we just want an empty form
- we get a movie from our fake service, if it does not exist we redirect to "not-found"
- we fill the state.data with the movie - but we map genre to genreId

onSubmit we save the movie and redirect to movies component.

Note that we used a new component Select: it gets the options array - objects must have _id and name property.
```javascript
class Select extends React.Component {
  render() {
    const { id, error, label, options, ...rest } = this.props;

    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <select className="form-control" id={id} {...rest}>
          <option value=""></option>
          {options.map((o) => (
            <option key={o._id} value={o._id}>
              {o.name}
            </option>
          ))}
        </select>
      </div>
    );
```

We have a helper method renderSelect in our Form component: value={data[name]} will give the Select component the actual option - the genreId for the movie we are looking at.
```javascript
  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;

    return (
      <Select
        onChange={this.handleChange}
        label={label}
        id={name}
        value={data[name]}
        options={options}
        error={errors[name]}
      />
    );
  };
```

In movies component we also have a button: "New Movie": it will go to the route "movies/:id"
```javascript
<Link to="/movies/new" className="btn btn-primary">
  New Movie
</Link>
```

Corrected bugs in fakeMovieService:
```javascript
export function saveMovie(movie) {
  console.log(movie);
  let movieInDb = movies.find((m) => m._id === movie._id) || {};
  movieInDb.title = movie.title;
```

```javascript
if (!movieInDb._id) {
  movieInDb._id = Date.now().toString();
```

Bug in renderSubmitButton in the form component:
```javascript
  renderSubmitButton = (label) => {
    const { errors } = this.state;
    return (
      <button
        type="submit"
        className="btn btn-primary"
        disabled={Object.keys(errors).length > 0}
      >
        {label}
      </button>
```

When we click on "New Movie" button, the submit button will not be deactivated because there are no errors - validateInput() method was not executed.

Solution: We use the validateInput() method:
```javascript
  renderSubmitButton = (label) => {
    return (
      <button disabled={this.validateInput()} className="btn btn-primary" type="submit">
        {label}
      </button>
    );
  };
```

SearchBox for movies:
```javascript
import React, { Component } from "react";

class Searchbox extends Component {
  render() {
    return (
      <input
        type="text"
        name="query"
        className="form-control my-3"
        placeholder="Search..."
        value={this.props.value}
        onChange={(e) => this.props.onChange(e.currentTarget.value)}
      ></input>
    );
  }
}

export default Searchbox;
```

in movies component - in the render method:
```javascript
...
<SearchBox value={searchQuery} onChange={this.handleSearch} />
<MoviesTable
...
```

movies - add variables to the state:
```javascript
class Movies extends Component {
  state = {
    ...
    searchQuery: "",
    selecterGenre: null,
```

handleSearch method: set the searchQuery in the state, reset selectedGenre and currentPage.
```javascript
handleSearch = (query) => {
  this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
};
```

handleGenreSelect - reset the searchQuery. Note: We cannot set it to null. Because searchBox is using this value and it cannot be null or undefined because searchBox is a controlled component.
```javascript
handleGenreSelect = (genre) => {
  this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
};
```

movies - change the filtering logic: 3 options:
 - searchQuery exists
 - selectedGenre exists - and it has an _id
 - none of the above - then we get all movies
  
```javascript
  getPaginatedMovies = () => {
    ...
    let filteredMovies = movies;
    if (searchQuery) {
      filteredMovies = movies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filteredMovies = movies.filter((m) => m.genre._id === selectedGenre._id);
    }
```



```javascript

```