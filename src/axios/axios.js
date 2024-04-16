import axios from "axios";

const BASE_URL = 'https://localhost:8000/api/to-do-app/';

const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

/**
 * @param {import('navigate').Navigate} navigate - from useNavigate() hook
 */

export const setupInterceptors = navigate => {
    instance.interceptors.request.use(request => {
        const accessToken = JSON.parse(localStorage.getItem('accessToken'));
        request.headers.setAuthorization(`Bearer ${accessToken}`);
        return request;
    }, error => {
        console.log(error);
        return Promise.reject(error);
    });
    
    instance.interceptors.response.use(response => {
        // console.log(response);
        return response;
    }, async error => {
        const originalRequest = error.config;
        // console.log(error);
        if (error.response.status === 401) {
            console.log('You are not authorized!');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            navigate('auth/sign-in');
        }
    
        return Promise.reject(error);
    });
  }



export default instance;