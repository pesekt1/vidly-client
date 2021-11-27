import httpService from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "movies/";

export function getMovies() {
  return httpService.get(apiEndpoint);
}

export function deleteMovie(movieId) {
  return httpService.delete(apiEndpoint + movieId);
}

export function getMovie(movieId) {
  return httpService.get(apiEndpoint + movieId);
}

export function saveMovie(movie) {
  if (!movie._id) return httpService.post(apiEndpoint, movie);

  //if exist, use put method but remove the _id attribute from the object.
  const data = { ...movie };
  delete data._id;
  return httpService.put(apiEndpoint + movie._id, data);
}
