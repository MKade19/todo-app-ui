import { useState, useContext } from 'react'
import AuthContext from "../AuthContext";
import Swal from 'sweetalert2';

const ChangePasswordForm = () => {
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { changePassword } = useContext(AuthContext);

    const changeUsername = event => {
        setUsername(event.target.value);
    }

    const changeOldPassword = event => {
        setOldPassword(event.target.value);
    }

    const changeNewPassword = event => {
        setNewPassword(event.target.value);
    }

    const changeConfirmPassword = event => {
        setConfirmPassword(event.target.value);
    }

    const handleSubmit = async event => {
        event.preventDefault();

        if (confirmPassword !== newPassword) {
            Swal.fire({
                title: "Passwords don't match.",
                icon: "error",
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }

        await changePassword(username, oldPassword, newPassword);
    }

    return (
        <div className="my-3 d-flex flex-column justify-content-center align-items-center">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="my-3" htmlFor="usernameInput">Username</label>
                        <input className="form-control" required type="text" id="usernameInput" value={username} onChange={changeUsername} placeholder="Enter username"/>
                        <label className="my-3" htmlFor="oldPasswordInput">Old password</label>
                        <input className="form-control" required type="password" id="oldPasswordInput" value={oldPassword} onChange={changeOldPassword} placeholder="Old password"/>
                        <label className="my-3" htmlFor="newPasswordInput">New password</label>
                        <input className="form-control" required type="password" id="newPasswordInput" value={newPassword} onChange={changeNewPassword} placeholder="New password"/>
                        <label className="my-3" htmlFor="confirmPasswordInput">Confirm new Password</label>
                        <input className="form-control" required type="password" id="confirmPasswordInput" value={confirmPassword} onChange={changeConfirmPassword} placeholder="Confirm new password"/>
                        <button
                            type="submit"
                            className="btn btn-primary mt-4"
                        >
                            Change
                        </button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default ChangePasswordForm;