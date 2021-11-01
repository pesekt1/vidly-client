import React from "react";
import Form from "./common/form";
import Joi from "joi";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Form {
  //attributes cannot be null or undefined because they are used as an input value in the form.
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  //label is just for rendering the error messages
  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().required().label("Number in stock"),
    dailyRentalRate: Joi.number().required().label("Rate"),
  };

  componentDidMount() {
    this.setState({ genres: getGenres() });

    const movieId = this.props.match.params.id;
    console.log(movieId);
    if (movieId === "new") return;

    const movie = getMovie(this.props.match.params.id);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  onSubmit = () => {
    //call to the server
    saveMovie(this.state.data);
    console.log("Movie form submitted to the server.");
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Movie</h1>
          {this.renderInput("title", "Title", "text")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in stock", "text")}
          {this.renderInput("dailyRentalRate", "Rate", "text")}
          {this.renderSubmitButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
