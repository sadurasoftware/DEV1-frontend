import { useMutation } from '@tanstack/react-query'
import { updateLocation } from '@/apis/locationApi'
export const useUpdateLocation = () => {
    const {
        isPending:updateLocationPending, 
        mutate:mutateUpdateLocation
        } = useMutation({
            mutationFn: updateLocation,
        })
    return {
        updateLocationPending,
        mutateUpdateLocation
}
}
