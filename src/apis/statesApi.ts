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