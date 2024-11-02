import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { enableStudent as enableStudentApi } from "../../../services/apiStudent";

function useEnableStudent() {
    const queryClient = useQueryClient();

    const { isPending: isLoadingEnable, mutate: enableStudent } = useMutation({
        mutationFn: enableStudentApi,
        onSuccess: () => {
            toast.success("Student successfully enabled");
            queryClient.invalidateQueries({
                queryKey: ["students"],
            });
        },
        onError: (err) => toast.error(err.message),
    });
    return { isLoadingEnable, enableStudent };
}

export default useEnableStudent;
