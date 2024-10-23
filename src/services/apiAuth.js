import axios from "../utils/axios";

export async function login(data) {

    const res = await axios({
        method: "POST",
        url: `/users/login`,
        data: data,
    });
    return res;
}

export async function register(data) {
    const res = await axios({
        method: "POST",
        url: `/users/signup`,
        data: data,
    });
    return res;

}

export async function getCurrentUser() {
  try {
    const res = await axios.get("/users/me", { withCredentials: true });
    return res;
  } catch (error) {
    console.log(error);
  }
}
