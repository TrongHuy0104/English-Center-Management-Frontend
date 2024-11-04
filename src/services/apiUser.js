import axios from "../utils/axios";

export async function createNewUser(formData) {
    const res = await axios.post("/users", formData, { withCredentials: true });
    return res;
}
