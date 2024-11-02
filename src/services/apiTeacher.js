import axios from "../utils/axios";
export async function getAllTeachers() {
  try {
    const res = await axios.get("/teachers", { withCredentials: true });

    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getTeacher(id) {
  try {
    const res = await axios.get(`/teachers/${id}`, { withCredentials: true });
    console.log("res1", res);

    return res;
  } catch (error) {
    console.error("Get Salary by ID error:", error);
  }
}
