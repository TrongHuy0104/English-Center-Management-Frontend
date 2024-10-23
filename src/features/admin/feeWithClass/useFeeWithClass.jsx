import { useQuery } from "@tanstack/react-query";
import { getFee } from "../../../services/apiFee";

function useFeeWithClass(feeId) {
  // Gọi useQuery với queryKey bao gồm feeId, và truyền hàm getFee với feeId
  const { isLoading, data, error } = useQuery({
    queryKey: ["feeDetail", feeId], // QueryKey bao gồm feeId
    queryFn: () => getFee(feeId), // Hàm query nhận feeId để fetch chi tiết phí
    // refetchOnWindowFocus: false, // Không fetch lại khi mất và lấy lại focus
    enabled: !!feeId, // Chỉ thực hiện fetch nếu feeId tồn tại
  });

  // Dữ liệu của phí sau khi lấy được từ API
  const feeDetail = data?.data?.data?.fee; // Đảm bảo trả về đúng cấu trúc từ API

  return { isLoading, feeDetail, error };
}
export default useFeeWithClass;
