# Vidly client - React.js

## Sorting the movies: part 1

First we refactor our movies component, our render method is too big. We have custom components ListGroup, Like, Pagination mixed with a html table of movies - we can extract it into a MoviesTable component:

- Extracting the component:
```javascript
const MoviesTable = (props) => {
  const { movies, onLike, onDelete } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Stock</th>
          <th>Rate</th>
          <th>Like</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like liked={movie.liked} onClick={() => onLike(movie)} />
            </td>
            <td>
              <button
                onClick={() => onDelete(movie)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
```

- In the movies we can now use the MoviesTable component with props:
```javascript
<MoviesTable
  movies={paginatedMovies}
  onLike={this.handleLike}
  onDelete={this.handleDelete}
/>
```

- Sorting: We want to sort by each column when we click on the header.

It is better to promote MoviesTable to a class because it should contain the raiseSort method. Like this it will be decoupled from movies component.

If we click on a header, it will switch the sort order.

```javascript
class MoviesTable extends Component {
  raiseSort = (path) => {
    let sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.order = "asc";
      sortColumn.path = path;
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { movies, onLike, onDelete } = this.props;

    return (
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => this.raiseSort("title")}>Title</th>
            <th onClick={() => this.raiseSort("genre.name")}>Genre</th>
            <th onClick={() => this.raiseSort("numberInStock")}>Stock</th>
            <th onClick={() => this.raiseSort("dailyRentalRate")}>Rate</th>
```

- movies component: props for MoviesTable
```javascript
<MoviesTable
  movies={paginatedMovies}
  onLike={this.handleLike}
  onDelete={this.handleDelete}
  onSort={this.handleSort}
  sortColumn={sortColumn}
/>
```

- movies - add sortColumn to the state:
```javascript
class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };
```

- movies - handleSort:
```javascript
handleSort = (sortColumn) => {
  this.setState({ sortColumn: sortColumn });
};
```

- movies - sorting with lodash package:
```javascript
const sortedMovies = _.orderBy(
  filteredMovies,
  [sortColumn.path],
  [sortColumn.order]
);
```

Notice, that onSort function is not assigned dirctly, instead, it is raised from raiseSort:

- MoviesTable:
```javascript
<th onClick={() => this.raiseSort("title")}>Title</th>

class MoviesTable extends Component {
raiseSort = (path) => {
...
  this.props.onSort(sortColumn);
};
```

- movies:
```javascript
<MoviesTable
  onSort={this.handleSort}
```