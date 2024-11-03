import Row from "../ui/Row";
import TeacherClassAttendance from "../features/teacher/attendance/TeacherClassAttendance";

export default function TeacherClass() {
    return (
        <>
            <Row type="horizontal">
                <h1>Teacher Attendance</h1>
            </Row>

            <TeacherClassAttendance />
        </>
    );
}
