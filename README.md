# Vidly client - React.js

## Branches sequence
- Hello world
- Movies list component
- Delete-button
- like-component
- pagination
- filtering
- sorting-1
- sorting-2
- sorting-3
- routing
- forms-1
- forms-2
- forms-3
- forms-4
- forms-5
- backend-comm-1
- backend-comm-2
- auth-1

## Authentication & Authorization - Part 2

### Getting the current user
install dependency:
```
yarn add jwt-decode
```

App.js: add a state object, in componentDidMount decode the jwt to get the user object and pass it to the NavBar component:
```javascript
import jwtDecode from "jwt-decode";
...
class App extends React.Component {
  state = {};

  componentDidMount() {
    const jwt = localStorage.getItem("token");
    const user = jwt ? jwtDecode(jwt) : null; //decodes the jwt payload
    console.log(user);
    this.setState({ user: user }); //this will cause re-rendering
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        ...
```

NavBar component render method: 

- when logged in, show name and "Logout"
- otherwise show "Login" and "Register"

```javascript
{!this.props.user && (
  <React.Fragment>
    <NavLink className="nav-item nav-link" to="/login">
      Login
    </NavLink>
    <NavLink className="nav-item nav-link" to="/register">
      Register
    </NavLink>
  </React.Fragment>
)}
{this.props.user && (
  <React.Fragment>
    <NavLink className="nav-item nav-link" to="/profile">
      {this.props.user.name}
    </NavLink>
    <NavLink className="nav-item nav-link" to="/logout">
      Logout
    </NavLink>
  </React.Fragment>
)}
```

When registering or logging in, we need the full page reload to trigger componentDitMount in App.js where we are decoding jwt and getting the user object:

loginForm  (same in registerForm):
```javascript
  onSubmit = async () => {
    try {
      const { data } = await login(this.state.data); //get jwt from web server
      localStorage.setItem("token", data); //save jwt to browser localStorage
      window.location = "/"; //we cannot use this.props.history.replace("/");
```

### logout

logout: components/logout.jsx: remove token from the localStorage and redirect the page with full reload.
```javascript
import React, { Component } from "react";

class Logout extends React.Component {
  componentDidMount() {
    localStorage.removeItem("token");
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default Logout;
```

App.js - add route:
```javascript
...
<Switch>
  <Route path="/logout" component={LogoutForm} />
  ...
```

### Profile page

profile component:
```javascript
import React, { Component } from "react";

class Profile extends Component {
  render() {
    return <div>User profile page</div>;
  }
}

export default Profile;
```

App.js:
```javascript
...
<Route path="/profile" component={Profile} />
...
```