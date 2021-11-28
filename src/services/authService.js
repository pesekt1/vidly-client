import httpService from "./httpService";
import { apiUrl } from "../config";

const authUrl = apiUrl + "auth/";

async function login(credentials) {
  const { data } = await httpService.post(authUrl, mapCredentials(credentials));
  localStorage.setItem("token", data); //save jwt to browser localStorage
}

//map the credentials - web server expects email attribute instead of username.
function mapCredentials(credentials) {
  const standardCredentials = {};
  standardCredentials.email = credentials.username;
  standardCredentials.password = credentials.password;

  return standardCredentials;
}

const auth = { login };

export default auth;
