import { useState } from "react";
import { updateStudent as updateStudentApi } from "../../services/apiStudent";

const useUpdateStudent = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateStudent = async (studentId, studentData) => {
    setIsUpdating(true);
    try {
      const updatedStudent = await updateStudentApi(studentId, studentData);
      return updatedStudent;
    } catch (error) {
      console.error("Failed to update student:", error);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateStudent, isUpdating };
};

export default useUpdateStudent;
