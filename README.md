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

## Sorting the movies: part 3

- Refactor TableBody component:

Create helper methods:
```javascript
renderCell(item, column) {
  return column.content ? column.content(item) : _.get(item, column.path);
}

assignKey(item, column) {
  return item._id + (column.path || column.key);
}
```
Refactor the render method:
```javascript
  render() {
    const { data, columns } = this.props;
    //we take the data and for each item we create cells for each column.
    // _.get() - this allows us to give nested path because for genre the path is genre.name
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.assignKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
```

Adding a sort icon:

Install font-awesome-free and add the css to our index.js:

https://www.npmjs.com/package/@fortawesome/fontawesome-free

index.js:
```javascript
import "@fortawesome/fontawesome-free/css/all.css";
```

In the TableHeader we render an icon just after the header text - we use renderSortIcon function:
```javascript
{columns.map((column) => (
  <th
    className={column.path ? "clickable" : ""}
    key={column.path || column.key}
    onClick={() => (column.path ? this.raiseSort(column.path) : null)}
  >
    {column.label} {this.renderSortIcon(column)}
  </th>
```

renderSortIcon: 
  - not sorted columns dont get the icon
  - sorted column get either up or down icon

```javascript
  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null; //not sorted column

    //icons from font-awesome-free
    return sortColumn.order === "asc" ? (
      <i className="fas fa-sort-up" />
    ) : (
      <i className="fas fa-sort-down" />
    );
  };
```

Create a style for the header so that it looks clickable:

index.css: create a custom class clickable:
```javascript
.clickable {
  cursor: pointer;
}
```

Now we can use this class for our header (But not for the Like and Delete column):
```javascript
{columns.map((column) => (
  <th
    className={column.path ? "clickable" : ""}
```

Extracting Table component: To make the code cleaner we can extract a Table component which will be composed of TableHeader and TableBody:

```javascript
class Table extends Component {
  render() {
    const { columns, sortColumn, onSort, data, onLike, onDelete } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody
          columns={columns}
          data={data}
          onLike={onLike}
          onDelete={onDelete}
        />
      </table>
    );
  }
}
```

MoviesTable - use the Table component:
```javascript
  render() {
    const { movies, onLike, onDelete, sortColumn, onSort } = this.props;

    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={movies}
        onLike={onLike}
        onDelete={onDelete}
      />
    );
  }
```

Refactoring: Movies component - Extract the logic from the render method:

```javascript
getPaginatedMovies = () => {
  const { currentPage, pageSize, movies, selectedGenre, sortColumn } =
    this.state;

  const filteredMovies = selectedGenre
    ? movies.filter((m) => m.genre._id === selectedGenre._id)
    : movies;

  const sortedMovies = _.orderBy(
    filteredMovies,
    [sortColumn.path],
    [sortColumn.order]
  );

  const paginatedMovies = paginate(
    sortedMovies,
    currentPage,
    pageSize,
    sortColumn
  );

  return { paginatedMovies, moviesCount: filteredMovies.length };
};
```

Movies render method - use the extracted method to get paginated movies and movies count:

```javascript
const { paginatedMovies, moviesCount } = this.getPaginatedMovies();
```