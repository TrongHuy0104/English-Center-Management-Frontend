import axios from "../utils/axios";
export async function getAllClasses() {
  try {
    const res = await axios.get("/classes", { withCredentials: true });
    return res;
  } catch (error) {
    console.log(error);
  }
}
