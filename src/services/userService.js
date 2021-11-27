import httpService from "./httpService";
import { apiUrl } from "../config.json";

const registerUrl = apiUrl + "users/";

export function saveUser(user) {
  return httpService.post(registerUrl, mapUser(user));
}

//web server expects email property instead of username property.
function mapUser(user) {
  const standardUser = {};
  standardUser.email = user.username;
  standardUser.password = user.password;
  standardUser.name = user.name;
  return standardUser;
}
