import { useQuery } from "@tanstack/react-query";
import { getAllClasses } from "../../../services/apiClass";

function useClass() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["classes"],
    queryFn: () => getAllClasses(),
    refetchOnWindowFocus: false,
  });

  const classes = data;

  return {
    isLoading,
    classes,
    error,
  };
}

export default useClass;
