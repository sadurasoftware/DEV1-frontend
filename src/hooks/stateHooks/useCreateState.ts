import { createState } from "@/apis/statesApi";
import { useMutation } from "@tanstack/react-query";
export const useCreateState = () => {
    const { isPending:createStatePending, mutate:createStateMutation } = useMutation({
        mutationFn: createState,
})
return {
        createStatePending,
        createStateMutation,
    }
}