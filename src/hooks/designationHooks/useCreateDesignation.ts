import { createDesignation } from "@/apis/designationApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateDesignation = () => {
    const { isPending, mutate:createDesignationMutation } = useMutation({
        mutationFn: createDesignation,
})
return {
        isPending,
        createDesignationMutation,
    }
}