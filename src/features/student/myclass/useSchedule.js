import { useQuery } from "@tanstack/react-query";
import { getScheduleOfStudent } from "../../../services/apiStudent";

function useSchedule() {
    const { isLoading, data, error } = useQuery({
        queryKey: ["classes"],
        queryFn: getScheduleOfStudent,
        refetchOnWindowFocus: false,
    });
   
    const schedules = data?.data?.data?.classes;
    
    return { isLoading, schedules, error };
}


export default useSchedule;
