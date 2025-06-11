import { createBranch } from "@/apis/branchApi";
import { useMutation } from "@tanstack/react-query";
export const useCreateBranch = () => {
    const { isPending:createBranchPending, mutate:createBranchMutation } = useMutation({
        mutationFn: createBranch,
})
return {
        createBranchPending,
        createBranchMutation,
    }
}