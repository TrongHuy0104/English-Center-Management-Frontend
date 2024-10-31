import { useQuery } from "@tanstack/react-query";
import { getClassById } from "../../../services/apiStudent";

export default function useClassById(classId) {
    const { isLoading, data, error } = useQuery({
        queryKey: ["class", classId], // Sử dụng classId làm key để lấy lớp học cụ thể
        queryFn: () => getClassById(classId), // Truyền classId vào hàm gọi API
        enabled: !!classId, // Chỉ chạy khi classId có giá trị
        refetchOnWindowFocus: false,
    });

    const classDetail = data?.data?.class;
    
    return { isLoading, classDetail, error };
}
