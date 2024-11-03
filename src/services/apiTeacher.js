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

//Update data of a teacher by teacherId
export async function updateTeacherById(idTeacher, newData) {
    try {
        const res = await axios.put(`/teachers/${idTeacher}`, newData, {
            withCredentials: true,
        });
        return res;
    } catch (error) {
        console.error("Error updating teacher profile:", error);
        throw error;
    }
}
//Get schedule of a teacher by teacherId
export async function getTeacherSchedule(teacherId) {
    try {
        const res = await axios.get(`/teachers/${teacherId}/schedule`, {
            withCredentials: true,
        });
        return res;
    } catch (error) {
        console.error("Error fetching teacher schedule:", error);
        throw error;
    }
}

//Get salary of a teacher by teacherId
export async function getSalaryByTeacherId(teacherId) {
    try {
        const res = await axios.get(`/teachers/${teacherId}/salary`, {
            withCredentials: true,
        });
        return res;
    } catch (error) {
        console.error("Error fetching teacher salary:", error);
        throw error;
    }
}

//Get center of a teacher by teacherId
export async function getCenterByTeacherId(teacherId) {
    try {
        const res = await axios.get(`/teachers/${teacherId}/centers`, {
            withCredentials: true,
        });
        return res;
    } catch (error) {
        console.error("Error fetching teacher center:", error);
        throw error;
    }
}

// //Teacher take attendance
export async function takeAttendance(teacherId, attendanceList = []) {
    try {
        const res = await axios.patch(
            `/teachers/${teacherId}/attendance`,
            { attendanceList },
            { withCredentials: true }
        );
        return res;
    } catch (error) {
        console.error("Error taking attendance:", error);
        throw error;
    }
}

// em test cái getAttendanceData
export async function getAttendanceData(teacherId, slot) {
    const res = await axios.get(`/teachers/${teacherId}/attendance/${slot}`, {
        withCredentials: true,
    });
    return res;
}
// Teacher get classes by teacherId
export async function getClassesByTeacherId(teacherId) {
    try {
        const res = await axios.get(`teachers/${teacherId}/classes`, {
            withCredentials: true,
        });
        return res;
    } catch (error) {
        console.error("Error fetching classes by teacher ID:", error);
        throw error;
    }
}

export async function uploadAvatar(id, avatarURL) {
    try {
        const res = await axios.put(
            `/teachers/upload/${id}`,
            { avatar: avatarURL },
            {
                withCredentials: true,
            }
        );
        if (!res || !res.data) {
            return null;
        }
        return res.data;
    } catch (error) {
        console.log({ message: error.message });
    }
}
