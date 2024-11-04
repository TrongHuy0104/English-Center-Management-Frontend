import axios from "../utils/axios";

export async function getDashboard() {
    const res = await axios.get("/dashboard", {
        withCredentials: true,
    });
    return res;
}
