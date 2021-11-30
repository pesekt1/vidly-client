import httpService from "./httpService";

const registerUrl = "users/";

//web server expects email property instead of username property.
function mapUser(user) {
  const standardUser = {};
  standardUser.email = user.username;
  standardUser.password = user.password;
  standardUser.name = user.name;
  return standardUser;
}

async function save(user) {
  return httpService.post(registerUrl, mapUser(user));
}

const userService = { save };

export default userService;
