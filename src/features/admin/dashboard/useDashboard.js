import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../../../services/apiDashboard";

function useDashboard() {
    const { isLoading, data, error } = useQuery({
        queryKey: ["dashboard"],
        queryFn: () => getDashboard(),
        refetchOnWindowFocus: false,
    });

    const dashboard = data?.data;

    return { isLoading, dashboard, error };
}

export default useDashboard;
