import httpService from "./httpService";
import jwtDecode from "jwt-decode";

const authUrl = "auth/"; //base url
const tokenKey = "token";
httpService.setJwtHeaders(getJwt()); //set jwt in the headers

//map the credentials - web server expects email attribute instead of username.
function mapCredentials(credentials) {
  const standardCredentials = {};
  standardCredentials.email = credentials.username;
  standardCredentials.password = credentials.password;

  return standardCredentials;
}

async function login(credentials) {
  const { data } = await httpService.post(authUrl, mapCredentials(credentials));
  localStorage.setItem(tokenKey, data); //save jwt to browser localStorage
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getCurrentUser() {
  const jwt = localStorage.getItem(tokenKey);
  return jwt ? jwtDecode(jwt) : null; //decodes the jwt payload
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

const auth = {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
};

export default auth;
