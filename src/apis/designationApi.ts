import api from "@/lib/api"
import { useLoginInfoStore } from "@/store/useLoginInfoStore"

export const getDesignation = async () => {
    const token = useLoginInfoStore.getState().token
    const response = await api.get('api/designation/get', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    )
    return response.data
}

export const createDesignation = async (name:any) => {
    const token = useLoginInfoStore.getState().token
    const response = await api.post('/api/designation/create', 
       name,
    {
        headers: {
        Authorization: `Bearer ${token}`,
        },
  })
  return response.data
}

export const updateDesignation = async ({id, name}:{id:number, name:string}) => {
    const token = useLoginInfoStore.getState().token
    const response = await api.put(`/api/designation/update/${id}`, 
        {name}, 
    {
        headers: {
        Authorization: `Bearer ${token}`,
        },
  })
  return response.data
}

export const deleteDesignation = async(id:any) => {
    const token = useLoginInfoStore.getState().token
    const response = await api.delete(`/api/designation/delete/${id}`,
        {
            headers:{
            Authorization: `Bearer ${token}`,
           }
        }
    )
    return response.data
}