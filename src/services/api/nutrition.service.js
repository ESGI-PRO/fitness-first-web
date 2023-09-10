import {
  RECETTE_URL,
  CREATE_RECETTE_URL,
} from "../../constants/api.url.constants";
import storage from "../../context/storage";
import { getLoggedInUser } from "../../utils/auth.utils";
import { APIClient, handleErrors } from "../api.client";

const client = new APIClient();
var user = await getLoggedInUser();

class NutritionService {
  ingredients = [];
  myRecettes = [];
  recettes = [];

  constructor() {
    this.ingredients = [];
    this.recettes = [];
    this.myRecettes = [];
    this.getIngredients().then((res) => this.ingredients.push(...res));

    if (user?.id !== null) {
      this.getAllUserNutritions().then((res) => this.myRecettes.push(...res));
      this.getRecettes().then((res) => this.recettes.push(...res));
    }
  }

  async getRecettes() {
    const response = await client.get(RECETTE_URL);
    handleErrors(response);
    var res = response?.data?.nutrition;
    this.recettes.push(res);
    return res;
  }

  async getRecetteByID(id) {
    const response = await client.get(RECETTE_URL + "/" + parseInt(id));
    handleErrors(response);
    var res = response?.data?.nutrition;
    return res;
  }

  async getIngredients() {
    const response = await client.get(RECETTE_URL + "/ingredients");
    handleErrors(response);
    var res = response?.data?.nutrition;
    this.ingredients.push(res);
    return res;
  }

  async createNutrition(data) {
    const response = await client.post(RECETTE_URL, {
      ...data,
    });
    handleErrors(response);
  }

  async updateNutrition(data) {
    const response = await client.put(RECETTE_URL + "/" + data.id, {
      ...data,
    });
    handleErrors(response);
  }

  async deleteNutrition(id) {
    const response = await client.delete(RECETTE_URL + "/" + id);
    handleErrors(response);
  }

  async getAllUserNutritions() {
    console.log(
      "user----------------------------------------------------------------"
    );
    console.log(user);
    console.log(
      "user----------------------------------------------------------------"
    );
    var id = user.trainerId ? user.trainerId : user.id;
    const response = await client.get(RECETTE_URL + "/" + id + "/user");
    handleErrors(response);
    var res = response?.data?.nutrition;
    this.myRecettes.push(res);
    return res;
  }
}

const nutrition = new NutritionService();

export default nutrition;
