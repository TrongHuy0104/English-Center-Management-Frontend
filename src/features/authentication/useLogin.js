import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { login as loginApi } from "../../services/apiAuth";
import { useCookies } from "react-cookie";

function useLogin() {
    const [cookies, setCookie] = useCookies(["jwt"]);
    const navigate = useNavigate();
    const { isPending: isLoadingLogin, mutate: login } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: (user) => {
            setCookie("jwt", user.data?.token, {
                expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            });
            navigate("/", { replace: true });
        },
        onError: (err) => {
            console.error(err);
            toast.error(err.response.data.message);
        },
    });

    return { isLoadingLogin, login };
}

export default useLogin;
