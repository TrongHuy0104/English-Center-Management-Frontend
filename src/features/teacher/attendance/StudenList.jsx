import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useStudentList from "./useStudentList";
import Table from "../../../ui/Table";
import { getStudentDetails } from "../../../services/apiStudent";

function StudentList() {
    const location = useLocation();
    const { teacherId, todayDate, slot } = location.state || {};
    const { attendanceData, loading, error, handleSubmitAttendance, setAttendanceData } = useStudentList(teacherId, todayDate, slot);


    const { data: detailedAttendanceData } = useQuery({
        queryKey: ['studentDetails', attendanceData],
        queryFn: async () => {
            if (!attendanceData) return null;
            
            const updatedStudentAttendance = await Promise.all(
                attendanceData.student_attendance.map(async (student) => {
                    const studentDetails = await getStudentDetails(student.student_id);
                    return {
                        ...student,
                        ...studentDetails.data.data,
                    };
                })
            );
            return {
                ...attendanceData,
                student_attendance: updatedStudentAttendance,
            };
        },
        enabled: !!attendanceData,
    });

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

    const submitAttendance = async () => {
        await handleSubmitAttendance(attendanceData);
    };

    const isSubmitDisabled = attendanceData && attendanceData.student_attendance.every((student) => student.status === "absent");

    if (loading) return <p>Loading attendance data...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {detailedAttendanceData && detailedAttendanceData.student_attendance.length > 0 ? (
                <>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
                        <button
                            onClick={submitAttendance}
                            disabled={isSubmitDisabled}
                            style={{
                                backgroundColor: isSubmitDisabled ? "#ccc" : "#4f46e5",
                                color: "white",
                                padding: "8px 12px",
                                border: "none",
                                borderRadius: "4px",
                                cursor: isSubmitDisabled ? "not-allowed" : "pointer",
                            }}
                        >
                            Submit Attendance
                        </button>
                    </div>
                    <Table columns="0.5fr 1fr 1fr 1fr 1fr 1fr">
                        <Table.Header>
                            <div>No.</div>
                            <div>Name</div>
                            <div>Phone</div>
                            <div>Gender</div>
                            <div>Mark Present</div>
                        </Table.Header>
                        <Table.Body
                            data={detailedAttendanceData.student_attendance}
                            render={(student, index) => (
                                <Table.Row key={student._id}>
                                    <div>{index + 1}</div>
                                    <div>{student.name}</div>
                                    <div>{student.phone}</div>
                                    <div>{student.gender}</div>
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
                </>
            ) : (
                <p>No student attendance data available.</p>
            )}
        </div>
    );
}

export default StudentList;