import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { requestEnrollment } from "../../../services/apiStudent";

export default function useRequestEnroll() {
    const { isLoading: isLoadingEnroll, mutate: enroll } = useMutation({
        mutationFn: (classId) => requestEnrollment(classId),
        onSuccess: () => {
            toast.success("Enrollment request sent successfully!");
            console.log(classId);
            
        },
        onError: (err) => {
            const errorData = err?.response?.data;

            if (errorData?.message) {
                toast.error(errorData.message);
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        },
    });

    return { isLoadingEnroll, enroll };
}

