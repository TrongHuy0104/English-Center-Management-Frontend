import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { removeSchedule as removeScheduleApi } from "../../../services/apiClass";
import { useParams } from "react-router-dom";

function useRemoveSchedule() {
    const queryClient = useQueryClient();
    const { classId } = useParams();
    const { isPending: isLoadingDelete, mutate: removeSchedule } = useMutation({
        mutationFn: ({ postSchedule }) =>
            removeScheduleApi(postSchedule, classId),
        onSuccess: () => {
            toast.success("Delete successfully!");
            queryClient.invalidateQueries({
                queryKey: ["class", classId],
            });
        },
        onError: (err) => {
            toast.error(err.response.data.message);
        },
    });

    return { isLoadingDelete, removeSchedule };
}

export default useRemoveSchedule;
