import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../utils/constants";
import { getClasses } from "../../../services/apiClass";

function useClasses() {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

    // PAGING
    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    const { isLoading, data, error } = useQuery({
        queryKey: ["classes", page],
        queryFn: () => getClasses({ page }),
        refetchOnWindowFocus: false,
    });

    const classes = data?.data?.data?.data;
    const total = data?.data?.results;

    // PREFETCHING
    const pageCount = total < PAGE_SIZE ? total : Math.ceil(total / PAGE_SIZE);
    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["classes", page + 1],
            queryFn: () => getClasses({ page: page + 1 }),
        });

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["classes", page - 1],
            queryFn: () => getClasses({ page: page - 1 }),
        });

    return { isLoading, classes, total, error };
}

export default useClasses;
