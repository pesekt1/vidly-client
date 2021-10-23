# Vidly client - React.js

## Branches sequence
- Hello world
- Movies list component


## Movies list component

We need some data to show:

Create fake http services to mock the backend - web server.

- fake genre service:
```javascript
export const genres = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" }
];

export function getGenres() {...}

```

- fake movie service:
```javascript

```

```javascript
import * as genresAPI from "./fakeGenreService";

const movies = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Terminator",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publishDate: "2018-01-03T19:04:28.809Z",
    liked: true
  },
  ...
  ...
  
export function getMovies() {...}

export function getMovie(id) {...}

export function saveMovie(movie) {...}

export function deleteMovie(id) {...}
```

- movies component:
```javascript
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <td>Title</td>
            <td>Genre</td>
            <td>Stock</td>
            <td>Rate</td>
          </tr>
        </thead>
        <tbody>
          {this.state.movies.map((movie) => (
            <tr>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
```

- App:
```javascript
function App() {
  return (
    <main className="container">
      <Movies />
    </main>
  );
}
```

```javascript

```

```javascript

```

```javascript

```

```javascript

```

