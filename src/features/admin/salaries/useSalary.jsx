import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getAllSalaries,
    CreateSalary,
    updateSalary,
} from "../../../services/apiSalary.js";
import { useSearchParams } from "react-router-dom";
// import { getTeacherShifts } from "../../../services/apiAttendance.js";

function useSalary() {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

    // PAGING
    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    // Lấy danh sách phí
    const { isLoading, data, error } = useQuery({
        queryKey: ["salaries", page],
        queryFn: () => getAllSalaries({ page }),
        refetchOnWindowFocus: false,
    });

    // Hàm tạo mới phí
    const createSalaryMutation = useMutation({
        mutationFn: CreateSalary,
        onSuccess: () => {
            queryClient.invalidateQueries(["salaries"]);
        },
    });

    // Hàm cập nhật phí
    const updateSalaryMutation = useMutation({
        mutationFn: (updatedSalaryData) =>
            updateSalary(updatedSalaryData.id, updatedSalaryData),
        onSuccess: () => {
            queryClient.invalidateQueries(["salaries"]);
        },
    });

    // Lấy danh sách phí từ dữ liệu trả về
    const salaries = data?.data;

    return {
        isLoading,
        salaries,
        error,
        createSalary: createSalaryMutation.mutate, // Gọi hàm tạo mới
        updateSalary: updateSalaryMutation.mutate, // Gọi hàm cập nhật
    };
}

export default useSalary;
