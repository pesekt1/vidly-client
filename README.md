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
loginForm
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