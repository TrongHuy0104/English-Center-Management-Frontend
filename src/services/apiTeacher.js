import axios from "../utils/axios";

export async function getAllTeachers() {
    try {
        const res = await axios.get("/teachers", { withCredentials: true });

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
