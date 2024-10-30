import { useQuery } from "@tanstack/react-query";
import { getFee } from "../../../services/apiFee";

function useFeeWithClass(feeId) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["feeDetail", feeId],
    queryFn: () => getFee(feeId),

    enabled: !!feeId,
  });

  // Dữ liệu của phí sau khi lấy được từ API
  const feeDetail = data?.data?.data?.fee;

  return { isLoading, feeDetail, error };
}
export default useFeeWithClass;
