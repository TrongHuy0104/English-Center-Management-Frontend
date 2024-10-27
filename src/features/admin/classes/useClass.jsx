import { useQuery } from "@tanstack/react-query";
import { getAllClasses } from "../../../services/apiClass";

function useClass() {
  // Lấy danh sách phí với phân trang (page và limit)
  const { isLoading, data, error } = useQuery({
    queryKey: ["classes"], // Thêm page và limit vào queryKey
    queryFn: () => getAllClasses(),
    refetchOnWindowFocus: false,
  });

  // Lấy danh sách phí từ dữ liệu trả về
  const classes = data?.data;
  console.log("classes", classes);

  return {
    isLoading,
    classes,
    error,
  };
}

export default useClass;
