import axios from "axios";
import Swal from "sweetalert2";

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
        // console.log(error);
        return Promise.reject(error);
    });
    
    instance.interceptors.response.use(response => {
        // console.log(response);
        return response;
    }, async error => {
        const originalRequest = error.config;
        // console.log(error);
        if (error.response.status === 401) {
            Swal.fire({
                title: "You are not authorized!",
                icon: "success",
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });

            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            navigate('auth/sign-in');
        }

        if (error.response.status === 403) {
            Swal.fire({
                title: "You don't have rights to perform this action!",
                icon: "error",
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    
        return Promise.reject(error);
    });
}



export default instance;