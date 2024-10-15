import { useQuery } from "@tanstack/react-query";
import { getTeacherSchedule } from "../../services/apiTeacher";

function useTeacherSchedule(teacherId) {
    const { isLoading, data, error } = useQuery({
        queryKey: ["teacherschedule", teacherId], 
        queryFn: () => getTeacherSchedule(teacherId), 
        refetchOnWindowFocus: false,
    });
    
    
    const teacherschedule = data?.data;
    console.log(teacherschedule);
    
    return { isLoading, teacherschedule, error };
}


export default useTeacherSchedule;
