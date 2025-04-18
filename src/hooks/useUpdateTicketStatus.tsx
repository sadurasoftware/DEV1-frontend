import { updateTicketStatus } from "@/apis/ticketAPI";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useUpdateTicketStatus = () => {
    const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
        mutationFn: ({ id, status }: { id:string, status:string }) => updateTicketStatus(id, status),
        onSuccess: data => {
            console.log('Status updated successfully:', data)
        },
        onError: (error: any) => {
            if (axios.isAxiosError(error)) {
                console.error(
                    error.response?.data.message || 'An unexpected error occurred'
                )
            } else {
                console.error('An unexpected error occurred.')
            }
        },
    })
    return { mutate, isPending, isError, isSuccess, error, data }
}