# Vidly client - React.js

## Forms - Part 4

Create a reusable Form component: This component will have all the validation logic.
```javascript
import Joi from "joi-browser";

class Form extends React.Component {
  state = {
    data: {},
    errors: {},
  };

  validateInputProperty = (propertyName, value) => {
    const obj = { [propertyName]: value };
    const schema = { [propertyName]: this.schema[propertyName] };
    const result = Joi.validate(obj, schema);
    return result.error ? result.error.details[0].message : null;
  };

  handleChange = (e) => {
    const errors = { ...this.state.errors }; //no reference
    const { id, value } = e.currentTarget;

    const propertyError = this.validateInputProperty(id, value);
    propertyError ? (errors[id] = propertyError) : delete errors[id]; //add the error or delete

    const data = { ...this.state.data }; //no reference
    data[id] = value; //this works only because the id is the name of the attribute

    this.setState({ data, errors });
  };

  //abortEarly: false ... we want to see all the errors, not just the first one.
  validateInput() {
    const joiOptions = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, joiOptions);
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

    this.onSubmit();
  };
}
```

Now our LoginForm will extend the Form component: Note that we extracted onSubmit method which will be calling the backend - this will be specific for each form.
```javascript
import Input from "./common/input";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
  //username and password cannot be null or undefined because they are used as an input value in the form.
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  //label is just for rendering the error messages
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  onSubmit = () => {
    //call the server
    console.log("submitted");
  };

  render() {
```

Extract the submit button from the render method in the loginForm:

From.jsx:
```javascript
renderSubmitButton = (label) => {
  const { errors } = this.state;
  return (
    <button
      type="submit"
      className="btn btn-primary"
      disabled={Object.keys(errors).length > 0}
    >
      {label}
    </button>
  );
};
```

Extract the input field from the render method in the loginForm:
```javascript
renderInput = (name, label, type) => {
  const { data, errors } = this.state;
  return (
    <Input
      onChange={this.handleChange}
      id={name}
      value={data[name]}
      error={errors[name]}
      type={type}
      label={label}
    />
  );
};
```

Now we can use the helper methods in our loginFrom:
```javascript
render() {
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("username", "Username", "text")}
        {this.renderInput("password", "Password", "password")}
        {this.renderSubmitButton("Login")}
```

Simplify the Input component:
```javascript
class Input extends React.Component {
  render() {
    const { id, error, label, ...rest } = this.props;

    // setting the rest of the parameters dynamically:
    // {...rest} are all the props that have the same name as the property:
    // example: onChange={onChange} type={type} value={value}
    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input className="form-control" id={id} {...rest} />
        {error && <div className="alert alert alert-danger">{error}</div>}
      </div>
    );
  }
}
```

Now when we pass the props to the Input component we have id, error and label, and all the other props come as {...rest}. The condition is that they must have the same name. Example:
```javascript
<Input
  onChange={this.handleChange}
  id={name}
  value={data[name]}
  error={errors[name]}
  type={type}
  label={label}
/>
```