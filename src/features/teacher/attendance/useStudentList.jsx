import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getAttendanceData, takeAttendance } from "../../../services/apiTeacher";

function useStudentList(teacherId, todayDate, slot) {
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
                toast.error("Failed to load attendance data.");
            } finally {
                setLoading(false);
            }
        };

        if (teacherId && todayDate && slot) {
            fetchAttendanceData();
        }
    }, [teacherId, todayDate, slot]);

    const handleSubmitAttendance = async () => {
        const attendanceList = attendanceData.student_attendance.map((student) => ({
            studentId: student.student_id,
            status: student.status,
        }));

        try {
            await takeAttendance(teacherId, todayDate, slot, attendanceList);
            toast.success("Attendance has been submitted successfully!");
        } catch (error) {
            console.error("Error submitting attendance:", error);
            toast.error("Failed to submit attendance. Please try again.");
        }
    };

    return { attendanceData, loading, error, handleSubmitAttendance, setAttendanceData };
}

export default useStudentList;
