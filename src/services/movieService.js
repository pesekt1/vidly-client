import httpService from "./httpService";
import { apiUrl } from "../config.json";

export function getMovies() {
  return httpService.get(apiUrl + "movies");
}

export function deleteMovie(movieId) {
  return httpService.delete(apiUrl + "movies/" + movieId);
}
