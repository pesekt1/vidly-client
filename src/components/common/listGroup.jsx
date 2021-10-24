import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    const { onItemSelect, items, selectedGenre } = this.props;

    return (
      <ul className="list-group">
        <li
          className={
            !selectedGenre ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onItemSelect()}
        >
          All genres
        </li>
        {items.map((item) => (
          <li
            key={items._id}
            onClick={() => onItemSelect(item)}
            className={
              selectedGenre === item
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {item.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default ListGroup;
