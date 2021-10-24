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
