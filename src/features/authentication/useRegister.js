import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { register as registerApi } from "../../services/apiAuth";

function useRegister() {
    const navigate = useNavigate();
    const { isPending: isLoadingRegister, mutate: register } = useMutation({
        mutationFn: ({ name, email, password, passwordConfirm }) =>
            registerApi({ name, email, password, passwordConfirm }),
        onSuccess: () => {
            toast.success("Registered successfully, please log in first!");
            navigate("/", { replace: true });
        },
        onError: (err) => {
            if (err.response.data.error.code === 11000) {
                toast.error("The email you registered is already in use");
            } else {
                toast.error(err.response.data.message);
            }
        },
    });

    return { isLoadingRegister, register };
}

export default useRegister;
