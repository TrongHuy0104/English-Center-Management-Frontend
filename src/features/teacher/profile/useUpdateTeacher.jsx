import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateTeacherById } from "../../../services/apiTeacher"; 

function useUpdateTeacher(teacherId) {
    const queryClient = useQueryClient();
    
    const { mutate: updateTeacher, isLoading: isUpdating } = useMutation({
        mutationFn: (newData) => updateTeacherById(teacherId, newData), 
        onSuccess: () => {
            toast.success("Teacher information updated successfully");
            queryClient.invalidateQueries(["teacher", teacherId]); 
        },
        onError: (error) => {
            toast.error("Failed to update teacher information");
            console.error("Error updating teacher data:", error); 
        },
    });

    return { updateTeacher, isUpdating };
}

export default useUpdateTeacher;
