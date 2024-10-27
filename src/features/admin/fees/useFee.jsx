import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllFees, CreateFee, updateFee } from "../../../services/apiFee";

function useFee(page = 1, limit = 10) {
  const queryClient = useQueryClient(); // QueryClient để thao tác lại với cache

  // Lấy danh sách phí với phân trang (page và limit)
  const { isLoading, data, error } = useQuery({
    queryKey: ["fees", page, limit], // Thêm page và limit vào queryKey
    queryFn: () => getAllFees(page, limit), // Truyền page và limit vào hàm getAllFees
    refetchOnWindowFocus: false,
  });

  // Hàm tạo mới phí
  const createFeeMutation = useMutation({
    mutationFn: CreateFee,
    onSuccess: () => {
      queryClient.invalidateQueries(["fees"]);
    },
  });

  // Hàm cập nhật phí
  const updateFeeMutation = useMutation({
    mutationFn: (updatedFeeData) =>
      updateFee(updatedFeeData.id, updatedFeeData),
    onSuccess: () => {
      queryClient.invalidateQueries(["fees"]);
    },
  });

  // Lấy danh sách phí từ dữ liệu trả về
  const fees = data?.data;

  return {
    isLoading,
    fees,
    error,
    createFee: createFeeMutation.mutate, // Gọi hàm tạo mới
    updateFee: updateFeeMutation.mutate, // Gọi hàm cập nhật
  };
}

export default useFee;
