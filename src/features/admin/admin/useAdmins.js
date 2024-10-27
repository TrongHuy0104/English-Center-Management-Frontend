import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdmins } from "../../../services/apiAdmin";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../utils/constants";

function useAdmins() {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

    // FILTER
    const filterValue = searchParams.get("active");
    const filter =
        !filterValue || filterValue === "all"
            ? null
            : { field: "active", value: filterValue, method: "eq" };

    // PAGING
    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    const { isLoading, data, error } = useQuery({
        queryKey: ["admins", filter, page],
        queryFn: () => getAdmins({ filter, page }),
        refetchOnWindowFocus: false,
    });

    const admins = data?.data?.data?.data;
    const total = data?.data?.results;

    // PREFETCHING
    const pageCount = total < PAGE_SIZE ? total : Math.ceil(total / PAGE_SIZE);
    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["admins", filter, page + 1],
            queryFn: () => getAdmins({ filter, page: page + 1 }),
        });

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["admins", filter, page - 1],
            queryFn: () => getAdmins({ filter, page: page - 1 }),
        });

    return { isLoading, admins, total, error };
}

export default useAdmins;
