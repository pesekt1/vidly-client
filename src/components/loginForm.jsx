import React from "react";
import Input from "./common/input";
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
    const { data, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            onChange={this.handleChange}
            id="username"
            value={data.username}
            error={errors.username}
            type="text"
          />
          <Input
            onChange={this.handleChange}
            id="password"
            value={data.password}
            error={errors.password}
            type="password"
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={Object.keys(errors).length > 0}
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
