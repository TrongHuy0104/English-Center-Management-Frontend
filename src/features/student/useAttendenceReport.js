import { useQuery } from "@tanstack/react-query";
import { getAttendanceReport } from "../../services/apiStudent";

function useAttendenceReport(studentId) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["attendences"],
    queryFn: () => getAttendanceReport(studentId),
    refetchOnWindowFocus: false,
  });
  console.log("data", data);
  const attendanceReport = data?.data?.data?.student || " ";
  console.log("attendanceReport", attendanceReport);
  return { isLoading, attendanceReport, error };
}

export default useAttendenceReport;
