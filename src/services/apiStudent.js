import axios from "../utils/axios";
import { PAGE_SIZE } from "../utils/constants";

export async function getStudents({ filter, page }) {
    try {
        let route = `/students?page=${page}&limit=${PAGE_SIZE}`;
        if (filter)
            route = `/students?${filter.field}=${filter.value}&page=${page}&limit=${PAGE_SIZE}`;
        const res = await axios.get(`${route}`, {
            withCredentials: true,
        });
  
        return res;
    } catch (error) {
        console.log(error);
    }
}

export async function createStudent(data) {
    const res = await axios.post("/students", data, {
        withCredentials: true,
    });
    return res;
}

export async function updateStudent(data, id) {
    const res = await axios.patch(`/students/${id}`, data, {
        withCredentials: true,
    });
    return res;
}

export async function disableStudent(id) {
    const res = await axios.patch(`/students/${id}/disable`, true, {
        withCredentials: true,
    });
    return res;
}

export async function enableStudent(id) {
    const res = await axios.patch(`/students/${id}/enable`, true, {
        withCredentials: true,
    });
    return res;
}

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