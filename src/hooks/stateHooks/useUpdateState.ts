import { useMutation } from '@tanstack/react-query'
import { updateState } from '@/apis/statesApi'

export const useUpdateState = () => {
    const {
        isPending:updateStatePending, 
        data:updateStateData, 
        mutate:mutateUpdateState
        } = useMutation({
            mutationFn: updateState,
        })
    return {
        updateStatePending,
        updateStateData,
        mutateUpdateState

}
}
