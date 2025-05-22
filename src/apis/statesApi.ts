import api from "@/lib/api"
import { useLoginInfoStore } from "@/store/useLoginInfoStore"

export const getStates = async () => {
    const token = useLoginInfoStore.getState().token
    const responsre = await api.get('api/state/get', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    )
    return responsre.data
}

export const createState = async ({name, countryId}:{name:string, countryId:number}) => {
    const token = useLoginInfoStore.getState().token
    const response = await api.post('api/state/create', {
        name,
        countryId,
    },
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    )
    return response.data
}

export const getStateById = async(id:number)=>{
    const token = useLoginInfoStore.getState().token
    const response = await api.get(`/api/state/get/${id}`,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
  })
  return response.data.state
}

export const updateState = async ({id, name, countryId}:{id:number, name:string, countryId:number}) => {
    const token = useLoginInfoStore.getState().token
    const response = await api.put(`/api/state/update/${id}`, 
        {
            name,
            countryId
        }, 
    {
        headers: {
        Authorization: `Bearer ${token}`,
        },
  })
  return response.data
}

export const deleteState = async(id:any) => {
    const token = useLoginInfoStore.getState().token
    const response = await api.delete(`/api/state/delete/${id}`,
        {
            headers:{
            Authorization: `Bearer ${token}`,
           }
        }
    )
    return response.data
}