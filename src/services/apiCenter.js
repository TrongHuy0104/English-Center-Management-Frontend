import axios from "../utils/axios";
export async function getAllCenters() {
    try {
        const res = await axios.get("/centers", { withCredentials: true });
        return res;
    } catch (error) {
        console.log(error);
    }
}
