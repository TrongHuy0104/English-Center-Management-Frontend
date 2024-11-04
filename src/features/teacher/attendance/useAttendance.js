import { useQuery } from "@tanstack/react-query";
import { getAttendanceData } from "../../../services/apiTeacher";
import useUser from "../../authentication/useUser";

function useAttendance(slot) {
    const { user } = useUser();
    const { isLoading, data, error } = useQuery({
        queryKey: ["attendances"],
        queryFn: () => getAttendanceData(user?.roleDetails._id, slot),
        refetchOnWindowFocus: false,
    });

    const attendance = data?.data?.data?.data;
    console.log("error", error);

    return { isLoading, attendance, error };
}

export default useAttendance;
