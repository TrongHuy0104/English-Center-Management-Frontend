import { useLocation } from "react-router-dom";
import Row from "../ui/Row";
// import StudentList from "../features/teacher/attendance/StudenList";

function TakeAttendancePage() {
    const location = useLocation();
    const students = location.state?.students || []; 
    return (
        <>
            <Row type="horizontal">
                <h1>Teacher Attendance</h1>
            </Row>
            
            <StudentList students={students} /> 
        </>
    );
}

export default TakeAttendancePage;
