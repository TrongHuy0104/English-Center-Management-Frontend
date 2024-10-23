import useUser from "../features/authentication/useUser";
import useAttendenceReport from "../features/student/useAttendenceReport";
import Table from "../ui/Table";
import { getClassById } from "../services/apiStudent";
import { useEffect, useState } from "react";

const AttendanceReport = () => {
  const { user } = useUser();
  const attendance = user.roleDetails.attendances;

  const { isLoading, attendanceReports, error } =
    useAttendenceReport(attendance);

  const [classNames, setClassNames] = useState({});

  useEffect(() => {
    const fetchClassNames = async () => {
      const names = {};
      const classPromises = attendanceReports.map(async (report) => {
        const classId = report.class;
        try {
          const classData = await getClassById(classId);
          names[classId] = classData.data.classes.name || "Unknown Class";
        } catch (error) {
          console.error(`Error fetching class name for ID ${classId}:`, error);
          names[classId] = "Class Not Found";
        }
      });
      await Promise.all(classPromises);
      setClassNames(names);
    };

    if (attendanceReports && attendanceReports.length > 0) {
      fetchClassNames();
    }
  }, [attendanceReports]);

  if (isLoading) {
    return <div>Loading attendance report...</div>;
  }

  if (error) {
    return <div>Error fetching attendance report: {error.message}</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="attendance-report-container">
      <h1>Attendance Report</h1>

      {attendanceReports && attendanceReports.length > 0 ? (
        <Table columns="2fr 3fr 4fr ">
          <Table.Header>
            <div>Date</div>
            <div>Class</div>
            <div>Student Status</div>
          </Table.Header>
          <div>
            {attendanceReports.map((attendanceReport) => {
              const studentAttendance =
                attendanceReport.student_attendance.find(
                  (student) => student.student_id === user.roleDetails._id
                );

              if (studentAttendance) {
                const className =
                  classNames[attendanceReport.class] || "Class Not Found";
                return (
                  <tr key={attendanceReport._id}>
                    <td>{formatDate(attendanceReport.date)}</td>
                    <td>{className}</td>
                    <td>
                      <span>{studentAttendance.status}</span>
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </div>
        </Table>
      ) : (
        <p>No attendance records found for this student.</p>
      )}
    </div>
  );
};

export default AttendanceReport;
