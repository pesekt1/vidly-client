import httpService from "./httpService";
import { apiUrl } from "../config.json";

export function getMovies() {
  return httpService.get(apiUrl + "movies");
}

export function deleteMovie(movieId) {
  return httpService.delete(apiUrl + "movies/" + movieId);
}

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
