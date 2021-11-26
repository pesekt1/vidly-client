import httpService from "./httpService";

export function getMovies() {
  return httpService.get("http://localhost:3900/api/movies");
}

export function deleteMovie(movieId) {
  return httpService.delete("http://localhost:3900/api/movies/" + movieId);
}
