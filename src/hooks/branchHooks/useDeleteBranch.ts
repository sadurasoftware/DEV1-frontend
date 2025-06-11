import { deleteBranch } from "@/apis/branchApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteBranch = () =>{
    const {isPending:deletePending, mutate:deleteBranchMutate} = useMutation({
        mutationFn: deleteBranch,
    })
    return {
        deletePending,
        deleteBranchMutate
    }
}