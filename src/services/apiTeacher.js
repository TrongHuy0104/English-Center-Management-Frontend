import axios from "../utils/axios";
import { PAGE_SIZE } from "../utils/constants";
export async function getAllTeachers({ filter, page }) {
    try {
        let route = `/teachers?page=${page}&limit=${PAGE_SIZE}`;
        if (filter)
            route = `/teachers?${filter.field}=${filter.value}&page=${page}&limit=${PAGE_SIZE}`;
        const res = await axios.get(`${route}`, {
            withCredentials: true,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}

export async function getTeacher(id) {
    try {
        const res = await axios.get(`/teachers/${id}`, {
            withCredentials: true,
        });

        return res;
    } catch (error) {
        console.error("Get Salary by ID error:", error);
    }
}

export async function createTeacher(data) {
    const res = await axios.post("/teachers", data, {
        withCredentials: true,
    });
    return res;
}

export async function updateTeacher(data, id) {
    const res = await axios.patch(`/teachers/${id}`, data, {
        withCredentials: true,
    });
    return res;
}

export async function disableTeacher(id) {
    const res = await axios.patch(`/teachers/${id}/disable`, true, {
        withCredentials: true,
    });
    return res;
}

export async function enableTeacher(id) {
    const res = await axios.patch(`/teachers/${id}/enable`, true, {
        withCredentials: true,
    });
    return res;
}

export async function getClassTeachers() {
    try {
        const res = await axios.get("/teachers/all", { withCredentials: true });

        return res;
    } catch (error) {
        console.log(error);
    }
}
