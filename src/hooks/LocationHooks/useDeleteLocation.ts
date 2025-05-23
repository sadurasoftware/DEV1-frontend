import { deleteLocation } from "@/apis/locationApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteLocation = () =>{
    const {isPending:deletePending, mutate:deleteLocationMutate} = useMutation({
        mutationFn: deleteLocation,
    })
    return {
        deletePending,
        deleteLocationMutate
    }
}