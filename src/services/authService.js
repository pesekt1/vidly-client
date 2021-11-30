import httpService from "./httpService";
import { apiUrl } from "../config";
import jwtDecode from "jwt-decode";

const authUrl = apiUrl + "auth/";

//map the credentials - web server expects email attribute instead of username.
function mapCredentials(credentials) {
  const standardCredentials = {};
  standardCredentials.email = credentials.username;
  standardCredentials.password = credentials.password;

  return standardCredentials;
}

async function login(credentials) {
  const { data } = await httpService.post(authUrl, mapCredentials(credentials));
  localStorage.setItem("token", data); //save jwt to browser localStorage
}

function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}

function logout() {
  localStorage.removeItem("token");
}

function getCurrentUser() {
  const jwt = localStorage.getItem("token");
  return jwt ? jwtDecode(jwt) : null; //decodes the jwt payload
}

const auth = {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
};

export default auth;
