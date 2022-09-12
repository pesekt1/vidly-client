import React from "react";
import Form from "./common/form";
import Joi from "joi";
import { saveGenre } from "../services/genreService";

class GenreForm extends Form {
  //attributes cannot be null or undefined because they are used as an input value in the form.
  state = {
    data: {
      name: "",
    },
    errors: {},
  };

  //label is just for rendering the error messages
  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Title"),
  };

  onSubmit = async () => {
    await saveGenre(this.state.data);
    console.log("Genre form submitted to the server.");
    this.props.history.push("/genres");
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Genre</h1>
          {this.renderInput("name", "Genre", "text")}
          {this.renderSubmitButton("Save")}
        </form>
      </div>
    );
  }
}

export default GenreForm;
