import React, { useEffect, useState } from "react";
import useUser from "../../authentication/useUser";
import { useNavigate } from "react-router-dom";
import {
  getClassesByTeacherId,
  takeAttendance,
  getAttendanceData,
} from "../../../services/apiTeacher";
import Table from "../../../ui/Table";


function TeacherAttendance() {
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
        const slotsToday =
          classes[0]?.schedule.filter(
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

  const handleTakeAttendance = (slot) => {
    navigate("/teacher/attendance/take-attendance", {
      state: { teacherId, todayDate, slot },
    });
  };

  if (isLoadingUser || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {classData?.schedule.length > 0 ? (
        <Table columns="0.5fr 1fr 1fr 1fr 1fr 1fr">
          <Table.Header>
            <div>No.</div>
            <div>Class Name</div>
            <div>Date</div>
            <div>Slot</div>
            <div>Time</div>
            <div>Action</div>
          </Table.Header>
          <Table.Body
            data={classData.schedule}
            render={(slot, index) => (
              <Table.Row key={slot.slot}>
                <div>{index + 1}</div> {/* Auto-incremented index */}
                <div>{classData.name}</div>
                <div>{new Date().toLocaleDateString()}</div>
                <div>{slot.slot}</div>
                <div>
                  {slot.start_time} - {slot.end_time}
                </div>
                <div>
                  <button
                    onClick={() => handleTakeAttendance(slot.slot)}
                    style={{
                      backgroundColor: "#4f46e5",
                      color: "white",
                      padding: "8px 12px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Take Attendance
                  </button>
                </div>
              </Table.Row>
            )}
          />
        </Table>
      ) : (
        <p>No attendance data available for today.</p>
      )}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default TeacherAttendance;
