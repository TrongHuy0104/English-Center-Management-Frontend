import useUser from "../features/authentication/useUser";
import useAttendenceReport from "../features/student/useAttendenceReport";
import Tabel from "../ui/Table";

const AttendanceReport = () => {
  const { user } = useUser();
  const studentId = user.roleDetails._id;
  const { isLoading, attendanceReport, error } = useAttendenceReport(studentId);
  console.log("API response:", attendanceReport);

  console.log("name", attendanceReport.name);

  if (isLoading) {
    return <div>Loading attendance report...</div>;
  }

  if (error) {
    return <div>Error fetching attendance report: {error.message}</div>;
  }

  return (
    <div className="attendance-report-container">
      <h1>Attendance Report</h1>
      {attendanceReport ? (
        <Tabel className="attendance-report-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Class</th>
              <th>Student Name</th>
              <th>Student Status</th>
            </tr>
          </thead>
          <tbody>
            <tr key={attendanceReport._id}>
              <td>{new Date(attendanceReport.date).toLocaleDateString()}</td>
              <td>{attendanceReport.classes.join(", ")}</td>
              <td>{attendanceReport.name}</td>
              <td>{attendanceReport.attendances.join(", ")}</td>{" "}
            </tr>
          </tbody>
        </Tabel>
      ) : (
        <p>No attendance records found for this student.</p>
      )}
    </div>
  );
};

export default AttendanceReport;
