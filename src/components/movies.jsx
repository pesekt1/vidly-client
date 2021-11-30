import React, { Component } from "react";
import Pagination from "./common/pagination";
import { paginate } from "../services/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import { getGenres } from "../services/genreService";
import { getMovies, deleteMovie } from "../services/movieService";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
    selecterGenre: null,
  };

  async componentDidMount() {
    const { data: genres } = await getGenres();
    const { data: movies } = await getMovies();

    this.setState({ genres, movies });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });

    try {
      await deleteMovie(movie._id);
    } catch (error) {
      const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

      if (expectedError) toast.error("This movie does not exist.");
      this.setState({ movies: originalMovies });
    }

    //change current page if page empty
    if (movies.length <= (this.state.currentPage - 1) * this.state.pageSize) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies]; // spread operator - no reference
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] }; //clone the object... no reference
    movies[index].liked = !movies[index].liked; //Boolean conversion of null is FALSE
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn: sortColumn, currentPage: 1 });
  };

  getPaginatedMovies = () => {
    const {
      currentPage,
      pageSize,
      movies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    // this was used before the searchBox implementation
    // const filteredMovies = selectedGenre
    //   ? movies.filter((m) => m.genre._id === selectedGenre._id)
    //   : movies;

    let filteredMovies = movies;
    if (searchQuery) {
      filteredMovies = movies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filteredMovies = movies.filter((m) => m.genre._id === selectedGenre._id);
    }

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const paginatedMovies = paginate(
      sortedMovies,
      currentPage,
      pageSize,
      sortColumn
    );

    return { paginatedMovies, moviesCount: filteredMovies.length };
  };

  render() {
    const {
      currentPage,
      pageSize,
      genres,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    if (this.state.movies.length === 0)
      return <p>There are no movies in the database.</p>;

    const { paginatedMovies, moviesCount } = this.getPaginatedMovies();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            selectedItem={selectedGenre}
            items={genres}
            onItemSelect={this.handleGenreSelect}
            textProperty="name"
            valueProperty="_id"
          />
        </div>
        <div className="col">
          {/* show the button only if user is logged in */}
          {this.props.user && (
            <Link to="/movies/new" className="btn btn-primary">
              New Movie
            </Link>
          )}

          <p style={{ paddingTop: 25 }}>
            Showing {moviesCount} movies from the database.
          </p>

          <SearchBox value={searchQuery} onChange={this.handleSearch} />

          <MoviesTable
            movies={paginatedMovies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={moviesCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
