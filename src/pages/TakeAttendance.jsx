// src/pages/FeesPage.jsx
import DashboardFilter from "../features/admin/dashboard/DashboardFilter";
import Row from "../ui/Row";


function AttendancePage() {
  return (
    <>
      <Row type="horizontal">
        <h2>TeacherAttendance</h2>
      </Row>
      <DashboardFilter />
    </>
  );
}

export default AttendancePage;