import {
  RECETTE_URL,
  CREATE_RECETTE_URL,
} from "../../constants/api.url.constants";
import { APIClient, handleErrors } from "../api.client";

const client = new APIClient();

export default class NutritionService {
  async getRecettes() {
    const response = await client.get(RECETTE_URL);
    handleErrors(response);
  }

  async createNutrition(data) {
    const response = await client.post(RECETTE_URL, {
      ...data,
    });
    handleErrors(response);
  }

  async updateNutrition(data) {
    const response = await client.post(RECETTE_URL, {
      ...data,
    });
    handleErrors(response);
  }

  async getAllUserNutritions(id) {
    const response = await client.get(RECETTE_URL + "/" + id + "/user");
    handleErrors(response);
    return response.data;
  }
}
