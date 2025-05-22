import { getStateById } from "@/apis/statesApi";
import { useQuery } from "@tanstack/react-query";

export const useGetStateById = (id: number) => {
  const {data:stateData, isLoading:stateLoading, isError:IsStateError, error:stateError} = useQuery({
    queryKey: ["state", id],
    queryFn: () => getStateById(id),
    enabled: !!id
  })
  return {
    stateData,
    stateLoading,
    IsStateError,
    stateError
}}