// src/pages/FeesPage.jsx
import Row from "../ui/Row";
import TeacherAttendance from "../features/teacher/attendance/TeacherAttendance";

function AttendancePage() {
  return (
    <>
      <Row type="horizontal">
        <h2>TeacherAttendance</h2>
      </Row>
      
      <TeacherAttendance />
    </>
  );
}

export default AttendancePage;