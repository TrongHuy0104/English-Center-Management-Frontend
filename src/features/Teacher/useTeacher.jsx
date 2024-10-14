import { useQuery } from "@tanstack/react-query";
import {getTeacherById } from "../../services/apiTeacher";

function useTeacher(teacherId) {
    const { isLoading, data, error } = useQuery({
        queryKey: ["teacher", teacherId], 
        queryFn: () => getTeacherById(teacherId), 
        refetchOnWindowFocus: false,
    });

    const teacher = data?.data?.data?.data;
  

    return { isLoading, teacher, error };
}

export default useTeacher;
