import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useParams } from 'react-router-dom';
import { useFetchCommentById } from '@/hooks/usefetchCommentById';
import { useState, useEffect } from 'react';

export const EditComment = () => {

    const { commentId } = useParams()

    const { commentLoading, commentData, isCommentError, commentError } = useFetchCommentById(commentId);
    useEffect(() => {
        if (commentData?.comments) {
            setComment({
                ticketId: commentData.comments.ticketId,
                commentText: commentData.comments.commentText,
                attachement: commentData.comments.attachment
            });
        }
    }, [commentData]); 

    const [comment, setComment] = useState<any>({
            ticketId: '',
            commentText: '',
            attachement:'',
        });

      
        if(commentLoading)
        {
            <h4>Loading....</h4>
        }
        if(isCommentError)
        {
            <p>{commentError?.message}</p>
        }

        const handleChange = (
            e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
        ) => {
            const { name, value } = e.target;
            setComment((prevData: any) => ({
                ...prevData,
                [name]: value,
            }));
        };


        // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //     const files = e.target.files
        //     if (files && files[0]) {
        //       setComment((prevData:any) => ({
        //         ...prevData,
        //         attachment: files[0],
        //       }));
        //     }
        //   };

    return (
        <>
            <div>
                <h1>Comment Details</h1>
                {!commentLoading && commentData && 
                    <div>
                    
                    <div>
                        <Label htmlFor="ticketName" className="text-xs font-medium">
                            Ticket id
                        </Label>
                        <Input
                            type="text"
                            id="ticketId"
                            name="ticketId"
                            value={comment.ticketId}
                            onChange={handleChange}
                            required
                        />
                        <div>
                            <Label htmlFor="commentText" className="text-xs font-medium">
                                Comments
                            </Label>
                            <textarea
                                id="commentText"
                                name="commentText"
                                onChange={handleChange}
                                value={comment.commentText}
                                rows={4}
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        {/* <div>
                    <Label htmlFor="attachments" className="text-xs font-medium">
                      Attachments
                    </Label>
                    <input
                      type="file"
                      id="attachment"
                      name="attachment"
                      onChange={handleFileChange}
                      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div> */}
                    </div>
                </div>
                }
                
            </div>
        </>
    )
}