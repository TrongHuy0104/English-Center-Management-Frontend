import axios from "../utils/axios";
import { PAGE_SIZE } from "../utils/constants";
export async function getClasses({ page }) {
    try {
        let route = `/classes?page=${page}&limit=${PAGE_SIZE}`;
        const res = await axios.get(`${route}`, {
            withCredentials: true,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}

export async function createClass(data) {
    const res = await axios.post("/classes", data, {
        withCredentials: true,
    });
    return res;
}

export async function updateClass(data, id) {
    const res = await axios.patch(`/classes/${id}`, data, {
        withCredentials: true,
    });
    return res;
}
