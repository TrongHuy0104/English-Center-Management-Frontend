import { useQuery } from "@tanstack/react-query";
import { getAllFeeOfStudent } from "../../../services/apiStudent";

function useFee() {
    const { isLoading, data, error } = useQuery({
        queryKey: ["fees"],
        queryFn: getAllFeeOfStudent,
        refetchOnWindowFocus: false,
    });

    const fees = data?.data?.data?.fees;  // Truy cập dữ liệu đơn giản hơn

    return { isLoading, fees, error };
}


export default useFee;
