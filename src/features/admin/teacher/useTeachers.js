import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllTeachers } from "../../../services/apiTeacher";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../utils/constants";

function useTeachers() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // FILTER
  const filterValue = searchParams.get("active");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "active", value: filterValue, method: "eq" };

  // PAGING
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isLoading, data, error } = useQuery({
    queryKey: ["teachers", filter, page],
    queryFn: () => getAllTeachers({ filter, page }),
    refetchOnWindowFocus: false,
  });

  const teachers = data?.data?.data?.data;
  const total = data?.data?.results;

  // PREFETCHING
  const pageCount = total < PAGE_SIZE ? total : Math.ceil(total / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["teachers", filter, page + 1],
      queryFn: () => getAllTeachers({ filter, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["teachers", filter, page - 1],
      queryFn: () => getAllTeachers({ filter, page: page - 1 }),
    });

  return { isLoading, teachers, total, error };
}

export default useTeachers;
