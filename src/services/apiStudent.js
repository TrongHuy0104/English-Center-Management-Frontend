import axios from "../utils/axios";

export async function getAllFeeOfStudent({ page, limit , status }) {
  try {
    const res = await axios.get(`/students/fees`, {
      params: {status, page, limit },
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getScheduleOfStudent() {
  try {
    const res = await axios.get("/students/my-class", {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllClass() {
  try {
    const res = await axios.get("/students/classes", {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getClassById(classId) {
  try {
    const res = await axios.get(`students/classes/${classId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function sendEnrollRequest(classId) {
  try {
    const res = await axios.post(
      "/students/classes/enroll-request",
      { classId }, // Gửi ID của lớp vào request body
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.error("Failed to send enroll request:", error);
    throw error;
  }
}