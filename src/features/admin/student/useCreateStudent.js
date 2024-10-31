import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createStudent as createStudentApi } from "../../../services/apiStudent";

function useCreateStudent() {
    const queryClient = useQueryClient();
    const { isPending: isLoadingCreate, mutate: createStudent } = useMutation({
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
            createStudentApi({
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
                queryKey: ["students"],
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

    return { isLoadingCreate, createStudent };
}

export default useCreateStudent;
