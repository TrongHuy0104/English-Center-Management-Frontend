import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createNewUser as createNewUserApi } from "../../../services/apiUser";

function useCreateUser() {
    const { isPending: isLoadingCreate, mutate: createNewUser } = useMutation({
        mutationFn: ({
            name,
            email,
            password,
            passwordConfirm,
            role,
            gender,
            phone,
            dateOfBirth,
        }) =>
            createNewUserApi({
                name,
                email,
                password,
                passwordConfirm,
                role,
                gender,
                phone,
                dateOfBirth,
            }),
        onSuccess: () => {
            toast.success("Registered successfully!");
        },
        onError: (err) => {
            if (err.response.data.error.code === 11000) {
                toast.error("The email you registered is already in use");
            } else {
                toast.error(err.response.data.message);
            }
        },
    });

    return { isLoadingCreate, createNewUser };
}

export default useCreateUser;
