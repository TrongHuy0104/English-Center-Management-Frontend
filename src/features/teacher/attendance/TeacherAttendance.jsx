import useAttendance from "./useTeacherAttendance";
import useUser from "../../authentication/useUser";
import useSlotAttendance from "./useSlotAttendance";
import { useNavigate } from "react-router-dom"; // Make sure to import useNavigate

function DashboardFilter() {
    const { isLoading: isLoadingUser, user } = useUser();
    const teacherId = user?.roleDetails?._id;
    const date = new Date(Date.now());
    date.setHours(date.getHours() + 7);
    const formattedDate = date.toISOString();
    const { isLoading: isLoadingSlot, classData } = useSlotAttendance(teacherId);
    const slot = classData?.classes[0]?.schedule || [];

    const matchingSlots = slot.filter((s) => s.date.split("T")[0] === formattedDate.split("T")[0]);

    const attendanceHooks = matchingSlots.map((s) => useAttendance(teacherId, formattedDate.split("T")[0], s.slot));

    const isLoadingAttendance = attendanceHooks.some((data) => data.isLoading);

    const navigate = useNavigate(); // Initialize navigate here

    const handleTakeAttendance = (index) => {
        const students = attendanceHooks[index].attendanceData?.data?.attendance?.student_attendance || [];
        navigate('/teacher/attendance/takeattendance', { state: { students } }); // Use navigate for navigation
    };

    if (isLoadingUser || isLoadingSlot || isLoadingAttendance) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Attendance Data</h2>
            {matchingSlots.length > 0 ? (
                matchingSlots.map((slot, index) => {
                    const attendance = attendanceHooks[index].attendanceData?.data?.attendance;

                    return (
                        <div key={slot.slot}>
                            <h3>Class Attendance for Slot {slot.slot}</h3>
                            <p>Class Name: {classData.classes[0]?.name }</p>
                            <p>Date: {new Date(attendance?.date).toLocaleDateString()}</p>
                            <p>Slot: {attendance?.slot}</p>
                            <p>Time: {attendance?.start_time} - {attendance?.end_time}</p>
                            <button onClick={() => handleTakeAttendance(index)}>Take Attendance</button>
                        </div>
                    );
                })
            ) : (
                <p>No attendance data available for today.</p>
            )}
        </div>
    );
}

export default DashboardFilter;
