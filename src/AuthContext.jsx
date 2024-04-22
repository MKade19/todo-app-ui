import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthDataService from "./Services/AuthDataService";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const accessToken = () => localStorage.getItem("accessToken") ? JSON.parse(localStorage.getItem("accessToken")) : null;
    const user = () => localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null

    const navigate = useNavigate();

    const loginUser = async (username, password) => {
        const response = await AuthDataService.login(username, password);
        const data = response.data;

        if(response.status === 200){
            localStorage.setItem("accessToken", JSON.stringify(data.token));
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/")
            Swal.fire({
                title: "You are logged in",
                icon: "success",
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });

        } else {    
            Swal.fire({
                title: "User does not exist or Incorrect Password. Please contact to administrator",
                icon: "error",
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    }

    const registerUser = async (email, password, confirmPassword) => {
        const response = await AuthDataService.register(email, password, confirmPassword);

        const data = await response.data;
        console.log(data);

        if(response.status === 201){
            navigate("/sign-in");
            Swal.fire({
                title: "Registration Successful, Login Now",
                icon: "success",
                toast: true,
                timer: 1000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        } else {
            console.log(response.status);
            console.log("there was a server issue");
            Swal.fire({
                title: "An Error Occured " + response.status,
                icon: "error",
                toast: true,
                timer: 1000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    const changePassword = async (username, oldPassword, password) => {
        const response = await AuthDataService.changePassword(username, oldPassword, password);

        if(response.status === 200){
            Swal.fire({
                title: "You have changed a password successfully",
                icon: "success",
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })

            navigate("/auth/sign-in");
        } else {
            Swal.fire({
                title: "Error occured. Please verify given data.",
                icon: "error",
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    const logoutUser = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        navigate("/auth/sign-in");
        Swal.fire({
            title: "You are logged out",
            icon: "success",
            toast: true,
            timer: 3000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        })
    }

    const contextData = {
        user, 
        accessToken,
        loginUser,
        registerUser,
        changePassword,
        logoutUser,
    }

    return (
        <AuthContext.Provider value={ contextData }>
            { children }
        </AuthContext.Provider>
    )
}