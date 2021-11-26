# Vidly client - React.js

## backend communication - Part 1
Connecting the web client to the web server application.

### Set up the web server application
Get the web server app here: https://github.com/pesekt1/vidly_server

install all the dependencies:
```
npm install
```

The web server is set up to communicate with a local MongoDB server using mongoose library for ODM - object-document mapping.

Install MongoDB server on your computer and make sure the database server is running.

There is a seed.js file to create a vidly database and fill it with some data: run command: 
```
node seed.js
```

- database: vidly
- collections: genres, movies

seed.js:
```javascript
const { Genre } = require("./models/genres");
const { Movie } = require("./models/movies");
const mongoose = require("mongoose");
const config = require("config");

const data = [
  {
    name: "Comedy",
    movies: [
      { title: "Airplane", numberInStock: 5, dailyRentalRate: 2 },
      { title: "The Hangover", numberInStock: 10, dailyRentalRate: 2 },
      { title: "Wedding Crashers", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
  {
    name: "Action",
    movies: [
      { title: "Die Hard", numberInStock: 5, dailyRentalRate: 2 },
      { title: "Terminator", numberInStock: 10, dailyRentalRate: 2 },
      { title: "The Avengers", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
  {
    name: "Romance",
    movies: [
      { title: "The Notebook", numberInStock: 5, dailyRentalRate: 2 },
      { title: "When Harry Met Sally", numberInStock: 10, dailyRentalRate: 2 },
      { title: "Pretty Woman", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
  {
    name: "Thriller",
    movies: [
      { title: "The Sixth Sense", numberInStock: 5, dailyRentalRate: 2 },
      { title: "Gone Girl", numberInStock: 10, dailyRentalRate: 2 },
      { title: "The Others", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
];

async function seed() {
  await mongoose.connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await Movie.deleteMany({});
  await Genre.deleteMany({});

  for (let genre of data) {
    const { _id: genreId } = await new Genre({ name: genre.name }).save();
    const movies = genre.movies.map((movie) => ({
      ...movie,
      genre: { _id: genreId, name: genre.name },
    }));
    await Movie.insertMany(movies);
  }

  mongoose.disconnect();

  console.info("Done!");
}

seed();
```

### Deactivate the authentication in the web server
The web server uses authentication for some of the endpoints. To deactivate it go to the config/default.json and set requiresAuth to false:

default.json:
```json
{
  "jwtPrivateKey": "",
  "db": "mongodb://localhost/vidly",
  "requiresAuth": false,
  "env": "development",
  "host": "localhost"
}
```

### Web client - dependencies
Dependencies: 

- axios: http library
- sentry: third-party logging service
- toastify: logging library

```
yarn add axios
yarn add react-toastify
yarn add @sentry/browser 
yarn add @sentry/react
yarn add @sentry/tracing
```

### toastify errors

App.js: use ToastContainer component for showing the toast errors
```javascript
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
```

### Add http and log services
Get httpService and logService from the http-app demo:

httpService:
```javascript
import axios from "axios";
import { toast } from "react-toastify";
import logService from "./logService";

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("INTERCEPTOR CALLED");

    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
      console.log("Logging the error", error);
      logService.log(error);
      toast.error("unexpected error occured.");
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default httpService;
```

logService: First make a Sentry project (https://sentry.io/) for this app and use the dsn link:
```javascript
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn: "https://a2c1644ba5ef439da338f1fc7861d6e8@o345327.ingest.sentry.io/6082870",
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

function log(error) {
  Sentry.captureException(error);
}

const logService = { init, log };
export default logService;
```

### replace the fakeGenreService and fakeMovieService
genreService.js:
```javascript
import httpService from "./httpService";

export function getGenres() {
  return httpService.get("http://localhost:3900/api/genres");
}
```

movieService.js:
```javascript
import httpService from "./httpService";

export function getMovies() {
  return httpService.get("http://localhost:3900/api/movies");
}

export function deleteMovie(movieId) {
  return httpService.delete("http://localhost:3900/api/movies/" + movieId);
}
```

movies.jsx: use genreService and movieService to get genres and movies from the web server:
```javascript
import { getGenres as getRealGenres } from "../services/genreService";
import {
  getMovies as getRealMovies,
  deleteMovie as deleteRealMovie,
} from "../services/movieService";
```

movies componentDidMount(): get the movies and genres from the database - communicae with the web server.
```javascript
  async componentDidMount() {
    const resultGenres = await getRealGenres();
    const genres = resultGenres.data;
    console.log(resultGenres.data);

    const resultMovies = await getRealMovies();
    const movies = resultMovies.data;
    console.log(movies);

    this.setState({
      genres: genres,
      movies: movies,
    });
  }
```

movies handleDelete - optimistic strategy with the movieService - we update the GUI first, if error, we set it back to the original:
```javascript
handleDelete = async (movie) => {
  const originalMovies = this.state.movies;
  const movies = this.state.movies.filter((m) => m._id !== movie._id);
  this.setState({ movies: movies });

  //deleteMovie(movie._id); //fake http service
  try {
    await deleteRealMovie(movie._id);
  } catch (error) {
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500
    ) {
      toast.error("This movie does not exist.");
    }
    this.setState({ movies: originalMovies });
  }
...
```
