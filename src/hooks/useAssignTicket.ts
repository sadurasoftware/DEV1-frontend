import { useMutation } from "@tanstack/react-query";
import { assignTicket } from "@/apis/ticketAPI";
import axios from "axios";

export const useAssignTicket = () =>{
    const {mutate, isPending, isError, isSuccess, error, data} = useMutation({
        mutationFn: ({ id, assignedTo }: { id: string; assignedTo: number }) => assignTicket(id, assignedTo),
        onSuccess: data => {
            console.log('Ticket assigned successfully:', data)
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