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