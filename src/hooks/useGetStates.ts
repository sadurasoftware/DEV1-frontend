import { getStates } from "@/apis/statesApi"
import { useQuery } from "@tanstack/react-query"

export const useGetStates = () => {
   const {isLoading, data, isError, error} = useQuery({
      queryKey: ['states'],
      queryFn: () => getStates(),
   })

   return{
    isLoading,
    data,
    isError,
    error
   }
}