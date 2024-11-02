import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createTeacher as createTeacherApi } from "../../../services/apiTeacher";

function useCreateTeacher() {
  const queryClient = useQueryClient();
  const { isPending: isLoadingCreate, mutate: createTeacher } = useMutation({
    mutationFn: ({
      name,
      email,
      password,
      passwordConfirm,
      role,
      gender,
      phone,
      shiftPay,
      classes,
    }) =>
      createTeacherApi({
        name,
        email,
        password,
        passwordConfirm,
        role,
        gender,
        phone,
        shiftPay,
        classes,
      }),
    onSuccess: () => {
      toast.success("Create successfully!");
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });
    },
    onError: (err) => {
      if (err.response.data.error.code === 11000) {
        toast.error("The email you registered is already in use");
      } else {
        toast.error(err.response.data.message);
      }
    },
  });

  return { isLoadingCreate, createTeacher };
}

export default useCreateTeacher;
