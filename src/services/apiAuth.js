import axios from "../utils/axios";

export async function login(data) {
  const res = await axios({
    method: "POST",
    url: `/users/login`,
    data: data,
  });
  return res;
}

export async function register(data) {
  const res = await axios({
    method: "POST",
    url: `/users/signup`,
    data: data,
  });
  return res;
}

export async function getCurrentUser() {
  try {
    const res = await axios.get("/users/me", { withCredentials: true });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllFees() {
  try {
    const res = await axios.get("/fees", { withCredentials: true });
    return res.data.data.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getStudentById(userId) {
  try {
    const res = await axios.get(`/users/${userId}`, {
      withCredentials: true,
    });

    // Kiểm tra xem API có trả về đúng định dạng không
    if (res.data && res.data.status === "success") {
      const student = res.data.data;
      return {
        name: student.name, // Nếu bạn có trường `name` thực sự, hãy thay thế `student.email` bằng `student.name`
        email: student.email,
      };
    } else {
      console.error(
        "API response format is incorrect or status is not success:",
        res.data
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching student data:", error);
    return null;
  }
}
