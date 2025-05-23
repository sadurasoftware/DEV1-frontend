import { deleteCountry } from "@/apis/countriesApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCountry = () =>{
    const {isPending:deletePending, mutate:deleteCountryMutate} = useMutation({
        mutationFn: deleteCountry,
    })
    return {
        deletePending,
        deleteCountryMutate
    }
}