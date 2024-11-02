import { useQuery } from "@tanstack/react-query";
import { getTeacher } from "../../../services/apiTeacher";

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
        const result = await getTeacher(id);
        return result;
      });
      const teacherData = await Promise.all(teacherPromises);
      return teacherData;
    },
    enabled: !!teacherIds && teacherIds.length > 0,
    refetchOnWindowFocus: false,
  });
  return { teachers: teacherData || [], isLoading, error };
};

export default useTeacher;
