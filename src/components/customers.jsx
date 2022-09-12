import React, { Component } from "react";
import Pagination from "./common/pagination";
import { paginate } from "../services/paginate";
import CustomersTable from "./customersTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import { getCustomers, deleteCustomer } from "../services/customerService";
import { toast } from "react-toastify";

class Customers extends Component {
  state = {
    customers: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "last_name", order: "asc" },
    searchQuery: "",
  };

  async componentDidMount() {
    const { data: customers } = await getCustomers();
    this.setState({ customers: customers });
  }

  handleDelete = async (customer) => {
    const originalCustomers = this.state.customers;
    const customers = this.state.customers.filter(
      (m) => m._id !== customer._id
    );
    this.setState({ customers: customers });

    try {
      await deleteCustomer(customer._id);
    } catch (error) {
      const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

      if (expectedError) toast.error("This customer does not exist.");
      this.setState({ customers: originalCustomers });
    }

    //change current page if page empty
    if (
      customers.length <=
      (this.state.currentPage - 1) * this.state.pageSize
    ) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn: sortColumn, currentPage: 1 });
  };

  getPaginatedCustomers = () => {
    const { currentPage, pageSize, customers, sortColumn, searchQuery } =
      this.state;

    let filteredCustomers = customers;
    if (searchQuery) {
      filteredCustomers = customers.filter((m) =>
        m.last_name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    let sortedCustomers = _.orderBy(
      filteredCustomers,
      [sortColumn.path],
      [sortColumn.order]
    );

    const paginatedCustomers = paginate(
      sortedCustomers,
      currentPage,
      pageSize,
      sortColumn
    );

    return {
      paginatedCustomers,
      customersCount: filteredCustomers.length,
    };
  };

  render() {
    const { currentPage, pageSize, sortColumn, searchQuery, customers } =
      this.state;

    if (customers.length === 0)
      return <p>There are no movies in the database.</p>;

    const { paginatedCustomers, customersCount } = this.getPaginatedCustomers();

    return (
      <>
        {/* show the button only if user is logged in */}
        {this.props.user && (
          <Link to="/customers/new" className="btn btn-primary">
            New Customer
          </Link>
        )}

        <p style={{ paddingTop: 25 }}>
          Showing {customersCount} customers from the database.
        </p>

        <SearchBox value={searchQuery} onChange={this.handleSearch} />

        <CustomersTable
          customers={paginatedCustomers}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
          sortColumn={sortColumn}
        />
        <Pagination
          itemsCount={customersCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </>
    );
  }
}

export default Customers;
