# Vidly client - React.js

## Branches sequence
- Hello world
- Movies list component
- Delete-button

## Delete button

- Add one more row to the movies table for the delete button:
```javascript
<td>
  <button
    onClick={() => this.handleDelete(movie)}
    className="btn btn-danger btn-sm"
  >
    Delete
  </button>
</td>
```

- onClick is handled by handleDelete function:
```javascript
  handleDelete = (movie) => {
    //deleteMovie(movie._id);
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };

```
- Conditional rendering: If there are no movies, render the message, otherwise render the table:
```javascript
  render() {
    const { length: count } = this.state.movies;

    if (count === 0) return <p>There are no movies in the database.</p>;

    return (
      <React.Fragment>
        <p>Showing {count} movies from the database.</p>
```

- index.css:  change padding so that there is space between the top of the page:
```css
body {
  padding: 20px 0 0 0;
```

