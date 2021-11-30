import React from "react";
import Joi from "joi";
import Form from "./common/form";
import auth from "../services/authService";
import { toast } from "react-toastify";

class LoginForm extends Form {
  //username and password cannot be null or undefined because they are used as an input value in the form.
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  //label is just for rendering the error messages
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
  };

  onSubmit = async () => {
    //call the server
    console.log("login submitted to the server");
    try {
      await auth.login(this.state.data); //get jwt from web server and save it to localStorage

      //this.props.history.replace("/"); //redirect to the main page
      window.location = "/"; //we want full reload - to trigger app.js componentDitMount where we decode jwt to get the user
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        //set error to both input fields, we dont want to specifi which one was wrong.
        errors.username = error.response.data;
        errors.password = error.response.data;
        this.setState({ errors });

        toast.error(error.response.data);
      }
    }
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
