import { useQuery } from "@tanstack/react-query";
import { getAttendanceByStudentId } from "../../../services/apiAttendance";

const useAttendance = (studentId) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["attendanceReports", studentId],
    queryFn: () => getAttendanceByStudentId(studentId),
    enabled: !!studentId,
  });

  return {
    attendanceReports: data?.data || [],
    error,
    isLoading,
  };
};

export default useAttendance;
