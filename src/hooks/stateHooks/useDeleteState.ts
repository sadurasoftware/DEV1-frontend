import { deleteState } from "@/apis/statesApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteState = () =>{
    const {isPending:deletePending, mutate:deleteStateMutate} = useMutation({
        mutationFn: deleteState,
    })
    return {
        deletePending,
        deleteStateMutate
    }
}