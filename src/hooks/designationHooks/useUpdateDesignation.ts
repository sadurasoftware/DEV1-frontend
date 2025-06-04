import { useMutation } from '@tanstack/react-query'
import { updateDesignation } from '@/apis/designationApi'

export const useUpdateDesignation = () => {
    const {
        isPending:updateDesignationPending, 
        data:updateDesignationData, 
        mutate:mutateUpdateDesignation
        } = useMutation({
            mutationFn: updateDesignation,
        })
    return {
        updateDesignationPending,
        updateDesignationData,
        mutateUpdateDesignation

}
}
