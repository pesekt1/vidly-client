import React, { Component } from "react";
import { getGenres } from "../services/genreService";
import GenresTable from "./genresTable";
import Pagination from "./common/pagination";
import { paginate } from "../services/paginate";
import _ from "lodash";
import SearchBox from "./common/searchBox";
import { Link } from "react-router-dom";

class Genres extends Component {
  state = {
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: null,
    sortColumn: { path: "name", order: "asc" },
    searchQuery: "",
  };

  async componentDidMount() {
    const { data: genres } = await getGenres();
    this.setState({ genres: genres });
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn: sortColumn, currentPage: 1 });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPaginatedGenres = () => {
    const {
      currentPage,
      pageSize,
      genres,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filteredGenres = genres;
    if (searchQuery) {
      filteredGenres = genres.filter((m) =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filteredGenres = genres.filter((m) => m.genre._id === selectedGenre._id);
    }

    const sortedGenres = _.orderBy(
      filteredGenres,
      [sortColumn.path],
      [sortColumn.order]
    );

    const paginatedGenres = paginate(
      sortedGenres,
      currentPage,
      pageSize,
      sortColumn
    );

    return {
      paginatedGenres: paginatedGenres,
      genresCount: filteredGenres.length,
    };
  };

  render() {
    const { currentPage, pageSize, sortColumn, searchQuery } = this.state;

    if (this.state.genres.length === 0)
      return <p>There are no genres in the database.</p>;

    const { paginatedGenres, genresCount } = this.getPaginatedGenres();

    return (
      <>
        {/* show the button only if user is logged in */}
        {this.props.user && (
          <Link to="/genres/new" className="btn btn-primary">
            New Genre
          </Link>
        )}

        <p style={{ paddingTop: 25 }}>
          Showing {genresCount} genres from the database.
        </p>

        <SearchBox value={searchQuery} onChange={this.handleSearch} />

        <GenresTable
          genres={paginatedGenres}
          onSort={this.handleSort}
          sortColumn={sortColumn}
        />
        <Pagination
          itemsCount={genresCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </>
    );
  }
}

export default Genres;
