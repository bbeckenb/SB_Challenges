import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class YodlrApi {
    static async request(endpoint, data = {}, method= "get") {
        console.debug("API call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params })).data;
        } catch (e) {
            console.error("API Error:", e.response);
            let message = e.response
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async getAllUsers() {
        return await this.request(`users`);
    }

    static async registerUser(userData) {
        return await this.request('users', userData, 'post')
    }
}

export default YodlrApi;