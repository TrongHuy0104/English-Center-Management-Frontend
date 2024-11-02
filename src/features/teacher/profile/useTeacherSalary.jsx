import { useQuery } from "@tanstack/react-query";
import { getSalaryByTeacherId } from "../../../services/apiTeacher"; 
function useTeacherSalary(teacherId) {
    const { isLoading, data, error } = useQuery({
        queryKey: ["teachersalary", teacherId], 
        queryFn: () => getSalaryByTeacherId(teacherId), 
        refetchOnWindowFocus: false,
        
    });

    const salary = data?.data?.data;
    console.log(salary);
    return { isLoading, salary, error };
}

export default useTeacherSalary;
