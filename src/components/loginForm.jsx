import React from "react";
import Input from "./common/input";

class LoginForm extends React.Component {
  //username and password cannot be null or undefined because they are used as an input value in the form.
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  handleChange = (e) => {
    const errors = { ...this.state.errors }; //no reference
    const { id, value } = e.currentTarget;

    const propertyError = this.validateInputProperty(id, value);
    propertyError ? (errors[id] = propertyError) : delete errors[id];

    const account = { ...this.state.account }; //no reference
    account[id] = value; //this works only because the id is the name of the attribute

    this.setState({ account, errors });
  };

  validateInputProperty(propertyName, value) {
    return value === "" ? `${propertyName} is required` : null;
  }

  validateInput() {
    const errors = {};
    const { account } = this.state;
    if (account.username.trim("") === "")
      errors.username = "Username is required";
    if (account.password.trim("") === "")
      errors.password = "Password is required";

    return Object.keys(errors).length === 0 ? null : errors;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validateInput();
    this.setState({ errors: errors || {} }); //if null set it to {} to avoid exception
    if (errors) return;

    //call the server
    console.log("submitted");
    console.log(this.state.account);
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            onChange={this.handleChange}
            id="username"
            value={account.username}
            error={errors.username}
            type="text"
          />
          <Input
            onChange={this.handleChange}
            id="password"
            value={account.password}
            error={errors.password}
            type="password"
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
