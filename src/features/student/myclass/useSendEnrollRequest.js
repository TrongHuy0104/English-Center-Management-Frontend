import { useMutation } from "@tanstack/react-query";
import { sendEnrollRequest } from "../../../services/apiStudent";
import { toast } from "react-hot-toast";

export default function useSendEnrollRequest() {
  const mutation = useMutation({
    mutationFn: sendEnrollRequest,
    onSuccess: () => {
      toast.success("Enroll request sent successfully!");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to send enroll request."
      );
    },
  });

  return mutation;
}
