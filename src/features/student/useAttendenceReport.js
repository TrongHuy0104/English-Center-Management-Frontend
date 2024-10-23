import { useEffect, useState } from "react";
import { getAttendanceById } from "../../services/apiStudent";

const useAttendenceReport = (attendance) => {
  const [attendanceReports, setAttendanceReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendanceReports = async () => {
      try {
        setIsLoading(true);
        const reports = await Promise.all(
          attendance.map((id) => getAttendanceById(id))
        );
        const validReports = reports
          .map((report) => report.data)
          .filter((data) => data);
        setAttendanceReports(validReports);
      } catch (err) {
        console.error("Error fetching attendance reports:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (attendance && attendance.length > 0) {
      fetchAttendanceReports();
    } else {
      setIsLoading(false);
    }
  }, [attendance]);

  return { isLoading, attendanceReports, error };
};

export default useAttendenceReport;
