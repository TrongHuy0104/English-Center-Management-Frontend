import axios from "../utils/axios";
import { PAGE_SIZE } from "../utils/constants";
export async function getAllSalaries({ page }) {
    try {
        const res = await axios.get(
            `/salaries?page=${page}&limit=${PAGE_SIZE}`,
            {
                withCredentials: true,
            }
        );
        return res;
    } catch (error) {
        console.log(error);
    }
}

export async function getSalary(id) {
    try {
        const res = await axios.get(`/salaries/${id}`, {
            withCredentials: true,
        });

        return res;
    } catch (error) {
        console.error("Get Salary by ID error:", error);
    }
}

export async function CreateSalary(formData) {
    try {
        const res = await axios.post("/salaries", formData, {
            withCredentials: true,
        });
        return res;
    } catch (error) {
        if (error.response) {
            // Server trả về response với status code khác 2xx
            console.error(
                "Server responded with an error:",
                error.response.data
            );
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

export async function deleteSalary(id) {
    try {
        const res = await axios.patch(
            `/salaries/${id}`,

            { active: false },
            {
                withCredentials: true,
            }
        );

        return res;
    } catch (error) {
        console.error("Delete error:", error);
    }
}

export async function updateSalary(id, updatedData) {
    try {
        const res = await axios.patch(`/salaries/${id}`, updatedData, {
            withCredentials: true,
        });

        return res;
    } catch (error) {
        console.error("Update error:", error.response || error.message);
        throw error; // Ném lỗi để có thể xử lý lỗi tại nơi gọi hàm này
    }
}
