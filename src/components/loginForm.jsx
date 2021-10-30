import React from "react";
import Input from "./common/input";
import Joi from "joi-browser";

class LoginForm extends React.Component {
  //username and password cannot be null or undefined because they are used as an input value in the form.
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  //label is just for rendering the error messages
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  handleChange = (e) => {
    const errors = { ...this.state.errors }; //no reference
    const { id, value } = e.currentTarget;

    const propertyError = this.validateInputProperty(id, value);
    propertyError ? (errors[id] = propertyError) : delete errors[id]; //add the error or delete

    const account = { ...this.state.account }; //no reference
    account[id] = value; //this works only because the id is the name of the attribute

    this.setState({ account, errors });
  };

  validateInputProperty(propertyName, value) {
    const obj = { [propertyName]: value };
    const schema = { [propertyName]: this.schema[propertyName] };
    const result = Joi.validate(obj, schema);
    return result.error ? result.error.details[0].message : null;
  }

  //abortEarly: false ... we want to see all the errors, not just the first one.
  validateInput() {
    const joiOptions = { abortEarly: false };
    const result = Joi.validate(this.state.account, this.schema, joiOptions);
    if (!result.error) return null;

    const errors = {};
    result.error.details.map((d) => (errors[d.path[0]] = d.message)); //path[0] contains the property name
    return Object.keys(errors).length === 0 ? null : errors;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validateInput();
    this.setState({ errors: errors || {} }); //if null set it to {} to avoid exception
    if (errors) return;

    //call the server
    console.log("submitted");
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
