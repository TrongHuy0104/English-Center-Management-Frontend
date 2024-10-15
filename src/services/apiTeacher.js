import axios from "../utils/axios";
//Get data of a teacher by teacherId
    export async function getTeacherById(idTeacher) {
    try {

        const res = await axios.get(`/teachers/${idTeacher}`, { withCredentials: true });
        console.log('Teacher data:', res.data.data.data);
        return res;
               
        ; 
    } catch (error) {
        console.error('Error fetching teacher by ID:', error);
        throw error; 
    }
//Update data of a teacher by teacherId
}export async function updateTeacherById(idTeacher, newData) {
    try {
        const res = await axios.put(`/teachers/${idTeacher}`, newData, { withCredentials: true });
        return res; 
    } catch (error) {
        console.error('Error updating teacher profile:', error);
        throw error;
    }
}
//Get schedule of a teacher by teacherId
export async function getTeacherSchedule(teacherId) {
    try {
        console.log(teacherId);
        
        const res = await axios.get(`/teachers/${teacherId}/schedule`, { withCredentials: true });
        console.log(res);
        return res;
        
        
        
    } catch (error) {
        console.error('Error fetching teacher schedule:', error);
        throw error;
    }
}
//Get salary of a teacher by teacherId
export async function getSalaryByTeacherId(teacherId) {
    try {
        const res = await axios.get(`/teachers/${teacherId}/salary`, { withCredentials: true });
        return res;
    } catch (error) {
        console.error('Error fetching teacher salary:', error);
        throw error;
    }
}
//Get center of a teacher by teacherId
export async function getCenterByTeacherId(teacherId) {
    try {
        const res = await axios.get(`/teachers/${teacherId}/center`, { withCredentials: true });
        console.log('Teacher center:', res.data.data.data);
        return res;
    } catch (error) {
        console.error('Error fetching teacher center:', error);
        throw error;
    }
}