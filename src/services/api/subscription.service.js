import { SUBSCRIPTION_INVOICE } from '../../constants/api.url.constants'
import storage from '../../context/storage';
    import {APIClient, handleErrors} from '../api.client';

const client = new APIClient();

class SubscriptionService {

    async getInvoices() {
        const response = await client.post(SUBSCRIPTION_INVOICE + "/" , {
            userId: await storage.getUserId()
        });
        // handleErrors(response);
        return response?.invoices;
    }
}

const subscriptionAPI = new SubscriptionService();

export default subscriptionAPI;
