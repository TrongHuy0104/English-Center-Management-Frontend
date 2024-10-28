import React from "react";
import { useLocation } from "react-router-dom";
import useStudentList from "./useStudentList";
import Table from "../../../ui/Table";

function StudentList() {
    const location = useLocation();
    const { teacherId, todayDate, slot } = location.state || {};
    const { attendanceData, loading, error, handleSubmitAttendance, setAttendanceData } = useStudentList(teacherId, todayDate, slot);

    const handleStatusChange = (studentId) => {
        setAttendanceData((prevData) => ({
            ...prevData,
            student_attendance: prevData.student_attendance.map((student) =>
                student.student_id === studentId
                    ? { ...student, status: student.status === "present" ? "absent" : "present" }
                    : student
            ),
        }));
    };

    if (loading) return <p>Loading attendance data...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {attendanceData && attendanceData.student_attendance.length > 0 ? (
                <>
                    <Table columns="0.5fr 1fr 1fr 1fr">
                        <Table.Header>
                            <div>No.</div>
                            <div>Student ID</div>
                            <div>Mark Present</div>
                        </Table.Header>
                        <Table.Body
                            data={attendanceData.student_attendance}
                            render={(student, index) => (
                                <Table.Row key={student._id}>
                                    <div>{index + 1}</div>
                                    <div>{student.student_id}</div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            checked={student.status === "present"}
                                            onChange={() => handleStatusChange(student.student_id)}
                                            style={{
                                                accentColor: student.status === "present" ? "green" : "gray",
                                            }}
                                        />
                                    </div>
                                </Table.Row>
                            )}
                        />
                    </Table>
                    <button
                        onClick={handleSubmitAttendance}
                        style={{
                            backgroundColor: "#4f46e5",
                            color: "white",
                            padding: "8px 12px",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        Submit Attendance
                    </button>
                </>
            ) : (
                <p>No student attendance data available.</p>
            )}
        </div>
    );
}

export default StudentList;
