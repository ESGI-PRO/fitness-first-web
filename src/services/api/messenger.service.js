import { GET_ALL_USER_MESSAGES_URL, GET_ALL_USER_ROOMS_URL, CREATE_MESSAGE_URL ,  CREATE_ROOM_URL  } from '../../constants/api.url.constants'
    import {APIClient, handleErrors} from '../api.client';

const client = new APIClient();

export default class MessengerService {

    async getAllUserMessages(id) {
        const response = await client.get(GET_ALL_USER_MESSAGES_URL + "/" + id);
        handleErrors(response);
        return response?.data;
    }

    async getAllUserRooms(id) {
        const response = await client.get(GET_ALL_USER_ROOMS_URL + "/" + id);
        handleErrors(response);
        return response?.data;
    }

    async createMessage(data) {
        const response = await client.post(CREATE_MESSAGE_URL, {
        ...data
        });
        handleErrors(response);

        return response?.data;
    }

    async createRoom(data) {
        const response = await client.post(CREATE_ROOM_URL, {
        ...data
        });
        handleErrors(response);
        return response?.data;
    }


}