import axios from "../utils/axios";

export async function login(data) {
  try {
    const res = await axios({
      method: "POST",
      url: `/students/login`,
      data: data,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getStudentById(studentId) {
  try {
    const res = await axios.get(`/students/${studentId}`, {
      withCredentials: true,
    });
    // console.log("Res", res);
    return res;
  } catch (error) {
    console.log("Error get student by id", error);
  }
}

// Function updateStudent
export async function updateStudent(studentId, studentData) {
  try {
    const res = await axios.put(`/students/${studentId}`, studentData, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.log("Error updating student:", error);
    throw error;
  }
}

export async function getAttendanceReport(studentId) {
  try {
    const res = await axios.get(`/attendence-report/${studentId}`, {
      withCredentials: true,
    });
    return res; // Ensure you return the data you need
  } catch (error) {
    console.error("Error fetching attendance report:", error);
    throw error; // Rethrow if you want to handle this in the component
  }
}
