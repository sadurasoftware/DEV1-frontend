import { useMutation } from "@tanstack/react-query";
import { exportTicket } from "@/apis/ticketAPI";

export const useExportTicket = () => {
  const {mutate, isPending} = useMutation({
        mutationFn: (exportData:any)=>exportTicket(exportData),
  }) 
  return {
    mutate,
    isPending
  }
};