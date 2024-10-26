import { useQuery } from "@tanstack/react-query";
import { getAttendanceData } from "../../../services/apiTeacher"; 

// Hook to load attendance data
function useAttendance(classId, date, slot) {
    const { isLoading, data, error } = useQuery({
        queryKey: ["attendanceData", classId, date, slot], 
        queryFn: () => getAttendanceData(classId, date, slot), 
        refetchOnWindowFocus: false,
    });

    const attendanceData = data?.data;
    
    return { isLoading, attendanceData, error };
}

export default useAttendance;
