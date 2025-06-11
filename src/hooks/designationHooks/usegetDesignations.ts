import { getDesignation } from "@/apis/designationApi"
import { useQuery } from "@tanstack/react-query"

export const useGetDesignations = () => {
   const {isLoading:designationsLoading, data:designationsData, isError:isDesignationsError, error:designationsError} = useQuery({
      queryKey: ['designations'],
      queryFn: () => getDesignation(),
   })

   return{
    designationsLoading,
    designationsData,
    isDesignationsError,
    designationsError
   }
}