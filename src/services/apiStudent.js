import axios from "../utils/axios";

export async function login(data) {
  try {
    const res = await axios({
      method: "POST",
      url: `/students/login`,
      data: data,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getStudentById(studentId) {
  try {
    const res = await axios.get(`/students/${studentId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log("Error get student by id", error);
  }
}

export async function updateStudent(studentId, studentData) {
  try {
    const res = await axios.put(`/students/${studentId}`, studentData, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.log("Error updating student:", error);
    throw error;
  }
}

// export async function uploadAvatar(avatarFile, studentId) {
//   const formData = new FormData();
//   formData.append("avatar", avatarFile); // Đảm bảo tên này khớp với multer

//   try {
//     const response = await axios.post(
//       `/students/${studentId}/avatar`, // Đường dẫn API
//       formData,
//       {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     console.log("Avatar updated successfully", response.data);
//     if (response.data && response.data.avatarUrl) {
//       console.log("Avatar updated successfully", response.data.avatarUrl);
//     } else {
//       console.error(
//         "Failed to update profile: Avatar URL not found in response."
//       );
//     }
//   } catch (error) {
//     console.error(
//       "Error updating avatar",
//       error.response ? error.response.data : error.message
//     );
//   }
// }

export async function uploadAvatar(id, avatarURL) {
  try {
    const res = await axios.put(
      `/students/upload/${id}`,
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

export async function getAttendanceById(id) {
  try {
    const res = await axios.get(`/students/attendance/${id}`, {
      withCredentials: true,
    });
    if (!res || !res.data) {
      return null;
    }
    return res.data;
  } catch (error) {
    console.log("Error get student by id", error);
  }
}

export async function getAttendanceReport(studentId) {
  try {
    const res = await axios.get(`/attendance-report/${studentId}`, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.error("Error fetching attendance report:", error);
    throw error;
  }
}

export async function getCenterById(centerId) {
  try {
    const res = await axios.get(`/students/centers/${centerId}`, {
      withCredentials: true,
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error(`Unexpected status code: ${res.status}`);
    }
  } catch (error) {
    console.error("Error fetching center by ID:", error);
    throw error;
  }
}

export async function getClassById(classId) {
  try {
    const res = await axios.get(`/students/classes/${classId}`, {
      withCredentials: true,
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error(`Unexpected status code: ${res.status}`);
    }
  } catch (error) {
    console.error("Error fetching center by ID:", error);
    throw error;
  }
}

export async function getTeacherById(idTeacher) {
  try {
    const res = await axios.get(`/teachers/${idTeacher}`, {
      withCredentials: true,
    });

    return res.data.data;
  } catch (error) {
    console.error("Error fetching teacher by ID:", error);
    throw error;
  }
}
