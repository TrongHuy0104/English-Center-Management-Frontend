import axios from "../utils/axios";

export async function getAllFees(page = 1, limit = 10) {
  try {
    // Gửi yêu cầu với query params `page` và `limit`
    const res = await axios.get(`/fees?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getFee(id) {
  try {
    const res = await axios.get(`/fees/${id}`, { withCredentials: true });

    return res;
  } catch (error) {
    console.error("Get Fee by ID error:", error);
  }
}

export async function CreateFee(formData) {
  try {
    const res = await axios.post("/fees", formData, { withCredentials: true });
    console.log("Response from server:", res);
    return res;
  } catch (error) {
    if (error.response) {
      // Server trả về response với status code khác 2xx
      console.error("Server responded with an error:", error.response.data);
    } else if (error.request) {
      // Yêu cầu đã được gửi nhưng không nhận được phản hồi
      console.error("No response received from server:", error.request);
    } else {
      // Một lỗi xảy ra trong quá trình thiết lập yêu cầu
      console.error("Error in setting up the request:", error.message);
    }
    throw error;
  }
}

export async function deleteFee(id) {
  try {
    const res = await axios.delete(`/fees/${id}`, { withCredentials: true });
    console.log("delete complete");
    console.log("feidđ", feeId);

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
    console.log("updated data: ", updatedData);
    console.log("feidđ", id);

    return res;
  } catch (error) {
    console.error("Update error:", error.response || error.message);
    throw error; // Ném lỗi để có thể xử lý lỗi tại nơi gọi hàm này
  }
}

// Add a new class to a fee
export async function createClassInFee(id, newClassData) {
  try {
    const res = await axios.post(`/fees/${id}`, newClassData, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.error("Error creating class in fee:", error);
    throw error;
  }
}
export async function deleteClassInFee(feeId, classId) {
  try {
    console.log("Deleting class with ID:", classId, "from fee ID:", feeId);
    const response = await axios.delete(`/fees/${feeId}/classes/${classId}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error deleting class from fee:", error);
    throw error;
  }
}
