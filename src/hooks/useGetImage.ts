import { useQuery } from "@tanstack/react-query"
import { getImage } from "@/apis/getImageApi"

export const useGetImage = (ticketId:any, filename:any) => {
    const {isLoading:imageLoading, data:imageUrl, isError: isImageError, error:imageError} = useQuery<any>(
        {
            queryKey:['image', ticketId],
            queryFn: () => getImage(ticketId, filename),
            enabled:!!ticketId,
        }
    )
    return {imageLoading, imageUrl, isImageError, imageError}
}