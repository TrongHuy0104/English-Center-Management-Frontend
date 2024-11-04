import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { disableStudent as disableStudentApi } from "../../../services/apiStudent";

function useDisableAdmin() {
    const queryClient = useQueryClient();

    const { isPending: isLoadingDisable, mutate: disableStudent} = useMutation({
        mutationFn: disableStudentApi,
        onSuccess: () => {
            toast.success("Student successfully disabled");
            queryClient.invalidateQueries({
                queryKey: ["students"],
            });
        },
        onError: (err) => toast.error(err.message),
    });
    return { isLoadingDisable, disableStudent };
}

export default useDisableAdmin;
