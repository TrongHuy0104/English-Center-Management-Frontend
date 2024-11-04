import axios from "../utils/axios";

export const getTeacherAttendanceSummary = async (
  teacherId,
  startDay,
  endDay
) => {
  try {
    const response = await axios.get(
      `/attendances/attendance-summary/${teacherId}`,
      {
        params: {
          startDay,
          endDay,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching teacher attendance summary:", error);
    throw error;
  }
};

export async function getAttendanceByStudentId(id) {
  try {
    const res = await axios.get(`/attendances/attendance/student/${id}`, {
      withCredentials: true,
    });
    if (!res || !res.data) {
      return null;
    }
    return res.data;
  } catch (error) {
    console.log("Error get student by id", error);
  }
}
