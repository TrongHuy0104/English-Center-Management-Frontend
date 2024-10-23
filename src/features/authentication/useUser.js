import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

function useUser() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    refetchOnWindowFocus: false,
  });

  const user = data?.data?.data?.data;
  console.log("User", user);
  return { isLoading, user, error };
}

export default useUser;
