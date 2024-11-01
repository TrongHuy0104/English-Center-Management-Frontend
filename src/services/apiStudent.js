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

export async function updateStudent(id, data) {
  const res = await axios.patch(`/students/${id}`, data, {
    withCredentials: true,
  });
  return res.data;
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

export async function uploadAvatar(id, avatarURL) {
  try {
    const res = await axios.put(
      `/students/upload/${id}`,
      { avatar: avatarURL },
      {
        withCredentials: true,
      }
    );
    if (!res || !res.data) {
      return null;
    }
    return res.data;
  } catch (error) {
    console.log({ message: error.message });
  }
}
