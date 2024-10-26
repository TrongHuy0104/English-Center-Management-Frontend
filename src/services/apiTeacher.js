import axios from "../utils/axios";

export async function login(data) {
  try {
    const res = await axios({
      method: "POST",
      url: `/teachers/login`,
      data: data,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}
//Get data of a teacher by teacherId
    export async function getTeacherById(idTeacher) {
    try {
        
        const res = await axios.get(`/teachers/${idTeacher}`, { withCredentials: true });

        return res;
        
        
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
        const res = await axios.get(`/teachers/${teacherId}/schedule`, { withCredentials: true });
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
        const res = await axios.get(`/teachers/${teacherId}/centers`, { withCredentials: true });
        return res;
    } catch (error) {
        console.error('Error fetching teacher center:', error);
        throw error;
    }
}
// //Teacher take attendance
// export async function takeAttendance(classId, date, slot, attendanceList) {
//     try {
//         const res = await axios.post(
//             `/attendance/classes/${classId}/${date}/${slot}`,
//             { attendanceList },
//             { withCredentials: true }
//         );
//         console.log('Attendance data:', res.data);
//         return res.data; // Trả về dữ liệu từ server
//     } catch (error) {
//         console.error('Error taking attendance:', error);
//         throw error; // Ném lỗi để xử lý ở nơi khác
//     }
// }
// //Teacher get attendance data
// export async function getAttendanceData(classId, date, slot) {
//     try {
//         const res = await axios.get(
//             `/attendance/classes/${classId}/${date}/${slot}`,
//             { withCredentials: true }
//         );
//         return res.data; 
//     } catch (error) {
//         console.error('Error fetching attendance data:', error);
//         throw error; 
//     }
// }