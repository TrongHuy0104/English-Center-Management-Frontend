import React, { useEffect, useState } from "react";
import useUser from "../../authentication/useUser";
import { useNavigate } from "react-router-dom";
import { getClassesByTeacherId, takeAttendance, getAttendanceData } from "../../../services/apiTeacher";

function DashboardFilter() {
    const { isLoading: isLoadingUser, user } = useUser();
    const teacherId = user?.roleDetails?._id;
    const navigate = useNavigate();
    const date = new Date();
    date.setHours(date.getHours() + 7);
    const todayDate = date.toISOString().split("T")[0]; 
    const [classData, setClassData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClassData = async () => {
            setIsLoading(true);
            try {
                const response = await getClassesByTeacherId(teacherId);
                const classes = response.data?.data?.classes || [];
                const slotsToday = classes[0]?.schedule.filter(
                    (s) => s.date.split("T")[0] === todayDate
                ) || [];
                setClassData({ ...classes[0], schedule: slotsToday });
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };
            
        if (teacherId) fetchClassData();
    }, [teacherId, todayDate]);
    const handleTakeAttendance = ( slot) => {
        console.log(teacherId, todayDate, slot);
        
        navigate("/teacher/attendance/take-attendance", { 
            state: { teacherId, todayDate, slot }
        });
    };

    if (isLoadingUser || isLoading) {
        return <div>Loading...</div>;
    }
    
    return (
        <div>
            <h2>Attendance Data</h2>
            {classData?.schedule.length > 0 ? (
                classData.schedule.map((slot) => {
                    return (
                        <div key={slot.slot}>
                            <h3>Class Attendance for Slot {slot.slot}</h3>
                            <p>Class Name: {classData.name}</p>
                            <p>Date: {new Date().toLocaleDateString()}</p>
                            <p>Slot: {slot.slot}</p>
                            <p>Time: {slot.start_time} - {slot.end_time}</p>
                            <button onClick={() => handleTakeAttendance(slot.slot)}>Take Attendance</button> 
                        </div>
                    );
                })
            ) : (
                <p>No attendance data available for today.</p>
            )}
            {error && <p>Error: {error.message}</p>} 
        </div>
    );
}

export default DashboardFilter;
