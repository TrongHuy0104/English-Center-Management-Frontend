import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateClass as updateClassApi } from "../../../services/apiClass";

function useUpdateClass() {
    const queryClient = useQueryClient();
    const { isPending: isLoadingUpdate, mutate: updateClass } = useMutation({
        mutationFn: ({ data, id }) => updateClassApi(data, id),
        onSuccess: () => {
            toast.success("Update successfully!");
            queryClient.invalidateQueries({
                queryKey: ["classes"],
            });
        },
        onError: (err) => {
            toast.error(err.response.data.message);
        },
    });

    return { isLoadingUpdate, updateClass };
}

export default useUpdateClass;
