import api from "@/lib/api"
import { useLoginInfoStore } from "@/store/useLoginInfoStore"

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


