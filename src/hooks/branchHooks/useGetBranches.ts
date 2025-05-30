import { getBranches } from "@/apis/branchApi"
import { useQuery } from "@tanstack/react-query"

export const useGetBranches = () => {
   const {isLoading:branchesLoading, data:branchesData, isError:isBranchesError, error:branchesError} = useQuery({
      queryKey: ['branches'],
      queryFn: () => getBranches(),
   })

   return{
    branchesLoading,
    branchesData,
    isBranchesError,
    branchesError
   }
}