import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAttendanceData,
  takeAttendance,
} from "../../../services/apiTeacher";
import Table from "../../../ui/Table";


function StudentList() {
  const location = useLocation();
  const navigate = useNavigate();
  const { teacherId, todayDate, slot } = location.state || {};
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        setLoading(true);
        const response = await getAttendanceData(teacherId, todayDate, slot);
        setAttendanceData(response.data.data.attendance);
      } catch (err) {
        setError("Failed to load attendance data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (teacherId && todayDate && slot) {
      fetchAttendanceData();
    }
  }, [teacherId, todayDate, slot]);

  if (loading) return <p>Loading attendance data...</p>;
  if (error) return <p>{error}</p>;

  const handleStatusChange = (studentId) => {
    setAttendanceData((prevData) => ({
      ...prevData,
      student_attendance: prevData.student_attendance.map((student) =>
        student.student_id === studentId
          ? {
              ...student,
              status: student.status === "present" ? "absent" : "present",
            }
          : student
      ),
    }));
  };

  const handleSubmit = async () => {
    const attendanceList = attendanceData.student_attendance.map((student) => ({
      studentId: student.student_id,
      status: student.status,
    }));

    try {
      await takeAttendance(teacherId, todayDate, slot, attendanceList);
      alert("Attendance has been submitted successfully!");
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Failed to submit attendance. Please try again.");
    }
  };

  return (
    <div>
      {attendanceData.student_attendance &&
      attendanceData.student_attendance.length > 0 ? (
        <>
          <Table columns="0.5fr 1fr 1fr 1fr">
            <Table.Header>
              <div>No.</div>
              <div>Student ID</div>
              {/* <div>Status</div> */}
              <div>Mark Present</div>
            </Table.Header>
            <Table.Body
              data={attendanceData.student_attendance}
              render={(student, index) => (
                <Table.Row key={student._id}>
                  <div>{index + 1}</div> {/* Serial number */}
                  <div>{student.student_id}</div>
                  {/* <div>{student.status}</div> */}
                  <div>
                    <input
                      type="checkbox"
                      checked={student.status === "present"}
                      onChange={() => handleStatusChange(student.student_id)}
                      style={{
                        accentColor:
                          student.status === "present" ? "green" : "gray",
                      }}
                    />
                  </div>
                </Table.Row>
              )}
            />
          </Table>
          <button
            onClick={handleSubmit}
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
      {error && <p>{error}</p>}
    </div>
  );
}

export default StudentList;
