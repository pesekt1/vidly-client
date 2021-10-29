import React from "react";
import Input from "./common/input";

class LoginForm extends React.Component {
  //username and password cannot be null or undefined because they are used as an input value in the form.
  state = {
    account: { username: "", password: "" },
  };

  handleChange = (e) => {
    const account = { ...this.state.account }; //no reference
    const { id, value } = e.currentTarget;
    account[id] = value; //this works only because the id is the name of the attribute
    this.setState({ account });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    //call the server
    console.log("submitted");
    console.log(this.state.account);
  };

  render() {
    const { account } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            onChange={this.handleChange}
            id="username"
            value={account.username}
            type="text"
          />
          <Input
            onChange={this.handleChange}
            id="password"
            value={account.password}
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
