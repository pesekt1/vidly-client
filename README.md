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

## backend communication - Part 2

### Extract configuration:

config.json:
```javascript
{
  "apiUrl": "http://localhost:3900/api/"
}
```

genreService:
```javascript
import httpService from "./httpService";
import { apiUrl } from "../config.json";

export function getGenres() {
  return httpService.get(apiUrl + "genres");
}
```

### Refactoring
movies componentDidMount:
```javascript
  async componentDidMount() {
    const { data: genres } = await getGenres();
    const { data: movies } = await getMovies();

    this.setState({ genres, movies });
  }
```

movies handleDelete:
```javascript
  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });

    try {
      await deleteMovie(movie._id);
    } catch (error) {
      const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

      if (expectedError) toast.error("This movie does not exist.");
      this.setState({ movies: originalMovies });
    }
    ...
```

### movieForm - connecting to the web server

movieService:
```javascript
import httpService from "./httpService";
import { apiUrl } from "../config.json";
...
export function getMovie(movieId) {
  return httpService.get(apiUrl + "movies/" + movieId);
}

export function saveMovie(movie) {
  if (!movie._id) return httpService.post(apiUrl, movie);

  //if exist, use put method but remove the _id attribute from the object.
  const data = { ...movie };
  delete data._id;
  return httpService.put(apiUrl + "movies/" + movie._id, data);
}
```

movieForm:
```javascript
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

...
async componentDidMount() {
  const { data: genres } = await getGenres();
  this.setState({ genres });

  const movieId = this.props.match.params.id;
  if (movieId === "new") return;

  const { data: movie } = await getMovie(this.props.match.params.id);
  ...
}

...
onSubmit = async () => {
  await saveMovie(this.state.data);
  console.log("Movie form submitted to the server.");
  this.props.history.push("/movies");
};
```

### getMovie try-catch block
movieForm - if movie does not exist we get error.response.status 404, we want to redirect to not-found page.
```javascript
  async componentDidMount() {
    const { data: genres } = await getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    try {
      const { data: movie } = await getMovie(this.props.match.params.id);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
```

### Refactoring
genreService:
```javascript
const apiGenres = apiUrl + "genres/";

export function getGenres() {
  return httpService.get(apiGenres);
}
```

movieService:
```javascript
const apiMovies = apiUrl + "movies/";

export function getMovies() {
  return httpService.get(apiMovies);
}
...
```

movieForm componentDidMount: Extract methods - populateGenres, populateMovie:
```javascript
async componentDidMount() {
  await this.populateGenres();
  await this.populateMove();
}
```

```javascript

```

```javascript

```

```javascript

```