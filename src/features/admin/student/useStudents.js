import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStudents } from "../../../services/apiStudent";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../utils/constants";

function useStudents() {
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
        queryKey: ["students", filter, page],
        queryFn: () => getStudents({ filter, page }),
        refetchOnWindowFocus: false,
    });

    const students = data?.data?.data?.data;
    console.log(students);
    const total = data?.data?.results;

    // PREFETCHING
    const pageCount = total < PAGE_SIZE ? total : Math.ceil(total / PAGE_SIZE);
    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["students", filter, page + 1],
            queryFn: () => getStudents({ filter, page: page + 1 }),
        });

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["students", filter, page - 1],
            queryFn: () => getStudents({ filter, page: page - 1 }),
        });
        console.log(students);
    return { isLoading, students, total, error };
}

export default useStudents;
