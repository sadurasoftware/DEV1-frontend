import { deleteCountry } from "@/apis/countriesApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCountry = () =>{
    const {isPending:deletePending, mutate:deleteCountryMutate} = useMutation({
        mutationFn: (id:any)=>deleteCountry(id),
        onSuccess: () => console.log("Country deleted")
    })
    return {
        deletePending,
        deleteCountryMutate
    }
}