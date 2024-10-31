import { useQuery } from "@tanstack/react-query";
import { getAttendanceByStudentId } from "../../../services/apiAttendance"; // Ensure the path is correct

const useAttendance = (studentId) => {
  // Use the useQuery hook to fetch data
  const { data, error, isLoading } = useQuery({
    queryKey: ["attendanceReports", studentId],
    queryFn: () => getAttendanceByStudentId(studentId),
    enabled: !!studentId, // Only run the query if studentId is provided
  });

  return {
    attendanceReports: data?.data || [], // Assuming the data structure returned from the API
    error,
    isLoading,
  };
};

export default useAttendance;
