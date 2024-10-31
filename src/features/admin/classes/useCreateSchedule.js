import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createSchedule as createScheduleApi } from "../../../services/apiClass";
import { useParams } from "react-router-dom";

function useCreateSchedule() {
    const queryClient = useQueryClient();
    const { classId } = useParams();
    const { isPending: isLoadingCreate, mutate: createSchedule } = useMutation({
        mutationFn: ({ data, id }) => createScheduleApi(data, id),
        onSuccess: () => {
            toast.success("Create successfully!");
            queryClient.invalidateQueries({
                queryKey: ["class", classId],
            });
        },
        onError: (err) => {
            toast.error(err.response.data.message);
        },
    });

    return { isLoadingCreate, createSchedule };
}

export default useCreateSchedule;
