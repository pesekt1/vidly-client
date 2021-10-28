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
- forms

## Forms

Build a login form:

In the navbar add login:
```javascript
<NavLink className="nav-item nav-link" to="/login">
  Login
</NavLink>
```

Build a LoginForm based on bootstrap:
https://getbootstrap.com/docs/4.0/components/forms/

```javascript
class LoginForm extends React.Component {
  render() {
    return (
      <div>
        <h1>Login</h1>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" id="username" />
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

```javascript

```

```javascript

```

```javascript

```

```javascript

```

```javascript

```

```javascript

```

```javascript

```

```javascript

```

```javascript

```

```javascript

```