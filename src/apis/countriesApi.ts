import api from '@/lib/api'
import { useLoginInfoStore } from '@/store/useLoginInfoStore'

export const getCountries = async () => {
    // const token = useLoginInfoStore().token
    const response = await api.get('/api/country/get', {
    headers: {
    //   Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const createCountry = async (country: any) => {
    const token = useLoginInfoStore().token
    const response = await api.post('/api/country/create', 
        {name: country.name}, 
    {
        headers: {
        Authorization: `Bearer ${token}`,
        },
  })
  return response.data
}

export const updateCountry = async (country: any) => {
    const token = useLoginInfoStore().token
    const response = await api.put(`/api/country/update/${country.id}`, 
        country, 
    {
        headers: {
        Authorization: `Bearer ${token}`,
        },
  })
  return response.data
}

export const deleteCountry = async(id:any) => {
    const token = useLoginInfoStore().token
    const response = await api.delete(`/api/country/delete/${id}`,
        {
            headers:{
            Authorization: `Bearer ${token}`,
           }
        }
    )
    return response.data
}
        
    

