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

## Authentication & Authorization - Part 1

### Register form
We need to connect to the backend - create a userService:

userService:
```javascript
import httpService from "./httpService";
import { apiUrl } from "../config.json";

const registerUrl = apiUrl + "users/";

export function saveUser(user) {
  return httpService.post(registerUrl, mapUser(user));
}

//web server expects email property instead of username property.
function mapUser(user) {
  const standardUser = {};
  standardUser.email = user.username;
  standardUser.password = user.password;
  standardUser.name = user.name;
  return standardUser;
}
```

registerForm onSubmit - "Register" button
```javascript
  onSubmit = async () => {
    try {
      await saveUser(this.state.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data; //set error on the username input field
        this.setState({ errors });

        toast.error(error.response.data); //toast error message
      }
    }
  };
```

We are counting on that 400 bad request will only come because the email is already registered. That is why we set the error to errors.username. Theoretically, the error could happen because of password or name. In that case we should do it differently.

### Loing form

authService
```javascript
import httpService from "./httpService";
import { apiUrl } from "../config";

const authUrl = apiUrl + "auth/";

export function login(credentials) {
  console.log(authUrl);
  return httpService.post(authUrl, mapCredentials(credentials));
}

//map the credentials - web server expects email attribute instead of username.
function mapCredentials(credentials) {
  const standardCredentials = {};
  standardCredentials.email = credentials.username;
  standardCredentials.password = credentials.password;

  return standardCredentials;
}
```

loginForm
```javascript
  onSubmit = async () => {
    try {
      const { data } = await login(this.state.data); //get jwt from web server
      localStorage.setItem("token", data); //save jwt to browser localStorage
      this.props.history.replace("/"); //redirect to the main page
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        //set error to both input fields, we dont want to specifi which one was wrong.
        errors.username = error.response.data;
        errors.password = error.response.data;
        this.setState({ errors });

        toast.error(error.response.data);
      }
    }
  };
```

### Auto login upon registration
registerForm: web server provides x-auth-token item in the deaders. We can get the token from there, save it in browsers localStorage and redirect to the home page.

```javascript
  onSubmit = async () => {
    try {
      const response = await saveUser(this.state.data);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      this.props.history.replace("/");
    } catch (error) {...
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