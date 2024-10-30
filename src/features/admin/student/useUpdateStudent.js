import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateStudent as updateStudentApi } from "../../../services/apiStudent";

function useUpdateStudent() {
    const queryClient = useQueryClient();
    const { isPending: isLoadingUpdate, mutate: updateStudent } = useMutation({
        mutationFn: ({ data, id }) => updateStudentApi(data, id),
        onSuccess: () => {
            toast.success("Update successfully!");
            queryClient.invalidateQueries({
                queryKey: ["students"],
            });
        },
        onError: (err) => {
            if (err.response.data.error.code === 11000) {
                toast.error("The email is already in use");
            } else {
                toast.error(err.response.data.message);
            }
        },
    });

    return { isLoadingUpdate, updateStudent };
}

export default useUpdateStudent;
