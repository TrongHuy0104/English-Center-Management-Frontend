import { useQuery } from "@tanstack/react-query";
import { getTeacherById } from "../../services/apiStudent";

export const useTeacher = (teacherIds) => {
  const {
    data: teacherData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["teacher", teacherIds],
    queryFn: async () => {
      if (!teacherIds || teacherIds.length === 0) return [];
      const teacherPromises = teacherIds.map(async (id) => {
        const result = await getTeacherById(id);
        console.log(`Data for class ID ${id}:`, result);
        return result;
      });
      const teacherData = await Promise.all(teacherPromises);
      return teacherData;
    },
    enabled: !!teacherIds && teacherIds.length > 0,
    refetchOnWindowFocus: false,
  });
  console.log("dataa", teacherData);
  return { teachers: teacherData || [], isLoading, error };
};

export default useTeacher;
