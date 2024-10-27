import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAttendanceData,takeAttendance } from '../../../services/apiTeacher';

function StudentList() {
    const location = useLocation();
    const navigate = useNavigate();
    const { teacherId, todayDate, slot } = location.state || {};
    const [attendanceData, setAttendanceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        console.log("ok");
        console.log(teacherId, todayDate, slot);
        
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
                    ? { ...student, status: student.status === 'present' ? 'absent' : 'present' }
                    : student
            ),
        }));
    };
    if (error) {
        return <p>{error}</p>; 
    }
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
            <h1>Attendance Details</h1>

            <h2>Student Attendance</h2>
            {attendanceData.student_attendance && attendanceData.student_attendance.length > 0 ? (
                <ul>
                    {attendanceData.student_attendance.map((student) => (
                        <li key={student._id} style={{ marginBottom: '10px' }}>
                            <p>Student ID: {student.student_id}</p>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={student.status === 'present'}
                                    onChange={() => handleStatusChange(student.student_id)}
                                    style={{
                                        accentColor: student.status === 'present' ? 'green' : 'gray',
                                    }}
                                />
                                Present
                            </label>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No student attendance data available.</p>
            )}
            <button onClick={handleSubmit}>Submit Attendance</button>
        </div>
    );
}


export default StudentList;
