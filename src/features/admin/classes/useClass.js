import { useQuery } from "@tanstack/react-query";
import { getClassScheduleById } from "../../../services/apiClass";

export default function useClass(classId) {
    const { isLoading, data, error } = useQuery({
        queryKey: ["class", classId], 
        queryFn: () => getClassScheduleById(classId), 
        enabled: !!classId, 
        refetchOnWindowFocus: false,
    });
    
    const classDetail = data?.data?.data?.class;
    
    return { isLoading, classDetail, error };
}