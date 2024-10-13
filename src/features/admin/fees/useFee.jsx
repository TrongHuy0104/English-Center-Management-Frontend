import { useQuery } from "@tanstack/react-query";
import { getAllFees } from "../../../services/apiAuth";

function useFee() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["fees"],
    queryFn: getAllFees,
    refetchOnWindowFocus: false,
  });

  const fees = data?.data?.data?.fees; // Truy cập dữ liệu đơn giản hơn

  return { isLoading, fees, error };
}

export default useFee;
