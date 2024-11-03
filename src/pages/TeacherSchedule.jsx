// src/pages/FeesPage.jsx
import TeacherSchedule from "../features/teacher/schedule/TeacherSchedule";
import Row from "../ui/Row";

function TeacherClassSchedule() {
    return (
        <>
            <Row type="horizontal">
                <h1>Teacher Schedule</h1>
            </Row>
            <TeacherSchedule />
        </>
    );
}

export default TeacherClassSchedule;
