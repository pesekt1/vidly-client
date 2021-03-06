import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

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

export default Table;
