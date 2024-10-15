import { useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [cookies, setCookie, removeCookie] = useCookies([
        import.meta.env.VITE_SERVER_JWT,
    ]);
    const logout = () => {
        queryClient.removeQueries(["user"]);
        removeCookie(import.meta.env.VITE_SERVER_JWT);
        navigate("/");
    };
    return logout;
};
