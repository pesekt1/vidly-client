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

## Forms - Part 5

Note that we removed joi-browser package and instead installed joi package:
https://joi.dev/api/?v=17.4.2


```
yarn remove joi-browser
yarn add joi
```

Joi package has different syntax:
```javascript
validateInput() {
  const joiOptions = { abortEarly: false };
  const result = Joi.object(this.schema).validate(
    this.state.data,
    joiOptions
  );
```

Create a registration form - use the Form component:
```javascript
import Joi from "joi";

class RegisterForm extends Form {
  //username and password cannot be null or undefined because they are used as an input value in the form.
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  //label is just for rendering the error messages
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  onSubmit = () => {
    //call the server
    console.log("registration submitted to the server");
  };

  //name, label, type
  render() {
    return (
      <div>
        <h1>register from</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name", "text")}
          {this.renderSubmitButton("Register")}
        </form>
      </div>
    );
  }
}
```

Create a movie form:
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