import React, { Component } from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";
import auth from "../services/authService";

class CustomersTable extends Component {
  columns = [
    {
      label: "First Name",
      path: "first_name",
      content: (customer) => (
        <Link to={`/customers/${customer._id}`}>{customer.first_name}</Link>
      ),
    },
    { label: "Last Name", path: "last_name" },
    { label: "Address", path: "address" },
    { label: "City", path: "city" },
    { label: "State", path: "state" },
    { label: "Points", path: "points" },
    { label: "Phone", path: "phone" },
    { label: "Birth date", path: "birth_date" },
  ];

  //separate object because we want to append it dynamically - only if user is logged in and admin.
  deleteColumn = {
    key: "delete",
    content: (customer) => (
      <button
        onClick={() => this.props.onDelete(customer)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { customers, onDelete, sortColumn, onSort } = this.props;

    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={customers}
        onDelete={onDelete}
      />
    );
  }
}

export default CustomersTable;
