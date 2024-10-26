import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateAdmin as updateAdminApi } from "../../../services/apiAdmin";

function useUpdateAdmin() {
    const queryClient = useQueryClient();
    const { isPending: isLoadingUpdate, mutate: updateAdmin } = useMutation({
        mutationFn: ({ data, id }) => updateAdminApi(data, id),
        onSuccess: () => {
            toast.success("Update successfully!");
            queryClient.invalidateQueries({
                queryKey: ["admins"],
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

    return { isLoadingUpdate, updateAdmin };
}

export default useUpdateAdmin;
