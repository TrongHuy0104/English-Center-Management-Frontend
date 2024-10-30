import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { disableAdmin as disableAdminApi } from "../../../services/apiAdmin";

function useDisableAdmin() {
    const queryClient = useQueryClient();

    const { isPending: isLoadingDisable, mutate: disableAdmin } = useMutation({
        mutationFn: disableAdminApi,
        onSuccess: () => {
            toast.success("Admin successfully disabled");
            queryClient.invalidateQueries({
                queryKey: ["admins"],
            });
        },
        onError: (err) => toast.error(err.message),
    });
    return { isLoadingDisable, disableAdmin };
}

export default useDisableAdmin;
