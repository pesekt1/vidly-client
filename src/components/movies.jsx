import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../services/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";

class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    this.setState({
      genres: getGenres(),
      movies: getMovies(),
    });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });

    deleteMovie(movie._id); //fake http service

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
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn: sortColumn, currentPage: 1 });
  };

  getPaginatedMovies = () => {
    const { currentPage, pageSize, movies, selectedGenre, sortColumn } =
      this.state;

    const filteredMovies = selectedGenre
      ? movies.filter((m) => m.genre._id === selectedGenre._id)
      : movies;

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
    const { currentPage, pageSize, genres, selectedGenre, sortColumn } =
      this.state;

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
          <Link to="/movies/new" className="btn btn-primary">
            New Movie
          </Link>
          <p style={{ paddingTop: 25 }}>
            Showing {moviesCount} movies from the database.
          </p>
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
