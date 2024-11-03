import axios from "../utils/axios";

export async function createNewUser(formData) {
    const res = await axios.post("/users", formData, { withCredentials: true });
    return res;
}

// Fetch user profile based on ID
export const getRoleUser = async (userId) => {
  const response = await axios.get(`/users/${userId}/getUserProfile`);
  console.log(response.data.data.data);
  
  return response.data.data.data;
};

// Update user profile based on role
export const updateUserProfile = async (userId, updatedData) => {
  const response = await axios.patch(`/users/${userId}/getUserProfile`, updatedData);
  return response.data.data;
};
