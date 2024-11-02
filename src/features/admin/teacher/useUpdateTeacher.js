import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateTeacher as updateTeacherApi } from "../../../services/apiTeacher";

function useUpdateTeacher() {
  const queryClient = useQueryClient();
  const { isPending: isLoadingUpdate, mutate: updateTeacher } = useMutation({
    mutationFn: ({ data, id }) => updateTeacherApi(data, id),
    onSuccess: () => {
      toast.success("Update successfully!");
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
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

  return { isLoadingUpdate, updateTeacher };
}

export default useUpdateTeacher;
