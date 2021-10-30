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

## Forms - Part 3

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

```javascript

```

```javascript

```

```javascript

```