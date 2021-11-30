import httpService from "./httpService";

const apiGenres = "genres/";

export function getGenres() {
  return httpService.get(apiGenres);
}
