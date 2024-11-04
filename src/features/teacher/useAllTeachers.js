import { useQuery } from "@tanstack/react-query";
import { getAllTeachers } from "../../services/apiTeacher";

function useAllTeachers() {
    const { isLoading, data, error } = useQuery({
        queryKey: ["teachers"],
        queryFn: () => getAllTeachers(),
        refetchOnWindowFocus: false,
    });

    const teachers = data?.data?.data?.data;

    return { isLoading, teachers, error };
}

export default useAllTeachers;
