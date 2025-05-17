import { updateTicketStatus } from "@/apis/ticketAPI";
import { useMutation } from "@tanstack/react-query";

export const useUpdateTicketStatus = () => {
  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: ({ id, status }:{id:string, status:string}) => updateTicketStatus(id, status),
  });

  return { mutate, isPending, isError, isSuccess, error, data };
};
