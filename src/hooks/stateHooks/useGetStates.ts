import { getStates } from "@/apis/statesApi"
import { useQuery } from "@tanstack/react-query"

export const useGetStates = () => {
   const {isLoading:statesLoading, data:statesData, isError:isStatesError, error:statesError} = useQuery({
      queryKey: ['states'],
      queryFn: () => getStates(),
   })

   return{
    statesLoading,
    statesData,
    isStatesError,
    statesError
   }
}