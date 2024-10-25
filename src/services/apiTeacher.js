import axios from "../utils/axios";
export async function getAllTeachers() {
  try {
    const res = await axios.get("/teachers", { withCredentials: true });

    return res;
  } catch (error) {
    console.log(error);
  }
}
