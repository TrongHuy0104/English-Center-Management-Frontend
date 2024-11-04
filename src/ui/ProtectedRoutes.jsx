import useUser from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

function ProtectedRoutes({ children }) {
    // 1. Load the authenticated user
    const { isLoading, user, error } = useUser();
    const navigate = useNavigate();
    const [hasNavigated, setHasNavigated] = useState(false);
    // 3. If NO user, redirect to the login
    useEffect(() => {
        if (error && !isLoading) {
            setHasNavigated(false);
            navigate("/login");
        }
        // if (user?.user.role === "teacher" && !hasNavigated) {
        //     setHasNavigated(true);
        //     navigate("/teacher/schedule");
        // }
        // if (user?.user.role === "student" && !hasNavigated) {
        //     setHasNavigated(true);
        //     navigate("/students/my-class");
        // }
    }, [error, isLoading, navigate, user?.user.role, hasNavigated]);

    // 2. While loading show s spinner
    if (isLoading)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    // If there is a user, render the app
    if (user) return children;
}

export default ProtectedRoutes;
