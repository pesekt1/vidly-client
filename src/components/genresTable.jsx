import React, { Component } from "react";
import Table from "./common/table";

class GenresTable extends Component {
  columns = [
    {
      label: "Genre",
      path: "name",
    },
  ];

  render() {
    const { genres, sortColumn, onSort } = this.props;

    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={genres}
      />
    );
  }
}

export default GenresTable;
