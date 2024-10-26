import { useQuery } from "@tanstack/react-query";
import { getClassesByTeacherId } from "../../../services/apiTeacher"; 

// Hook to load attendance data
function useSlotAttendance(teacherId) {
    const { isLoading, data, error } = useQuery({
        queryKey: ["attendanceData", teacherId], 
        queryFn: () => getClassesByTeacherId(teacherId), 
        refetchOnWindowFocus: false,
    });
    const classData = data?.data?.data;
   
    return { isLoading, classData, error };
}

export default useSlotAttendance;