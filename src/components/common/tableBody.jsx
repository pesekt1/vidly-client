import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  render() {
    const { data, columns } = this.props;

    //we take the data and for each item we create a row.
    // then for each column, we create a cell and fill it.
    // _.get() - this allows us to give nested path because for genre the path is genre.name and we could not use item["genre.name"]
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

export default TableBody;
