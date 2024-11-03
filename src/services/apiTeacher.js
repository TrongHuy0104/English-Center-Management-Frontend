import axios from "../utils/axios";

export async function getAllTeachers() {
    try {
        const res = await axios.get("/teachers", { withCredentials: true });

        return res;
    } catch (error) {
        console.log(error);
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
export async function takeAttendance(
    teacherId,
    date,
    slot,
    attendanceList = []
) {
    try {
        const res = await axios.put(
            `/teachers/${teacherId}/attendance/${date}/${slot}`,
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
export async function getAttendanceData(teacherId, date, slot) {
    try {
        const res = await axios.get(
            `/teachers/${teacherId}/attendance/${date}/${slot}`,
            { withCredentials: true }
        );
        return res;
    } catch (error) {
        console.error("Error fetching attendance data:", error);
        throw error;
    }
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
