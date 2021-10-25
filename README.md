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

```javascript

```

```javascript

```