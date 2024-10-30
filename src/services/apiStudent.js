import axios from "../utils/axios";

export async function getStudentDetails(studentId) {
    try {
        const response = await axios.get(`/students/${studentId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching student details:", error);
        throw error;
    }
}
export async function getAllFeeOfStudent() {
    try {
        const res = await axios.get("/student/fees", {
            withCredentials: true,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}

export async function getScheduleOfStudent() {
    try {
        const res = await axios.get("/student/my-class", {
            withCredentials: true,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}
