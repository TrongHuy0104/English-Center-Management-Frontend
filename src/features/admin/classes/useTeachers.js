import { useQuery } from "@tanstack/react-query";
import { getClassTeachers } from "../../../services/apiTeacher";

export default function useTeachers() {
    const { isLoading, data, error } = useQuery({
        queryKey: ["class-teachers"],
        queryFn: getClassTeachers,
        refetchOnWindowFocus: false,
    });

    const teachers = data?.data?.data?.data;

    return { isLoading, teachers, error };
}
