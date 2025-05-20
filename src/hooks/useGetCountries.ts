import { getCountries } from "@/apis/countriesApi";
import { useQuery } from "@tanstack/react-query";

export const useGetCountries = () => {
    const { isLoading, data, isError, error } = useQuery({
        queryKey: ['countries'],
        queryFn: getCountries,
    })

    return {
        isLoading,
        data,
        isError, 
        error
    }
}