import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import useUser from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginLayout = styled.main`
    min-height: 100vh;
    display: grid;
    grid-template-columns: 48rem;
    align-content: center;
    justify-content: center;
    gap: 2.8rem;
    background-color: var(--color-grey-50);
`;

function Login() {
    const { isLoading, user, error } = useUser();
    const navigate = useNavigate();
    // 3. If NO user, redirect to the login
    useEffect(() => {
        if (user && !isLoading) {
            navigate("/");
        }
    }, [error, user, isLoading, navigate]);
    return (
        <LoginLayout>
            <Logo />
            <Heading as="h4">Log in to your account</Heading>
            <LoginForm />
        </LoginLayout>
    );
}

export default Login;
