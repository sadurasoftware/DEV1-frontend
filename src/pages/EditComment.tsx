import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useParams } from 'react-router-dom';
import { useFetchCommentById } from '@/hooks/usefetchCommentById';
import { useState, useEffect } from 'react';
import { useEditComment } from '@/hooks/useEditComment';

export const EditComment = () => {
  const { ticketId, commentId } = useParams();
  const { commentLoading, commentData, isCommentError, commentError } = useFetchCommentById(commentId);
  const { mutate, updateCommentSuccess, isCommentUpdateError, updateCommentError } = useEditComment();
    console.log('commentId:', commentId)
  const [comment, setComment] = useState<any>({
    id: '',
    ticketId: '',
    commentText: '',
    attachment: '',
  });

  useEffect(() => {
    if (commentData?.comment) {
      setComment({
        id: commentData.comment.id,
        ticketId: commentData.comment.ticketId,
        commentText: commentData.comment.commentText,
        attachment: commentData.comment.attachment,
      });
    }
  }, [commentData]);

  if (commentLoading) return <h4 className="text-center text-gray-500 mt-10">Loading....</h4>;
  if (isCommentError) return <p className="text-red-500 text-center mt-10">{commentError?.message}</p>;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setComment((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files[0]) {
        setComment((prevData: any) => ({
          ...prevData,
          attachment: files[0],
        }))
      }
    }

  const handleSubmit = () => {
    if (!commentId) {
        console.error("Comment ID is missing.");
        return;
    }
    console.log('Submitting comment data:', comment.commentText);
    console.log('ticket id', ticketId)
    mutate({ ticketId:ticketId, commentId:commentId, commentText: comment.commentText });
};

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-center text-indigo-600">Edit Comment</h1>

      <div className="space-y-4">
        <div>
          <Label htmlFor="ticketId" className="text-xs font-medium text-gray-700">
            Ticket ID
          </Label>
          <Input
            type="text"
            id="ticketId"
            name="ticketId"
            value={comment.ticketId}
            readOnly
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="commentText" className="text-xs font-medium text-gray-700">
            Comment
          </Label>
          <textarea
            id="commentText"
            name="commentText"
            onChange={handleChange}
            value={comment.commentText}
            rows={4}
            className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        

        <div>
          <Label htmlFor="attachment" className="text-xs font-medium text-gray-700">
            Attachment
          </Label>
          {comment.attachment === null ? (<h4>No attachment</h4>) : (<img src={comment.attachment} alt="Attachment" height={400}/>)}
          <input
                type="file"
                id="attachment"
                name="attachment"
                onChange={handleFileChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
        </div>

        {isCommentUpdateError && <h3 className='text-red font-bold'>{updateCommentError}</h3>}

        {updateCommentSuccess && <h2 className='text-center'>Comment updated successfully..!</h2>}
        <div className="pt-4 text-left">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Submit
          </button>
          <Link 
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition mx-3"
                to={`/view-ticket/${comment.ticketId}`}>Back</Link>
        </div>
      </div>
    </div>
  );
};
