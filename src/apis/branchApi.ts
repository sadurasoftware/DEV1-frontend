import api from "@/lib/api"
import { useLoginInfoStore } from "@/store/useLoginInfoStore"
import { branchType, updateBranchType } from "@/types/branchType"

export const getBranches = async () => {
    const token = useLoginInfoStore.getState().token
    const response = await api.get('api/branch/get', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    )
    return response.data
}

export const createBranch = async (branch: branchType) => {
    const token = useLoginInfoStore.getState().token
    const response = await api.post('api/branch/create', {
        name:branch.name,
        pincode:branch.pincode,
        locationId: branch.locationId,
        stateId:branch.stateId,
        countryId:branch.countryId,
        
    },
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    )
    return response.data
}

export const updateBranch = async (branch:updateBranchType) => {
    const token = useLoginInfoStore.getState().token
    const response = await api.put(`/api/branch/update/${branch.id}`, 
        {
            name:branch.name,
            pincode: branch.pincode,
            countryId:branch.countryId,
            stateId:branch.stateId,
            locationId:branch.locationId
        }, 
    {
        headers: {
        Authorization: `Bearer ${token}`,
        },
  })
  return response.data
}


export const deleteBranch = async(id:any) => {
    const token = useLoginInfoStore.getState().token
    const response = await api.delete(`/api/branch/delete/${id}`,
        {
            headers:{
            Authorization: `Bearer ${token}`,
           }
        }
    )
    return response.data
}