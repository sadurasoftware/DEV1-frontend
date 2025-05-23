import { getLocations } from "@/apis/locationApi";
import { useQuery } from "@tanstack/react-query";

export const useGetLocations = () => {
  const {isLoading:locationsLoading, data:locationsData, isError:isLocationsError, error:locationsError} = useQuery({
    queryKey: ['locations'],
    queryFn: getLocations
  })
  return {locationsLoading, locationsData, isLocationsError, locationsError}
};