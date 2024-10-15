import { useQuery } from "@tanstack/react-query";
import { getCenterByTeacherId } from "../../services/apiTeacher"; // Adjust the import according to your file structure

function useTeacherCenter(teacherId) {
    const { isLoading, data, error } = useQuery({
        queryKey: ["teachercenter", teacherId], 
        queryFn: () => getCenterByTeacherId(teacherId), 
        refetchOnWindowFocus: false,
    });

    const center = data?.data?.data; 
    return { isLoading, center, error };
}

export default useTeacherCenter;
