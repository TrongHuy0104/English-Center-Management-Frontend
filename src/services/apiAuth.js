import axios from "../utils/axios";

export async function login(data) {
  try {
    const res = await axios({
      method: "POST",
      url: `/users/login`,
      data: data,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser() {
  try {
    const res = await axios.get("/users/me", { withCredentials: true });
    return res;
  } catch (error) {
    console.log(error);
  }
}
