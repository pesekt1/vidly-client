import React from "react";
import Form from "./common/form";
import Joi from "joi";
import userService from "../services/userService";
import { toast } from "react-toastify";
import auth from "../services/authService";

class RegisterForm extends Form {
  //username and password cannot be null or undefined because they are used as an input value in the form.
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  //label is just for rendering the error messages
  schema = {
    username: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "dk"] } })
      .required()
      .label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().min(5).required().label("Name"),
  };

  onSubmit = async () => {
    console.log("registration submitted to the server");
    try {
      const response = await userService.save(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      //this.props.history.replace("/");
      window.location = "/"; //we want full reload - to trigger app.js componentDitMount where we decode jwt to get the user
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data; //set error on the username input field
        this.setState({ errors });

        toast.error(error.response.data); //toast error message
      }
    }
  };

  //name, label, type
  render() {
    return (
      <div>
        <h1>register from</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name", "text")}
          {this.renderSubmitButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
