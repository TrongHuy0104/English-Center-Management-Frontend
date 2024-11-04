import { useState, useEffect } from "react";

const useStudent = (user) => {
  const [customFormData, setCustomFormData] = useState({
    name: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
  });

  const formatDateToInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (user?.roleDetails) {
      setCustomFormData({
        name: user.roleDetails.name || "",
        phone: user.roleDetails.phone || "",
        gender: user.roleDetails.gender || "",
        avatar: user.roleDetails.avatar || "",
        dateOfBirth: user.roleDetails.dateOfBirth
          ? formatDateToInput(user.roleDetails.dateOfBirth)
          : "",
      });
    }
  }, [user]);

  return {
    formData: customFormData,
    setFormData: setCustomFormData,
  };
};

export default useStudent;
