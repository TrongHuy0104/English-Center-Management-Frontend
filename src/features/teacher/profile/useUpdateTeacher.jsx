import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast"; // Đảm bảo bạn đã cài đặt react-hot-toast
import { updateTeacherById } from "../../../services/apiTeacher"; // Import hàm cập nhật giáo viên

function useUpdateTeacher(teacherId) {
    const queryClient = useQueryClient();
    
    const { mutate: updateTeacher, isLoading: isUpdating } = useMutation({
        mutationFn: (newData) => updateTeacherById(teacherId, newData), // Truyền dữ liệu mới vào hàm cập nhật
        onSuccess: () => {
            toast.success("Cập nhật thông tin giáo viên thành công");
            queryClient.invalidateQueries(["teacher", teacherId]); // Vô hiệu hóa query để lấy lại dữ liệu mới
        },
        onError: (error) => {
            toast.error("Cập nhật thông tin giáo viên thất bại");
            console.error("Error updating teacher data:", error); // Log lỗi ra console để theo dõi
        },
    });

    return { updateTeacher, isUpdating };
}

export default useUpdateTeacher;
