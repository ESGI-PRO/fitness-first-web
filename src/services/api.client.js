import { REFRESH_TOKEN_URL } from "../constants/api.url.constants";
import config from "./config";
import { getTokens, setLoggedInUser, setTokens } from  "../utils/auth.utils";

const getHeaders = async () => {
    const tokens = await getTokens();
    console.log("tokens", tokens)
    return tokens?.access?.token ? {
        'Authorization': `Bearer ${tokens.access.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    } : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

class APIClient {
    /**
     * Fetches data from given url
     */
    get = async (url, params) => {
        try {
            const response = await fetch(config.API_URL + url + new URLSearchParams(params), {
                method: 'GET',
                headers: await getHeaders(),
            });
            return await response.json();
        } catch (error) {
            console.log("error", error)
        }
    }

    /**
     * post given data to url
     */
    post = async (url, data) => {
        try {
            const response = await fetch(config.API_URL + url, {
                method: 'POST',
                headers: await getHeaders(),
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.log("error", error)
        }
    }

    /**
     * Updates data
     */
    patch = async (url, data) => {
        try {
            const response = await fetch(config.API_URL + url, {
                method: 'PATCH',
                headers: await getHeaders(),
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.log("error", error)
        }

    }

    /**
     * Update though put
     */
    put = async (url, data) => {
        try {
            const response = await fetch(config.API_URL + url, {
                method: 'PUT',
                headers: await getHeaders(),
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.log("error", error)
        }
    }
    /**
     * Delete
     */
    delete = async (url) => {
        try {
            const response = await fetch(config.API_URL + url, {
                method: 'DELETE',
                headers: await getHeaders(),
            });
            return await response.json();
        } catch (error) {
            console.log("error", error)
        }
        
    }
}

const handleErrors = async (response) => {
    console.log("handleErrors-response", response)
 // if not authorized refresh token
    if (response?.message === "token_decode_unauthorized") {

        const client = new APIClient();
        const tokens = await getTokens();
        console.log("tokensbro", tokens)

        client.post(REFRESH_TOKEN_URL, {
            token: tokens.refresh.token
        }).then((res) => {
            res?.data?.user && setLoggedInUser(res.data.user)
            res?.data?.token && setTokens(res.data.token)
        }
        ).catch((err) => {
            console.log("err", err)
        })
    }

    if (response?.data?.user && response?.data?.token) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("tokens", JSON.stringify(response.data.token));
      }
}

export { APIClient, handleErrors };

