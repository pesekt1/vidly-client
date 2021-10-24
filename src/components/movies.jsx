import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../services/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: null,
  };

  componentDidMount() {
    this.setState({
      genres: getGenres(),
      movies: getMovies(),
    });
  }

  handleDelete = (movie) => {
    //deleteMovie(movie._id);
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
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

  render() {
    const { length: count } = this.state.movies;
    const { currentPage, pageSize, movies, genres, selectedGenre } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const filteredMovies = selectedGenre
      ? movies.filter((m) => m.genre._id === selectedGenre._id)
      : movies;

    const paginatedMovies = paginate(filteredMovies, currentPage, pageSize);

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
          <p>Showing {filteredMovies.length} movies from the database.</p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th>Like</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginatedMovies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsCount={filteredMovies.length}
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
