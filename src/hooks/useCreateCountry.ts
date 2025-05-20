import { createCountry } from "@/apis/countriesApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateCountry = () => {
    const { isPending, mutate:createCountryMutation } = useMutation({
        mutationFn: (country:any) => createCountry(country),
})
return {
        isPending,
        createCountryMutation,
    }
}