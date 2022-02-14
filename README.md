# Vidly client - React.js

## Forms - Part 1

https://reactjs.org/docs/forms.html


Build a login form:

In the navbar add login:
```javascript
<NavLink className="nav-item nav-link" to="/login">
  Login
</NavLink>
```

Build a LoginForm based on bootstrap:
https://getbootstrap.com/docs/5.0/forms

```javascript
class LoginForm extends React.Component {
  render() {
    return (
      <div>
        <h1>Login</h1>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              className="form-control" 
              id="username" 
              placeholder="Username"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
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
```

Form is by default causing the full page reload on submit. To prevent it, we set up onSubmit function which takes event argument and executes preventDefault function:

```javascript
class LoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
```

### Controlled elements

Improve the login form:

we need a state and then control the input elements so that they are synchronized with the state (controlled elements). Otherwise they have their own state.

- value = account.username or account.password
- onChange... setState...

```javascript
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
```
