# Vidly client - React.js

## Sorting the movies: part 2

We have a MovieTable component with sorting but it cannot be reused for anything else than movies. We can redesign the code and create reusable components like TableHeader and TableBody. Then we can componse MovieTable or any other table from these reusable components which will contain the sorting functionality.

- Extract TableHeader component:
```javascript
class TableHeader extends React.Component {
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
    const { columns } = this.props;

    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.path || column.key}
              onClick={() => (column.path ? this.raiseSort(column.path) : null)}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}
```

- NOTE: 
  - if column does not have a path attribute, we use key attribute to set the key.
  - onClick is only for the columns with a path attribute, we dont want it for like and delete.
  - We moved raiseSort function here, now it is fully reusable table header with sorting.


Use TableHeader in movies component: define the columns:

```javascript
import TableHeader from "./common/tableHeader";

class MoviesTable extends Component {
  columns = [
    { label: "Title", path: "title" },
    { label: "Genre", path: "genre.name" },
    { label: "Stock", path: "numberInStock" },
    { label: "Rate", path: "dailyRentalRate" },
    { label: "Like", key: "like" },
    { key: "delete" },
  ];

  render() {
    const { movies, onLike, onDelete, sortColumn, onSort } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <tbody>
        ...
```

Extracting the TableBody component:

- In MoviesTable we need to provide html or react elements to the Like and Delete columns.
- We can assign an arrow function that returns the react or html element:

```javascript
class MoviesTable extends Component {
  columns = [
    { label: "Title", path: "title" },
    { label: "Genre", path: "genre.name" },
    { label: "Stock", path: "numberInStock" },
    { label: "Rate", path: "dailyRentalRate" },
    {
      label: "Like",
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];
```

- TableBody component:

If a column contains content attribute then call the function that returns the content. Otherwise use lodash _.get(item, column.path) to show the item:

```javascript
import _ from "lodash";

class TableBody extends Component {
  render() {
    const { data, columns } = this.props;

    //we take the data and for each item we create cells for each column.
    // _.get() - this allows us to give nested path because for genre the path is genre.name
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={column.path || column.key}>
                {column.content
                  ? column.content(item)
                  : _.get(item, column.path)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}
```

MoviesTable render method: Using TableHeader and TableBody to compose a table:

```javascript
  render() {
    const { movies, onLike, onDelete, sortColumn, onSort } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody
          columns={this.columns}
          data={movies}
          onLike={onLike}
          onDelete={onDelete}
        />
      </table>
    );
  }
```