# Vidly client - React.js

## Forms - Part 3

### Using Joi validation library
Install a Joi library:

```
yarn add joi-browser
```

In login form, add the joi validation schema:
```javascript
  //label is just for rendering the error messages
schema = {
  username: Joi.string().required().label("Username"),
  password: Joi.string().required().label("Password"),
};
```

Now use Joi in the validateInput function:
```javascript
//abortEarly: false ... we want to see all the errors, not just the first one.
validateInput() {
  const joiOptions = { abortEarly: false };
  const result = Joi.validate(this.state.account, this.schema, joiOptions);
  if (!result.error) return null;

  const errors = {};
  result.error.details.map((d) => (errors[d.path[0]] = d.message)); //path[0] contains the property name
  return Object.keys(errors).length === 0 ? null : errors;
}
```

validatePropertyInput using Joi: Note that we are dynamically setting the objects using square brackets:
```javascript
  validateInputProperty(propertyName, value) {
    const obj = { [propertyName]: value };
    const schema = { [propertyName]: this.schema[propertyName] };
    const result = Joi.validate(obj, schema);
    return result.error ? result.error.details[0].message : null;
  }
```

Disable the submit button if there are input errors: We can check the errors in the state. We could also just call the validate function....
```javascript
<button
  type="submit"
  className="btn btn-primary"
  disabled={Object.keys(errors).length > 0}
>
```

### Code review - extracting the reusable logic from the LoginForm:

Code review: What is reusable?

state:
```javascript
errors: {}
```

validateInput(): all reusable, we just need to establish a convention that we will work with data object, in this case we are working with account object:
```javascript
  validateInput() {
    const joiOptions = { abortEarly: false };
    const result = Joi.validate(this.state.account, this.schema, joiOptions);
    if (!result.error) return null;

    const errors = {};
    result.error.details.map((d) => (errors[d.path[0]] = d.message)); //path[0] contains the property name
    return Object.keys(errors).length === 0 ? null : errors;
  }
```

validateInputProperty: all reusable
```javascript
  validateInputProperty(propertyName, value) {
    const obj = { [propertyName]: value };
    const schema = { [propertyName]: this.schema[propertyName] };
    const result = Joi.validate(obj, schema);
    return result.error ? result.error.details[0].message : null;
  }
```

handleSubmit: reusable except of the call to the server - that is specific to each form.
```javascript
  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validateInput();
    this.setState({ errors: errors || {} }); //if null set it to {} to avoid exception
    if (errors) return;

    //call the server
    console.log("submitted");
  };
```

handleChange: Reusable, we just need to work with data object, in this case it is account object:
```javascript
  handleChange = (e) => {
    const errors = { ...this.state.errors }; //no reference
    const { id, value } = e.currentTarget;

    const propertyError = this.validateInputProperty(id, value);
    propertyError ? (errors[id] = propertyError) : delete errors[id]; //add the error or delete

    const account = { ...this.state.account }; //no reference
    account[id] = value; //this works only because the id is the name of the attribute

    this.setState({ account, errors });
  };
```

render method: We can reuse the submit button, we just need to provide a label, in this case it is Login.
```javascript
<button
  type="submit"
  className="btn btn-primary"
  disabled={Object.keys(errors).length > 0}
>
  Login
</button>
```

schema: is not reusable. It is unique for each form.
