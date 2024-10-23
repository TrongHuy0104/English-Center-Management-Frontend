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
    return res.data;
  } catch (error) {
    console.log("Error get student by id", error);
  }
}

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

export async function getAttendanceById(id) {
  try {
    const res = await axios.get(`/students/attendance/${id}`, {
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

export async function getAttendanceReport(studentId) {
  try {
    const res = await axios.get(`/attendance-report/${studentId}`, {
      withCredentials: true,
    });
    return res; // Ensure you return the data you need
  } catch (error) {
    console.error("Error fetching attendance report:", error);
    throw error; // Rethrow if you want to handle this in the component
  }
}

export async function getCenterById(centerId) {
  try {
    const res = await axios.get(`/students/centers/${centerId}`, {
      withCredentials: true,
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error(`Unexpected status code: ${res.status}`);
    }
  } catch (error) {
    console.error("Error fetching center by ID:", error);
    throw error;
  }
}

export async function getClassById(classId) {
  try {
    const res = await axios.get(`/students/classes/${classId}`, {
      withCredentials: true,
    });

    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error(`Unexpected status code: ${res.status}`);
    }
  } catch (error) {
    console.error("Error fetching center by ID:", error);
    throw error;
  }
}
