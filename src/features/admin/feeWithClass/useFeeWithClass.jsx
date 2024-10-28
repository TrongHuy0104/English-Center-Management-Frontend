import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  getFee,
  deleteClassInFee,
  createClassInFee,
} from "../../../services/apiFee";

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

  // Mutation to handle class creation
  const { mutate: createClass, isLoading: isCreating } = useMutation({
    mutationFn: (newClassData) => createClassInFee(feeId, newClassData),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["feeDetail", feeId]);
    },
    onError: (error) => {
      console.error("Error creating class:", error);
      alert("Error creating class: " + error.message);
    },
  });

  return {
    isLoading,
    feeDetail,
    error,
    handleDeleteClass,
    isDeleting,
    createClass,
    isCreating,
  };
}
export default useFeeWithClass;
