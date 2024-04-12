import AuthContext from "../AuthContext";
import { useState, useContext } from "react";

const SignInForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { loginUser } = useContext(AuthContext);

    const changeUsername = event => {
        setUsername(event.target.value);
    }

    const changePassword = event => {
        setPassword(event.target.value);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        await loginUser(username, password);
    }

    return (
        <div className="my-3">
            <form onSubmit={handleSubmit}>
                <div className="form-group d-flex flex-column justify-content-center align-items-center">
                    <label className="my-3" htmlFor="usernameInput">Username</label>
                    <input className="form-control" required type="text" id="usernameInput" value={username} onChange={changeUsername} placeholder="Enter username"/>
                    <label className="my-3" htmlFor="passwordInput">Password</label>
                    <input className="form-control" required type="password" id="passwordInput" value={password} onChange={changePassword} placeholder="Password"/>
                    <button
                        type="submit"
                        className="btn btn-primary mt-4"
                    >
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;