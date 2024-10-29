import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createClass as createClassApi } from "../../../services/apiClass";

function useCreateClass() {
    const queryClient = useQueryClient();
    const { isPending: isLoadingCreate, mutate: createClass } = useMutation({
        mutationFn: createClassApi,
        onSuccess: () => {
            toast.success("Create successfully!");
            queryClient.invalidateQueries({
                queryKey: ["classes"],
            });
        },
        onError: (err) => {
            toast.error(err.response.data.message);
        },
    });

    return { isLoadingCreate, createClass };
}

export default useCreateClass;
