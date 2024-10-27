import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createAdmin as createAdminApi } from "../../../services/apiAdmin";

function useCreateAdmin() {
    const queryClient = useQueryClient();
    const { isPending: isLoadingCreate, mutate: createAdmin } = useMutation({
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
            createAdminApi({
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
            toast.success("Create successfully!");
            queryClient.invalidateQueries({
                queryKey: ["admins"],
            });
        },
        onError: (err) => {
            if (err.response.data.error.code === 11000) {
                toast.error("The email you registered is already in use");
            } else {
                toast.error(err.response.data.message);
            }
        },
    });

    return { isLoadingCreate, createAdmin };
}

export default useCreateAdmin;
