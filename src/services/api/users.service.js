import { USERS_URL } from "../../constants/api.url.constants";
import storage from "../../context/storage";
import { getLoggedInUser } from "../../utils/auth.utils";
import { APIClient, handleErrors } from "../api.client";

const client = new APIClient();

class usersService {
  users = [];

  constructor() {
    this.getUsers().then(users => this.users.push(...users));
  }

  async getUsers() {
    var users = client.get(USERS_URL);
    handleErrors(users);
    return users;
  }
}

const usersAPI = new usersService();

export default usersAPI;
