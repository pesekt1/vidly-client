import React from "react";
import Form from "./common/form";
import Joi from "joi";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

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

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMove() {
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    try {
      const { data: movie } = await getMovie(this.props.match.params.id);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMove();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
      img: movie.img,
    };
  }

  onSubmit = async () => {
    await saveMovie(this.state.data);
    console.log("Movie form submitted to the server.");
    this.props.history.push("/movies");
  };

  render() {
    const imageUrl = "http://localhost:3000/img/";

    const imgStyle = {
      backgroundImage: `url(${imageUrl + this.state.data.img})`,
      backgroundSize: "cover",
    };

    return (
      <>
        <div className="row">
          <div className="col-3">
            {" "}
            <form onSubmit={this.handleSubmit}>
              <h1>Movie</h1>
              {this.renderInput("title", "Title", "text")}
              {this.renderSelect("genreId", "Genre", this.state.genres)}
              {this.renderInput("numberInStock", "Number in stock", "text")}
              {this.renderInput("dailyRentalRate", "Rate", "text")}
              {this.renderSubmitButton("Save")}
            </form>
          </div>
          <div className="col">
            <img style={imgStyle} src={imageUrl + this.state.data.img} />
          </div>
        </div>

        <div></div>
      </>
    );
  }
}

export default MovieForm;
