import { TRAINING_EXERCISES } from '../../constants/api.url.constants'
    import {APIClient, handleErrors} from '../api.client';

const client = new APIClient();

export default class TrainingService {

    async getAllUserTraining(trainer_id) {
        const response = await client.get(TRAINING_EXERCISES + "/" + trainer_id);
        handleErrors(response);
        return response?.data;
    }

    async getAllUserTrainingByTrainer(user_id) {
        const response = await client.get(TRAINING_EXERCISES + "/trainer/" + user_id);
        handleErrors(response);
        return response?.data;
    }

    async createExercises(data) {
        const response = await client.post(TRAINING_EXERCISES, {
        ...data
        });
        handleErrors(response);
        return response?.data;
    }

}