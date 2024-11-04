import Row from "../ui/Row";
import StudentList from "../features/teacher/attendance/StudentList";
import { useParams } from "react-router-dom";

function TakeAttendanceStudent() {
    const { slot } = useParams();
    return (
        <>
            <Row type="horizontal">
                <h1>Teacher Attendance</h1>
            </Row>

            <StudentList slot={slot} />
        </>
    );
}

export default TakeAttendanceStudent;
