import { useRef, useState } from "react";
import Table from "../../../ui/Table";
import useAttendance from "./useAttendance";
import Spinner from "../../../ui/Spinner";
import useTakeAttendance from "./useTakeAttendance";
import useUser from "../../authentication/useUser";

const TableRow = ({ student, index, handleStatusChange }) => {
    const [status, setStatus] = useState(student.status);

    return (
        <Table.Row key={student.student_id._id}>
            <div>{index + 1}</div>
            <div>{student.student_id.name}</div>
            <div>{student.student_id.phone}</div>
            <div>{student.student_id.gender}</div>
            <div>
                <input
                    type="checkbox"
                    checked={status === "present"}
                    onChange={() => {
                        setStatus(status === "present" ? "absent" : "present");
                        handleStatusChange(index);
                    }}
                    style={{
                        accentColor: status === "present" ? "green" : "gray",
                    }}
                />
            </div>
        </Table.Row>
    );
};

function StudentList({ slot }) {
    const { isLoading: isLoadingAttendance, attendance } = useAttendance(slot);
    const { user } = useUser();
    const { isLoadingUpdate, takeAttendance } = useTakeAttendance();
    const studentAttendances = useRef([]);

    const handleStatusChange = (index) => {
        studentAttendances.current[index] =
            studentAttendances.current[index] === "absent"
                ? "present"
                : "absent";
    };

    if (isLoadingAttendance) return <Spinner />;

    studentAttendances.current = attendance?.student_attendance.map(
        (item) => item.status
    );

    return (
        <div>
            {attendance ? (
                <>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginBottom: "16px",
                        }}
                    >
                        <button
                            onClick={() =>
                                takeAttendance({
                                    id: user?.roleDetails._id,
                                    attendanceList: studentAttendances.current,
                                })
                            }
                            disabled={isLoadingUpdate}
                            style={{
                                backgroundColor: isLoadingUpdate
                                    ? "#ccc"
                                    : "#4f46e5",
                                color: "white",
                                padding: "8px 12px",
                                border: "none",
                                borderRadius: "4px",
                                cursor: isLoadingUpdate
                                    ? "not-allowed"
                                    : "pointer",
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
                            data={attendance.student_attendance}
                            render={(student, index) => (
                                <TableRow
                                    student={student}
                                    index={index}
                                    handleStatusChange={handleStatusChange}
                                />
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
