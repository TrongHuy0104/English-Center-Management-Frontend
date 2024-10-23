import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllFees, CreateFee, updateFee } from "../../../services/apiFee";

function useFee() {
  const queryClient = useQueryClient(); // QueryClient để thao tác lại với cache

  // Lấy danh sách phí
  const { isLoading, data, error } = useQuery({
    queryKey: ["fees"],
    queryFn: getAllFees,
    refetchOnWindowFocus: false, // Không refetch khi chuyển về tab này
  });

  // Hàm tạo mới phí
  const createFeeMutation = useMutation({
    mutationFn: CreateFee,
    onSuccess: () => {
      queryClient.invalidateQueries(["fees"]); // Làm mới danh sách phí sau khi tạo thành công
    },
  });

  // Hàm cập nhật phí
  const updateFeeMutation = useMutation({
    mutationFn: (updatedFeeData) =>
      updateFee(updatedFeeData.id, updatedFeeData), // Truyền đúng `id` và dữ liệu cập nhật

    onSuccess: () => {
      queryClient.invalidateQueries(["fees"]); // Invalidate cache để làm mới danh sách phí
    },
  });

  // Lấy danh sách phí từ dữ liệu trả về
  const fees = data?.data?.data?.data;

  return {
    isLoading,
    fees,
    error,
    createFee: createFeeMutation.mutate, // Gọi hàm tạo mới
    updateFee: updateFeeMutation.mutate, // Gọi hàm cập nhật
  };
}

export default useFee;
