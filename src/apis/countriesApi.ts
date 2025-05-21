import api from '@/lib/api'
import { useLoginInfoStore } from '@/store/useLoginInfoStore'

export const getCountries = async () => {
    const token = useLoginInfoStore.getState().token
    const response = await api.get('/api/country/get', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const createCountry = async (name:any) => {
    const token = useLoginInfoStore.getState().token
    const response = await api.post('/api/country/create', 
       name,
    {
        headers: {
        Authorization: `Bearer ${token}`,
        },
  })
  return response.data
}

export const updateCountry = async ({id, name}:{id:number, name:string}) => {
    const token = useLoginInfoStore.getState().token
    const response = await api.put(`/api/country/update/${id}`, 
        {name}, 
    {
        headers: {
        Authorization: `Bearer ${token}`,
        },
  })
  return response.data
}

export const deleteCountry = async(id:any) => {
    const token = useLoginInfoStore.getState().token
    const response = await api.delete(`/api/country/delete/${id}`,
        {
            headers:{
            Authorization: `Bearer ${token}`,
           }
        }
    )
    return response.data
}
        
    

