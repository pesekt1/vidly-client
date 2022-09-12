import httpService from "./httpService";

const apiGenres = "/genres/";

export function getGenres() {
  return httpService.get(apiGenres);
}

export function saveGenre(genre) {
  return httpService.post(apiGenres, genre);
}
