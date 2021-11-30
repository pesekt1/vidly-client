import httpService from "./httpService";

const apiMovies = "/movies/";

export function getMovies() {
  return httpService.get(apiMovies);
}

export function deleteMovie(movieId) {
  return httpService.delete(apiMovies + movieId);
}

export function getMovie(movieId) {
  return httpService.get(apiMovies + movieId);
}

export function saveMovie(movie) {
  if (!movie._id) return httpService.post(apiMovies, movie);

  //if exist, use put method but remove the _id attribute from the object.
  const data = { ...movie };
  delete data._id;
  return httpService.put(apiMovies + movie._id, data);
}
