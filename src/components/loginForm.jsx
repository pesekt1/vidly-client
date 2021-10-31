import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
  //username and password cannot be null or undefined because they are used as an input value in the form.
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  //label is just for rendering the error messages
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  onSubmit = () => {
    //call the server
    console.log("submitted");
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "text")}
          {this.renderInput("password", "Password", "password")}
          {this.renderSubmitButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
