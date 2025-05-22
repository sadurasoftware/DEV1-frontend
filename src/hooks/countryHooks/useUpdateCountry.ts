import { useMutation } from '@tanstack/react-query'
import { updateCountry } from '@/apis/countriesApi'

export const useUpdateCountry = () => {
    const {
        isPending:updateCountryPending, 
        data:updateCountryData, 
        mutate:mutateUpdateCountry
        } = useMutation({
            mutationFn: updateCountry,
        })
    return {
        updateCountryPending,
        updateCountryData,
        mutateUpdateCountry

}
}
