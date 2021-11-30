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

Protecting the routes
```javascript

```

```javascript

```