import axios from "../utils/axios";

export async function getStudentDetails(studentId) {
    try {
        const response = await axios.get(`/students/${studentId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching student details:', error);
        throw error;
    }
}