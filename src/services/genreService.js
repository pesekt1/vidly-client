import httpService from "./httpService";
import { apiUrl } from "../config.json";

const apiGenres = apiUrl + "genres/";

export function getGenres() {
  return httpService.get(apiGenres);
}
