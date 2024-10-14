import { useQuery } from "@tanstack/react-query";
import { getTeacherSchedule } from "../../services/apiTeacher";

function useTeacherSchedule(teacherId) {
    const { isLoading, data, error } = useQuery({
        queryKey: ["teacherschedule", teacherId], 
        queryFn: () => getTeacherSchedule(teacherId), 
        refetchOnWindowFocus: false,
    });
    
    
    const schedule = data?.data?.data;

    return { isLoading, schedule, error };
}


export default useTeacherSchedule;
