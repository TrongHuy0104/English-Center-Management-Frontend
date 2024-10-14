import { useQuery } from "@tanstack/react-query";
import { getAllFees } from "../../../services/apiAuth";

function useFee() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["fees"],
    queryFn: getAllFees,
    refetchOnWindowFocus: false,
  });

  console.log("data", data);

  const fees = data?.data?.data?.fees;
  console.log("useFee:", fees);

  return { isLoading, fees, error };
}

export default useFee;
