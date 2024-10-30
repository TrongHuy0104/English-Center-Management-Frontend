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
