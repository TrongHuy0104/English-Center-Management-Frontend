import { useQuery } from "@tanstack/react-query";
import { getAttendanceData } from "../../../services/apiTeacher"; 

// Hook to load attendance data
function useAttendance(teacherId, date, slot) {
    const { isLoading, data, error } = useQuery({
        queryKey: ["attendanceData", teacherId, date, slot], 
        queryFn: () => getAttendanceData(teacherId, date, slot), 
        refetchOnWindowFocus: false,
    });

    const attendanceData = data?.data;
    
    return { isLoading, attendanceData, error };
}

export default useAttendance;
