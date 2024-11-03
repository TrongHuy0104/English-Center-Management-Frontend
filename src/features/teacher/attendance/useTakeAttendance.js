import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { takeAttendance as takeAttendanceApi } from "../../../services/apiTeacher";

function useTakeAttendance() {
    const queryClient = useQueryClient();
    const { isPending: isLoadingUpdate, mutate: takeAttendance } = useMutation({
        mutationFn: ({ id, attendanceList }) =>
            takeAttendanceApi(id, attendanceList),
        onSuccess: () => {
            toast.success("Submit successfully!");
            queryClient.invalidateQueries({
                queryKey: ["attendances"],
            });
        },
        onError: (err) => {
            toast.error(err.response.data.message);
        },
    });

    return { isLoadingUpdate, takeAttendance };
}

export default useTakeAttendance;
