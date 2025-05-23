import api from "@/lib/api"
import { useLoginInfoStore } from "@/store/useLoginInfoStore"

export const getLocations = async () => {
    const token = useLoginInfoStore.getState().token
    const responsre = await api.get('api/location/get', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    )
    return responsre.data
}

export const createLocation = async ({name, stateId}:{name:string, stateId:number}) => {
    const token = useLoginInfoStore.getState().token
    const response = await api.post('api/location/create', {
        name,
        stateId,
    },
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    )
    return response.data
}

export const getLocationByState = async(stateId:number)=>{
    const token = useLoginInfoStore.getState().token
    const response = await api.get(`/api/location/by-state?stateId=${stateId}`,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
  })
  return response.data
}

export const getLocationById = async(id:number)=>{
    const token = useLoginInfoStore.getState().token
    const response = await api.get(`/api/location/get/${id}`,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
  })
  return response.data.location
}

export const updateLocation = async ({id, name, stateId}:{id:number, name:string, stateId:number}) => {
    const token = useLoginInfoStore.getState().token
    const response = await api.put(`/api/location/update/${id}`, 
        {
            name,
            stateId
        }, 
    {
        headers: {
        Authorization: `Bearer ${token}`,
        },
  })
  return response.data
}

export const deleteLocation = async(id:any) => {
    const token = useLoginInfoStore.getState().token
    const response = await api.delete(`/api/location/delete/${id}`,
        {
            headers:{
            Authorization: `Bearer ${token}`,
           }
        }
    )
    return response.data
}