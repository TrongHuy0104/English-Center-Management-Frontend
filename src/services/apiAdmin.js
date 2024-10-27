import axios from "../utils/axios";
import { PAGE_SIZE } from "../utils/constants";
export async function getAdmins({ filter, page }) {
    try {
        let route = `/admins?page=${page}&limit=${PAGE_SIZE}`;
        if (filter)
            route = `/admins?${filter.field}=${filter.value}&page=${page}&limit=${PAGE_SIZE}`;
        const res = await axios.get(`${route}`, {
            withCredentials: true,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}

export async function createAdmin(data) {
    const res = await axios.post("/admins", data, {
        withCredentials: true,
    });
    return res;
}

export async function updateAdmin(data, id) {
    const res = await axios.patch(`/admins/${id}`, data, {
        withCredentials: true,
    });
    return res;
}

export async function disableAdmin(id) {
    const res = await axios.patch(`/admins/${id}/disable`, true, {
        withCredentials: true,
    });
    return res;
}

export async function enableAdmin(id) {
    const res = await axios.patch(`/admins/${id}/enable`, true, {
        withCredentials: true,
    });
    return res;
}
