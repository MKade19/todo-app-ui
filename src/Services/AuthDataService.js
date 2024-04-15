import axios from "axios";

class AuthDataService {
    BASE_AUTH_URL = "https://localhost:7000/api/to-do-app/auth/";

    login = async (username, password) => {
        try {
            const body = { username, password };
            return await axios.post(this.BASE_AUTH_URL + 'login', body);
        } catch (error) {
            return error.response;
        }
    }

    register = async (username, password, confirmPassword) => {
        try {
            const body = { username, password, confirmPassword };
            return await axios.post(this.BASE_AUTH_URL + "register", body);
        } catch (error) {
            return error.response;
        }
    }

    changePassword = async (username, oldPassword, password) => {
        try {
            const body = { username, oldPassword, password };
            return await axios.post(this.BASE_AUTH_URL + "change-password", body);
        } catch (error) {
            console.log(error.response);
            return error.response;
        }
    }
}

const authDataService = new AuthDataService();
export default authDataService;