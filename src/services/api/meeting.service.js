import { GET_USERS_BY_IDS, USER_URL, CREATE_MEETING_URL,
    UPDATE_MEETING_URL, GET_ALL_USER_MEETING_URL, GET_TWILIO_TOKEN, GET_ROOM_BY_IDS,
    GET_ALL_USER_MESSAGES_URL, GET_ALL_USER_ROOMS_URL, CREATE_MESSAGE_URL ,  CREATE_ROOM_URL  } from '../../constants/api.url.constants'
    import {APIClient, handleErrors} from '../api.client';

const client = new APIClient();

export default class MeetingService {

    async createMeeting(data) {
        const response = await client.post(CREATE_MEETING_URL, {
        ...data
        });
        handleErrors(response);
    }

    async updateMeeting(data) {
        const response = await client.post(UPDATE_MEETING_URL, {
        ...data
        });
        handleErrors(response);
    }

    async getAllUserMeetings(id) {
        const response = await client.get(GET_ALL_USER_MEETING_URL + "/" + id);
        handleErrors(response);
        return response.data;
    }

    async getTwilioToken(id) {
        const response = await client.get(GET_TWILIO_TOKEN + "/" + id);
        handleErrors(response);
        return response.data;
    }

    async getUserById(id) {
        const response = await client.get(USER_URL + "/" + id);
        handleErrors(response);
        return response;
    }

    async getUsersByIds(ids) {
        const response = await client.post(GET_USERS_BY_IDS, {
            ids
        });
        handleErrors(response);
        return response;
    }

    async getRoomByIds(ids) {
        const response = await client.post(GET_ROOM_BY_IDS, {
            ids
        });
        return response[0];
    }

    async getAllUserMessages(id) {
        const response = await client.get(GET_ALL_USER_MESSAGES_URL + "/" + id);
        handleErrors(response);
        return response.data;
    }

    async getAllUserRooms(id) {
        const response = await client.get(GET_ALL_USER_ROOMS_URL + "/" + id);
        handleErrors(response);
        return response.data;
    }

    async createMessage(data) {
        const response = await client.post(CREATE_MESSAGE_URL, {
        ...data
        });
        handleErrors(response);
    }

    async createRoom(data) {
        const response = await client.post(CREATE_ROOM_URL, {
        ...data
        });
        handleErrors(response);
    }


}