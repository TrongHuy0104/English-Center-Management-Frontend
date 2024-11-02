import axios from "../utils/axios";
export async function getAllFees() {
    try {
        const res = await axios.get("/fees", { withCredentials: true });
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
        const res = await axios.post("/fees", formData, {
            withCredentials: true,
        });
        return res;
    } catch (error) {
        if (error.response) {
            // Server trả về response với status code khác 2xx
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
        const res = await axios.delete(`/fees/${id}`, {
            withCredentials: true,
        });

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

        return res;
    } catch (error) {
        console.error("Update error:", error.response || error.message);
        throw error; // Ném lỗi để có thể xử lý lỗi tại nơi gọi hàm này
    }
}
