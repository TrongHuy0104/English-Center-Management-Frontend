import { useQuery } from "@tanstack/react-query";
import { getAllCenters } from "../../../services/apiCenter";

function useCenters() {
    const { isLoading, data, error } = useQuery({
        queryKey: ["centers"],
        queryFn: getAllCenters,
        refetchOnWindowFocus: false,
    });

    const centers = data?.data?.data?.data;
    console.log("centers", centers);

    return { isLoading, centers, error };
}

export default useCenters;
