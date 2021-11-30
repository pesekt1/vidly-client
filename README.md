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
- deployment

## Deployment

### evn variables

In the root folder create files:
- env
- env.development
- env.production

Replace the config.json:

env.development: connect to the local web server api:
```
REACT_APP_API_URL=http://localhost:3900/api/
```

env.production: connect to the web server running on heroku:
```
REACT_APP_API_URL=https://vidly-web-server.herokuapp.com/api
```

httpService: set axios baseURL: read the env variable from process.env - depending on if it is development or production it will read from env.development or env.production.

- yarn run start - development
- yarn run build - production
- yarn run test - test

```javascript
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
```

Replace the use of config.json in all the services:

genreService: etc...
```javascript
const apiGenres = "genres";

export function getGenres() {
  return httpService.get(apiGenres);
```

Now when we run yarn run start or npm start it should pick the env variables from .env.development.

### Production build

Create a production build - creates a new folder called build
```
yarn run build
```

Install static server:
```
yarn add serve
```

Serve the production build: This will run on port 5000. It will pick the env variables from .env.production:
```
serve -s build
```
