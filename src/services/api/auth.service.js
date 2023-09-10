import {FIND__USER_SUBSCRIPTION_URL, GET_ALL_USERS_URL, LOGIN_URL, LOGOUT_URL, REGISTER_URL, USER_URL} from '../../constants/api.url.constants';
import storage from '../../context/storage';
import {APIClient, handleErrors} from '../api.client';

const client = new APIClient();

export default class AuthService {

    async login(data) {
        const {email, password} = data;
        const response = await client.post(LOGIN_URL, {email, password});

        handleErrors(response);
        return response.data;
    }

    async logout() {
        await client.post(LOGOUT_URL);
        localStorage.removeItem("user");
        localStorage.removeItem("tokens");
        localStorage.removeItem("subscription");
    }

    async register(data) {
        const {
            email,
            password,
            userName,
            mobileNumber,
            isTrainer
        } = data;
    
        const newUser = {
            email,
            password,
            userName,
            mobileNumber,
            isTrainer,
            isAdmin: false,
            trainerId: "",
            traineeIds: [],
            is_confirmed: true
        }

        const response = await client.post(REGISTER_URL, {
            ... newUser
        });
        handleErrors(response);

        return response.data;
    }

    async updateUser(data, id) {
        console.log('newUserUpdate', data, id);
        const response = await client.put(USER_URL+ "/" + id , {
            ... data
        });
        return response;
    }

    async isSubscribe() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            const response = await client.get(FIND__USER_SUBSCRIPTION_URL + "/" + user?.id);
            handleErrors(response);
            if (!response || response.subscriptions?.length  === 0) {
                return false;
            }
            const hasActiveSubscription = response?.subscriptions?.reduce((acc, subscription) => {
                if(subscription.active === true){
                   localStorage.setItem("subscription", JSON.stringify(subscription));
                }
                return acc || subscription.active === true;
            }, false)
            return hasActiveSubscription;
        } else {
            return false;
        }
    }

    async getUsersByIds(ids) {
        const response = await client.post(GET_ALL_USERS_URL,{
            ids
        });
        return response;
    }

    async getUserById(id) {
        const response = await client.get(USER_URL + "/" + id);
        return response;
    }

    // get all users
    async getAllTrainers() {
        const response = await client.get(USER_URL);
        return response.filter((user) => user.isTrainer && user.isTrainer === true);
    }

}
