import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllFeeOfStudent } from "../../../services/apiStudent";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../utils/constants";

function useFee() {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();
    
    // FILTER
    const statusFilter = searchParams.get("status") || "all";

    // PAGING
    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

    const { isLoading, data, error } = useQuery({
        queryKey: ["fees", statusFilter, page],
        queryFn: () => getAllFeeOfStudent({ page, limit: PAGE_SIZE, status: statusFilter }),
        refetchOnWindowFocus: false,
    });

    const fees = data?.data?.data?.fees || [];
    const total = data?.data?.results || 0;
    
    // PREFETCHING
    const pageCount = Math.ceil(total / PAGE_SIZE);
    if (page < pageCount) {
        queryClient.prefetchQuery({
            queryKey: ["fees", statusFilter, page + 1],
            queryFn: () => getAllFeeOfStudent({ page: page + 1, limit: PAGE_SIZE, status: statusFilter }),
        });
    }

    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["fees", statusFilter, page - 1],
            queryFn: () => getAllFeeOfStudent({ page: page - 1, limit: PAGE_SIZE, status: statusFilter }),
        });
    }
    
    return { isLoading, fees, total, error };
}

export default useFee;
