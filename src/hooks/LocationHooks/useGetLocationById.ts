import { getLocationById } from "@/apis/locationApi";
import { useQuery } from "@tanstack/react-query";

export const useGetLocationById = (id: number) => {
  const {data:locationDatum, isLoading:locationLoading, isError:IsLocationError, error:locationError} = useQuery({
    queryKey: ["location", id],
    queryFn: () => getLocationById(id),
    enabled: !!id
  })
  return {
    locationDatum,
    locationLoading,
    IsLocationError,
    locationError
}}