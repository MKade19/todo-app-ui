import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import SignInForm from "../Forms/SignInForm";

const SignInPage = () => {
    useEffect(() => {
        document.title = 'Sign-in - Todo app';
    }, []);

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h1 className="my-4">Sign in</h1>
            <SignInForm/>
            <LinkContainer to={'/auth/change-password'}>
                <button className="btn btn-link">Change password</button>
            </LinkContainer>
        </div>
    )
}

export default SignInPage;