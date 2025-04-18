import { fetchCommentById } from "@/apis/commentsApi";
import { useQuery } from "@tanstack/react-query";

export const useFetchCommentById = (commentId:any) => {
    const { isLoading:commentLoading, data:commentData, isError:isCommentError, error:commentError } = useQuery(
        {
          queryKey: ['comment', commentId],
          queryFn: ()=>fetchCommentById(commentId),
          enabled: !!commentId,
        }
      )
     
      return { commentLoading, commentData, isCommentError, commentError }
}