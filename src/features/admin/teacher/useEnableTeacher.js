import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { enableTeacher as enableTeacherApi } from "../../../services/apiTeacher";

function useEnableTeacher() {
  const queryClient = useQueryClient();

  const { isPending: isLoadingEnable, mutate: enableTeacher } = useMutation({
    mutationFn: enableTeacherApi,
    onSuccess: () => {
      toast.success("Teacher successfully enabled");
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isLoadingEnable, enableTeacher };
}

export default useEnableTeacher;
