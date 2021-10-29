# Vidly client - React.js

## Forms - Part 2

Extract a reusable Input component:
```javascript
class Input extends React.Component {
  render() {
    const { id, value, type } = this.props;

    return (
      <div className="form-group">
        <input
          className="form-control"
          onChange={this.props.onChange}
          value={value}
          type={type}
          id={id}
        />
      </div>
    );
  }
}
```

Now use it in the login form:
```javascript
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
```

### Input validation

Input validation in the login form:
```javascript
validateInput() {
  const errors = {};
  const { account } = this.state;
  if (account.username.trim("") === "")
    errors.username = "Username is required";
  if (account.password.trim("") === "")
    errors.password = "Password is required";

  return Object.keys(errors).length === 0 ? null : errors;
}
```

handle submit in the login form:
```javascript
handleSubmit = (e) => {
  e.preventDefault();

  const errors = this.validateInput();
  this.setState({ errors });
  if (errors) return;

  //call the server
```

Showing the error message as part of the input component:

Input.jsx: If error is not null, show the div with error message:
```javascript
    return (
      <div className="form-group">
        <input
          className="form-control"
          onChange={this.props.onChange}
          value={value}
          type={type}
          id={id}
        />
        {error && <div className="alert alert alert-danger">{error}</div>}
      </div>
```

We need to pass the error to the input component:
```javascript
<h1>Login</h1>
<form onSubmit={this.handleSubmit}>
  <Input
    onChange={this.handleChange}
    id="username"
    value={account.username}
    error={errors.username}
```

Avoiding an exception if the error is null: validateInput() returns null if no errors but we cannot set a state attribute to null - if errors is null, set state.errors to {}:
```javascript
  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validateInput();
    this.setState({ errors: errors || {} }); //if null set it to {} to avoid exception
```

Validate input on change: in this case we only validate the property that we are typing:

LoginForm:
```javascript
validateInputProperty(propertyName, value) {
  return value === "" ? `${propertyName} is required` : null;
}
```

onChange - find out if there is an error and append it to existing errors object, or delete the error property from the error object:

```javascript
  handleChange = (e) => {
    const errors = { ...this.state.errors }; //no reference
    const { id, value } = e.currentTarget;

    const propertyError = this.validateInputProperty(id, value);
    propertyError ? (errors[id] = propertyError) : delete errors[id];

    const account = { ...this.state.account }; //no reference
    account[id] = value; //this works only because the id is the name of the attribute

    this.setState({ account, errors });
  };
```