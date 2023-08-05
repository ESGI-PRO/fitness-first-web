import {
  RECETTE_URL,
  CREATE_RECETTE_URL,
} from "../../constants/api.url.constants";
import storage from "../../context/storage";
import { APIClient, handleErrors } from "../api.client";

const client = new APIClient();
const userId = await storage.getUserId();

class NutritionService {
  ingredients = [];
  myRecettes = [];
  recettes = [];

  constructor() {
    this.ingredients = [];
    this.recettes = [];
    this.myRecettes = [];
    this.getIngredients().then((res) => this.ingredients.push(...res));

    if (userId !== null) {
      this.getAllUserNutritions().then((res) => this.myRecettes.push(...res));
      this.getRecettes().then((res) => this.recettes.push(...res));
    }
  }

  async getRecettes() {
    const response = await client.get(RECETTE_URL);
    handleErrors(response);
    var res = response.data.nutrition;
    this.recettes.push(res);
    return res;
  }

  async getRecetteByID(id) {
    const response = await client.get(RECETTE_URL + "/" + parseInt(id));
    handleErrors(response);
    var res = response.data.nutrition;
    return res;
  }

  async getIngredients() {
    const response = await client.get(RECETTE_URL + "/ingredients");
    handleErrors(response);
    var res = response.data.nutrition;
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
    const response = await client.put(RECETTE_URL + '/' + data.id, {
      ...data,
    });
    handleErrors(response);
  }

  async deleteNutrition(id) {
    const response = await client.delete(RECETTE_URL + '/' + id, {
      ...data,
    });
    handleErrors(response);
  }

  async getAllUserNutritions() {
    const response = await client.get(RECETTE_URL + "/" + userId + "/user");
    handleErrors(response);
    var res = response?.data?.nutrition;
    this.myRecettes.push(res);
    return res;
  }
}

const nutrition = new NutritionService();

export default nutrition;
