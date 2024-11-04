import { useQuery } from "@tanstack/react-query";
import { getClassesByTeacherId } from "../../../services/apiTeacher";

function useSlotAttendance(teacherId) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["classesByTeacher", teacherId],
        queryFn: () => getClassesByTeacherId(teacherId),
        enabled: !!teacherId, // Only runs if teacherId is truthy
        refetchOnWindowFocus: false,
    });

    const classData = data?.data || [];

    return { isLoading, classData, error };
}

export default useSlotAttendance;
