import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  render() {
    const { data, columns } = this.props;

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
            {/* <td>
              <Like liked={item.liked} onClick={() => onLike(item)} />
            </td>
            <td>
              <button
                onClick={() => onDelete(item)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td> */}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
