import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { enableAdmin as enableAdminApi } from "../../../services/apiAdmin";

function useEnableAdmin() {
    const queryClient = useQueryClient();

    const { isPending: isLoadingEnable, mutate: enableAdmin } = useMutation({
        mutationFn: enableAdminApi,
        onSuccess: () => {
            toast.success("Admin successfully enabled");
            queryClient.invalidateQueries({
                queryKey: ["admins"],
            });
        },
        onError: (err) => toast.error(err.message),
    });
    return { isLoadingEnable, enableAdmin };
}

export default useEnableAdmin;
