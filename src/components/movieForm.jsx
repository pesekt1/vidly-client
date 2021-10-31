import React from "react";
import Form from "./common/form";
import Joi from "joi";

class MovieForm extends Form {
  //attributes cannot be null or undefined because they are used as an input value in the form.
  state = {
    data: { title: "", genre: "", numberInStock: "", rate: "" },
    errors: {},
  };

  //label is just for rendering the error messages
  schema = {
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    numberInStock: Joi.string().required().label("Number in stock"),
    rate: Joi.string().required().label("Rate"),
  };

  render() {
    return (
      <div>
        <h1>Movie {this.props.match.params.id}</h1>
        <button
          className="btn btn-primary"
          onClick={() => this.props.history.push("/movies")}
        >
          Save
        </button>
      </div>
    );
  }
}

export default MovieForm;
