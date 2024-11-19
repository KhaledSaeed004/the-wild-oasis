import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

function ProtectedRoute({ children }) {
    const navigate = useNavigate();

    // 1. Load authenticated user
    const { isLoading, isAuthenticated } = useUser();

    // 2. If user is not authenticated, redirect to login
    useEffect(() => {
        if (!isAuthenticated && !isLoading) navigate("/login");
    }, [isAuthenticated, isLoading, navigate]);

    // Simulate loading user
    if (isLoading)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    // 3. If user is authenticated, return children
    if (isAuthenticated) return children;
}

export default ProtectedRoute;
