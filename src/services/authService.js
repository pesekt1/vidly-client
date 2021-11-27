import httpService from "./httpService";
import { apiUrl } from "../config";

const authUrl = apiUrl + "auth/";

export function login(credentials) {
  console.log(authUrl);
  return httpService.post(authUrl, mapCredentials(credentials));
}

//map the credentials - web server expects email attribute instead of username.
function mapCredentials(credentials) {
  const standardCredentials = {};
  standardCredentials.email = credentials.username;
  standardCredentials.password = credentials.password;

  return standardCredentials;
}
