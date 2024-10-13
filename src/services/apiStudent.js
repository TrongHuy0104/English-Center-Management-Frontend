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
