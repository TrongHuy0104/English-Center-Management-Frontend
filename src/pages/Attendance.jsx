import { useLocation } from "react-router-dom";
import Row from "../ui/Row";
import StudentList from "../features/teacher/attendance/StudenList";

function TakeAttendancePage() {
    const location = useLocation();
    const students = location.state?.students || []; // Retrieve students data

    return (
        <>
            <Row type="horizontal">
                <h2>Teacher Attendance</h2>
            </Row>
            
            <StudentList students={students} /> {/* Pass students as a prop */}
        </>
    );
}

export default TakeAttendancePage;
