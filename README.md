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

Refactoring userService - use export default userService:
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

Calling protected APIs:

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

```javascript

```

```javascript

```

```javascript

```