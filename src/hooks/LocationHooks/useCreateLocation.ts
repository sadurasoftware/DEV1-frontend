import { createLocation } from "@/apis/locationApi";
import { useMutation } from "@tanstack/react-query";
export const useCreateLocation = () => {
    const { isPending:createLocationPending, mutate:createLocationMutation } = useMutation({
        mutationFn: createLocation,
})
return {
        createLocationPending,
        createLocationMutation,
    }
}