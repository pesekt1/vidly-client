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
```javascript

```

Change the structure of movies component - 2 columns, left will be for the listGroup:
```javascript
<div className="row">
  <div class="col-2">
  <div class="col-2">
```

Use componentDidMount() to initialize to load genres and movies, it should not be done directly on the state object.

```javascript
class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    currentPage: 1,
    pageSize: 4,
  };

  componentDidMount() {
    this.setState({
      genres: getGenres(),
      movies: getMovies(),
    });
  }
```

```javascript

```

```javascript

```

```javascript

```

```javascript

```

```javascript

```