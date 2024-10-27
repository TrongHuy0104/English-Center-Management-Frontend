import axios from "../utils/axios";

export async function getAllFeeOfStudent() {
  try {
    const res = await axios.get("/student/fees", {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getScheduleOfStudent() {
  try {
    const res = await axios.get("/student/my-class", {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllClass() {
  try {
    const res = await axios.get("/student/classes", {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getClassById(classId) {
  try {
    const res = await axios.get(`student/classes/${classId}`, {
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
      "/student/classes/enroll-request",
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