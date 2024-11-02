import { useQuery } from "@tanstack/react-query";
import { getAllClass } from "../../../services/apiStudent";

export default function useClass() {
    const { isLoading, data, error } = useQuery({
        queryKey: ["classlist"],
        queryFn: getAllClass,
        refetchOnWindowFocus: false,
    });
    
    const classes = data?.data?.data?.classes;
    
    return { isLoading, classes, error };
}

