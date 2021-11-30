# Vidly client - React.js

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

### Refactoring

Authenticaton is scattered across many components. We will exctract it into the single service: authService:

We have the authentication logic in following components:
- App.js
- registerForm
- loginForm
- logout

Put all the functionality in authService:
```javascript
import httpService from "./httpService";
import { apiUrl } from "../config";
import jwtDecode from "jwt-decode";

const authUrl = apiUrl + "auth/";

//map the credentials - web server expects email attribute instead of username.
function mapCredentials(credentials) {
  const standardCredentials = {};
  standardCredentials.email = credentials.username;
  standardCredentials.password = credentials.password;

  return standardCredentials;
}

async function login(credentials) {
  const { data } = await httpService.post(authUrl, mapCredentials(credentials));
  localStorage.setItem("token", data); //save jwt to browser localStorage
}

function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}

function logout() {
  localStorage.removeItem("token");
}

function getCurrentUser() {
  const jwt = localStorage.getItem("token");
  const user = jwt ? jwtDecode(jwt) : null; //decodes the jwt payload
  return user;
}

const auth = {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
};

export default auth;
```

App.js:
```javascript
import auth from "./services/authService";
...
componentDidMount() {
  const user = auth.getCurrentUser();
  this.setState({ user: user }); //this will cause re-rendering
}
```

loginForm:
```javascript
...
onSubmit = async () => {
  try {
    auth.login(this.state.data);
```

registerForm:
```javascript
...
onSubmit = async () => {
  try {
    const response = await saveUser(this.state.data);
    auth.loginWithJwt(response.headers["x-auth-token"]);
```

logout:
```javascript
...
...
class Logout extends React.Component {
  componentDidMount() {
    auth.logout();
```
