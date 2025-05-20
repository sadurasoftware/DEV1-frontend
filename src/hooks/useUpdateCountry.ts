import { useMutation } from '@tanstack/react-query'
import { updateCountry } from '@/apis/countriesApi'

export const useUpdateCountry = () => {
    const {
        isPending:updateCountryPending, 
        data:updateCountryData, 
        error:updateCountryError, 
        mutate:mutateUpdateCountry
        } = useMutation({
            mutationFn: (country:any)=>updateCountry(country),
        })
    return {
        updateCountryPending,
        updateCountryData,
        updateCountryError,
        mutateUpdateCountry

}
}
