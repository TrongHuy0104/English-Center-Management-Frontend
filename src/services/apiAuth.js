import axios from "../utils/axios";

export async function login(data) {
  try {
    const res = await axios({
      method: "POST",
      url: `/users/login`,
      data: data,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
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
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFee(id) {
  try {
    const res = await axios.delete(`/fees/${id}`, { withCredentials: true });
    console.log("delete complete");

    return res;
  } catch (error) {
    console.error("Delete error:", error);
  }
}

export async function updateFee(id, updatedData) {
  try {
    const res = await axios.patch(`/fees/${id}`, updatedData, {
      withCredentials: true,
    });
    console.log("dsadas: ", res);

    return res;
  } catch (error) {
    console.error("Update error:", error.response || error.message);
    throw error; // Ném lỗi để có thể xử lý lỗi tại nơi gọi hàm này
  }
}

export async function getFee(id) {
  try {
    const res = await axios.get(`/fees/${id}`, { withCredentials: true });
    console.log("get Fee: ", res);

    return res;
  } catch (error) {
    console.error("Get Fee by ID error:", error);
  }
}
