import axios from "axios";

class AuthDataService {
    login = async (username, password) => {
        console.log(username, password);

        try {
            const body = { username, password };
            return await axios.post('https://localhost:7000/api/to-do-app/auth/login', body);
        } catch (error) {
            return error.response;
        }
    }

    register = async (email, password, confirmPassword) => {
        try {
            const body = { email, password, confirmPassword };
            return await axios.post("https://localhost:7000/api/to-do-app/auth/register", body);
        } catch (error) {
            return error.response;
        }
    }
}

const authDataService = new AuthDataService();
export default authDataService;