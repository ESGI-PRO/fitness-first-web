import {FIND__USER_SUBSCRIPTION_URL, LOGIN_URL, LOGOUT_URL, REGISTER_URL} from '../../constants/api.url.constants';
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
        console.log('newUser', newUser);

        const response = await client.post(REGISTER_URL, {
            ... newUser
        });
        handleErrors(response);

        return response.data;
    }

    async isSubscribe() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            const response = await client.get(FIND__USER_SUBSCRIPTION_URL, {
                userId: user ?. id
            });
            handleErrors(response);
            if (! response.data || response.data ?. subscriptions ?. length > 0) {
                return false;
            }
            const hasActiveSubscription = response.data ?. subscriptions ?. filter((subscription) => {
                return subscription.active === true;
            })
            return hasActiveSubscription.length > 0;
        } else {
            return false;
        }
    }

}
