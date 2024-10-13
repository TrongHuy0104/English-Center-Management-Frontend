import { useQuery } from "@tanstack/react-query";
import { getStudentById } from "../../services/apiStudent";

function useStudent(studentId) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["student"],
    queryFn: () => getStudentById(studentId),
    refetchOnWindowFocus: false,
  });

  const student = data?.data?.data?.student;

  return { isLoading, student, error };
}

export default useStudent;
