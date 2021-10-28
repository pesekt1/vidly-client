import React from "react";
class LoginForm extends React.Component {
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
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              onChange={this.handleChange}
              value={account.username}
              type="text"
              className="form-control"
              id="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={this.handleChange}
              value={account.password}
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
