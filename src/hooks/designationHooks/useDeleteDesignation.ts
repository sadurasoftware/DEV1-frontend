import { deleteDesignation } from "@/apis/designationApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteDesignation = () =>{
    const {isPending:deletePending, mutate:deleteDesignationMutate} = useMutation({
        mutationFn: deleteDesignation,
    })
    return {
        deletePending,
        deleteDesignationMutate
    }
}