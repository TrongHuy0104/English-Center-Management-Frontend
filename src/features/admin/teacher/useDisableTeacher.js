import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { disableTeacher as disableTeacherApi } from "../../../services/apiTeacher";

function useDisableTeacher() {
  const queryClient = useQueryClient();

  const { isPending: isLoadingDisable, mutate: disableTeacher } = useMutation({
    mutationFn: disableTeacherApi,
    onSuccess: () => {
      toast.success("Teacher successfully disabled");
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isLoadingDisable, disableTeacher };
}

export default useDisableTeacher;
