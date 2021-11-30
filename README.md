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
- auth-2
- auth-3

## Authentication & Authorization - Part 3

### Refactoring userService
use export default userService:
```javascript
...
async function save(user) {
  return httpService.post(registerUrl, mapUser(user));
}

const userService = { save };

export default userService;
```

registerForm:
```javascript
onSubmit = async () => {
  try {
    const response = await userService.save(this.state.data);
```

### Calling protected APIs:

In the web server activate the authentication:

config/default.json:
```javascript
{
  "requiresAuth": true,
}
```

Now if we try to update an existing movie we get 401 - unauthorized because we are calling a protected endpoint and we need to provide the jwt to the web server.

httpService: set x-auth-token headers - that is where the web server expects the JWT.
```javascript
//set x-auth-token headers
function setJwtHeaders(jwt) {
  if (jwt) axios.defaults.headers.common["x-auth-token"] = jwt;
}
```

authService: is responsible for working with the localStorage:
```javascript
import httpService from "./httpService";
...
function getJwt() {
  return localStorage.getItem(tokenKey);
}
...
httpService.setJwtHeaders(getJwt()); //set jwt in the headers
```

### Authorization
Even if a user is authenticated there can be endpoints which require authorization. For example a user must be an admin in order to use a certain endpoint.

Delete a movie: When we press the button we are communicating with the web server endpoint which requires admin authorization.

Web server implementation:

routes/movies:
```javascript
...
//middleware: auth - checks jwt, if ok it goes to admin middleware
//checks if user isAdmin
router.delete("/:id", [auth, admin], async (req, res) => {
```

middleware/auth: 
```javascript
function auth(req, res, next) {
  const token = req.header("x-auth-token");
  //if client is not logged in
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey")); //decoded payload based on jwtPrivateKey
    req.user = decoded; //now we add user property to the request
    next(); //pass the request to the next function
  } catch (error) {
    res.status(400).send("invalid token");
  }
}
```

middleware/admin: checks if isAdmin attribute is true:
```javascript
//req.user will be set by auth so the pipeline is: ... auth -> admin -> ...
//403 Forbidden - if jwt is valid but the user does not have rights
if (!req.user.isAdmin) return res.status(403).send("Access denied");
next();
```

We can set isAdmin attribute manualy in our MongoDB database.

### Showing or hiding elements:

App.js - pass user to the Movies component:
```javascript
<Route
  path="/movies/"
  render={(props) => <Movies {...props} user={this.state.user} />}
/>
```

Movies component - show New Movie button if user is logged in.
```javascript
{this.props.user && (
  <Link to="/movies/new" className="btn btn-primary">
    New Movie
  </Link>
)}
```

### Protecting the routes

We can still go to the new movie form even when we are not logged in: http://localhost:3000/movies/new

Solution to prevent that: If user is not logged in we redirect to login. We can do something like this:

App.js:
```javascript
<Route
  path="/movies/:id"
  render={(props) => {
    if (!this.state.user) return <Redirect to="/login" />;
    return <MovieForm {...props} />;
  }}
/>
```

Extract ProtectedRoute component - we want to reuse this logic:
```javascript
import React from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "../../services/authService";

class ProtectedRoute extends React.Component {
  render() {
    const { path, component: Component, render } = this.props; //we need to rename component to Component
    return (
      <Route
        path={path}
        {...this.props.rest}
        render={(props) => {
          if (!authService.getCurrentUser()) return <Redirect to="/login" />;
          return Component ? <Component {...props} /> : render(props); //React expects component to start with capital letter.
        }}
      />
    );
  }
}

export default ProtectedRoute;
```

App.js:
```javascript
<ProtectedRoute path="/movies/:id" component={MovieForm} />
```

### Redirecting after login

Redirect can be used with to = Object: https://v5.reactrouter.com/web/api/Redirect. This allows us to pass the location that we wanted to access before being redirected to the login form: "The state object can be accessed via this.props.location.state in the redirected-to component. "

ProtectedRoute
```javascript
...
return (
  ...
  //The state object can be accessed via this.props.location.state in the redirected-to component.
  <Redirect
    to={{
      pathname: "/login",
      state: { from: props.location },
    }}
  />
```

loginForm: if we were redirected then we should set window.location to the path that we tried to access:
```javascript
  onSubmit = async () => {
    //call the server
    console.log("login submitted to the server");
    try {
      await auth.login(this.state.data); //get jwt from web server and save it to localStorage
      const { state } = this.props.location; //if we were redirected from ProtectedRoute, state will be defined
      window.location = state ? state.from.pathname : "/"; // if redirected, state.from.pathname will contain the route we tried to access.
      //We reset window.location because we want full reload - to trigger app.js componentDitMount where we decode jwt to get the user
    
```

If we log in, we can still access http://localhost:3000/login. We want to redirect to the homepage. Solution:

loginForm:
```javascript
...
render() {
  if (auth.getCurrentUser()) return <Redirect to="/" />; //if already logged in
  return (
```

```javascript

```

```javascript

```

```javascript

```