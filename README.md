# Vidly client - React.js

## Branches sequence
- Hello world
- Movies list component
- Delete-button
- like-component
- pagination
- filtering

## Filtering:

Create a filtering of the movies based on the genre.

Use a list group from bootstrap:
https://getbootstrap.com/docs/4.0/components/list-group/

- listGroup component:

We use textProperty and valueProperty to decouple this component from genres.

We add extra item: All genres - to deactivate filtering.

```javascript
import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    const { onItemSelect, items, selectedItem, textProperty, valueProperty } =
      this.props;

    return (
      <ul className="list-group">
        <li
          className={
            !selectedItem ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onItemSelect()}
        >
          All genres
        </li>
        {items.map((item) => (
          <li
            key={item[valueProperty]}
            onClick={() => onItemSelect(item)}
            className={
              selectedItem === item
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    );
  }
}

export default ListGroup;
```

Change the structure of movies component - 2 columns, left will be for the listGroup:
```javascript
<div className="row">
  <div className="col-3">
  <div className="col">
```

Use componentDidMount() to initialize to load genres and movies, it should not be done directly on the state object.

```javascript
class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: null,
  };

  componentDidMount() {
    this.setState({
      genres: getGenres(),
      movies: getMovies(),
    });
  }
```

- handler for selecting the genre:
```javascript
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre });
  };
```

Render movie component:
```javascript
  render() {
    const { length: count } = this.state.movies;
    const { currentPage, pageSize, movies, genres, selectedGenre } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const filteredMovies = selectedGenre
      ? movies.filter((m) => m.genre._id === selectedGenre._id)
      : movies;

    const paginatedMovies = paginate(filteredMovies, currentPage, pageSize);
```

ListGroup component with props:
```javascript
...
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            selectedItem={selectedGenre}
            items={genres}
            onItemSelect={this.handleGenreSelect}
            textProperty="name"
            valueProperty="_id"
          />
```

Using paginatedMovies:
```javascript
<tbody>
  {paginatedMovies.map((movie) => (
```

In Pagination we use filteredMovies length:
```javascript
<Pagination
  itemsCount={filteredMovies.length}
```

```javascript

```

Handle delete - if we run out of items in current page we need to decrease the current page:
```javascript
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
    //change current page if page empty
    if (movies.length <= (this.state.currentPage - 1) * this.state.pageSize) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  };
```