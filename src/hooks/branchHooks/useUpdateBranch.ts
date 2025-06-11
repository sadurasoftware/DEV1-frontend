import { updateBranch } from '@/apis/branchApi'
import { useMutation } from '@tanstack/react-query'

export const useUpdateBranch = () => {
    const {
        isPending:updateBranchPending, 
        mutate:mutateUpdateBranch
        } = useMutation({
            mutationFn: updateBranch,
        })
    return {
        updateBranchPending,
        mutateUpdateBranch
}
}
