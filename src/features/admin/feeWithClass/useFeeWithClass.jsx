import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getFee, deleteClassInFee } from "../../../services/apiFee";

function useFeeWithClass(feeId) {
  const queryClient = useQueryClient();
  const { isLoading, data, error } = useQuery({
    queryKey: ["feeDetail", feeId],
    queryFn: () => getFee(feeId),

    enabled: !!feeId,
  });

  // Dữ liệu của phí sau khi lấy được từ API
  const feeDetail = data?.data?.data?.fee;

  // Mutation để xử lý việc xóa class
  const { mutate: removeClass, isLoading: isDeleting } = useMutation({
    mutationFn: ({ feeId, classId }) => {
      return deleteClassInFee(feeId, classId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["feeDetail", feeId]);
    },
    onError: (error) => {
      console.error("Error deleting class:", error);
      alert("Error deleting class: " + error.message);
    },
  });

  const handleDeleteClass = (classId) => {
    removeClass({ feeId, classId });
  };

  return { isLoading, feeDetail, error, handleDeleteClass, isDeleting };
}
export default useFeeWithClass;
