import useAttendance from "./useTeacherAttendance";
import useUser from "../../authentication/useUser";
import useSlotAttendance from "./useSlotAttendance";
import { useNavigate } from "react-router-dom";
import "../../../styles/DashboardFilter.css";

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

    const navigate = useNavigate();

    const handleTakeAttendance = (index) => {
        const students = attendanceHooks[index].attendanceData?.data?.attendance?.student_attendance || [];
        navigate('/teacher/attendance/takeattendance', { state: { students } });
    };

    if (isLoadingUser || isLoadingSlot || isLoadingAttendance) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-filter">
            {/* <h2>Attendance Data</h2> */}
            {matchingSlots.length > 0 ? (
                <div className="attendance-table">
                    {/* Header Container */}
                    <div className="header-container">
                        <div>No.</div> {/* New No. Column */}
                        <div>Class Name</div>
                        <div>Date</div>
                        <div>Slot</div>
                        <div>Time</div>
                        <div>Action</div>
                    </div>

                    {/* Data Rows */}
                    {matchingSlots.map((slot, index) => {
                        const attendance = attendanceHooks[index].attendanceData?.data?.attendance;

                        return (
                            <div className="row-container" key={slot.slot}>
                                <div>{index + 1}</div> {/* Serial number */}
                                <div>{classData.classes[0]?.name}</div>
                                <div>{new Date(attendance?.date).toLocaleDateString()}</div>
                                <div>{attendance?.slot}</div>
                                <div>{attendance?.start_time} - {attendance?.end_time}</div>
                                <div>
                                    <button onClick={() => handleTakeAttendance(index)}>Take Attendance</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>No attendance data available for today.</p>
            )}
        </div>
    );
}

export default DashboardFilter;
