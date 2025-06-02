import api from "@/lib/api"
import { useLoginInfoStore } from "@/store/useLoginInfoStore"
import { locationType, updateLocationType } from "@/types/LocationType"

export const getLocations = async () => {
    const token = useLoginInfoStore.getState().token
    const response = await api.get('api/location/get', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    )
    return response.data
}

export const createLocation = async (location: locationType) => {
    const token = useLoginInfoStore.getState().token
    const response = await api.post('api/location/create', {
        name:location.name,
        countryId:location.countryId,
        stateId:location.stateId,
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

export const updateLocation = async (location:updateLocationType) => {
    const token = useLoginInfoStore.getState().token
    const response = await api.put(`/api/location/update/${location.id}`, 
        {
            name:location.name,
            countryId:location.countryId,
            stateId:location.stateId
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