import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFetchTicketById } from '@/hooks/useFetchTicketById';
import { Label } from '@radix-ui/react-label';
import { useState } from 'react';
import { useCreateComment } from '@/hooks/useCreateComment';
// import { useUpdateTicketStatus } from '@/hooks/useUpdateTicketStatus';
import { useFetchCommentsByTicketId } from '@/hooks/useFetchCommentsByTicketId';
import { useDeleteComment } from '@/hooks/useDeleteComment';
import { viewBackStore } from '@/store/viewBackStore';

export const ViewTicket = () => {
  const { id } = useParams<{ id?: string }>()
  const [commentData, setCommentData] = useState<{
    ticketId: string;
    commentText: string;
    attachment: File | null;
  }>({
    ticketId: '',
    commentText: '',
    attachment: null,
  });


  const navigate = useNavigate()
  const { backRoutes } = viewBackStore();
  const { ticketData } = useFetchTicketById(id || '')
  const { createCommentMutation } = useCreateComment()
  // const { mutate } = useUpdateTicketStatus()
  const { commentsLoading, commentsData } = useFetchCommentsByTicketId(id || '')
  const { commentDelete, isCommentError, commentError, deleteSuccess } = useDeleteComment()

  const [imageURL, setImageURL] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setCommentData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    if (!id) return
    setIsSubmitting(true)

    try {

      const formData = new FormData();
      formData.append('commentText', commentData.commentText)
   

      if (commentData.attachment) {
        formData.append('attachment', commentData.attachment)
      }


      await createCommentMutation({ ticketId: id, data: formData })




      setCommentData(
        {
          ticketId: '',
          commentText: '',
          attachment: null,
        }
      )
      console.log('Ticket status updated and comment submitted successfully.')
    } catch (err) {
      console.error('Something went wrong:', err)
    } finally {
      setIsSubmitting(false)
    }
  };

  const handleImageClick = () => {
    if (ticketData?.ticket?.attachment) {
      setImageURL(ticketData.ticket.attachment)
      setIsModalOpen(true)
    }
  };

  const handleCommentImageClick = (attachmentUrl: string) => {
    if (attachmentUrl) {
      setImageURL(attachmentUrl)
      setIsModalOpen(true)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      setCommentData((prevData) => ({
        ...prevData,
        attachment: files[0],
      }));
    }
  };

  const handleEdit = (commentId: string) => {
    navigate(`/comments/${id}/${commentId}`)
  }

  const handleDelete = (id: any) => {
    commentDelete(id)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setImageURL('')
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6">
      <div className="max-w mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-6">
          Ticket Details
        </h1>

        <div>
          <table className="min-w-full table-auto border-t">
            <tbody className="border-t">
              <tr className="border-t px-4 py-2 text-left text-gray-600 bg-gray-100">
                <th className="px-4 py-2">Title</th>
                <td className="px-4 py-2">{ticketData?.ticket?.title}</td>
                <th className="px-4 py-2">Creation Date</th>
                <td className="px-4 py-2">{ticketData?.ticket?.createdAt}</td>
              </tr>
              <tr className="border-t px-4 py-2 text-left">
                <th className="px-4 py-2">Email</th>
                <td className="px-4 py-2">{ticketData?.ticket?.user.email}</td>
                <th className="px-4 py-2">Ticket Category</th>
                <td className="px-4 py-2">{ticketData?.ticket?.category.name}</td>
              </tr>
              <tr className="border-t px-4 py-2 text-left text-gray-600 bg-gray-100">
                <th className="px-4 py-2">Priority</th>
                <td className="px-4 py-2">{ticketData?.ticket?.priority}</td>
                <th className="px-4 py-2">Ticket status</th>
                <td className="px-4 py-2">{ticketData?.ticket?.status}</td>
              </tr>
              <tr className="border-t px-4 py-2 text-left">
                <th className="px-4 py-2">Description</th>
                <td className="px-4 py-2" colSpan={3}>
                  {ticketData?.ticket?.description}
                </td>
              </tr>
              <tr className="border-t px-4 py-2 text-left text-gray-600 bg-gray-100">
                <th className="px-4 py-2">Attachment</th>
                <td className="px-4 py-2" colSpan={3}>
                  <button
                    onClick={handleImageClick}
                    className="text-blue-500 hover:underline"
                  >
                    Click here to view attachment
                  </button>
                  {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                      <div className="bg-white p-4 rounded-lg max-w-lg relative">
                        <button
                          onClick={closeModal}
                          className="absolute top-2 right-2 text-black font-bold text-lg"
                        >
                          X
                        </button>
                        <img
                          src={imageURL}
                          alt="Ticket Attachment"
                          className="max-w-full max-h-screen object-contain"
                        />
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table className="min-w-full table-auto border-t mt-5">
            <thead>
              <tr>
                <td colSpan={5} className="px-4 py-2 text-gray-800 bg-gray-300">Ticket History</td>
              </tr>

            </thead>
            <tbody className='border-t'>
              <tr className='border-t px-4 py-2 text-left text-gray-600 bg-gray-100'>
                <th className="px-4 py-2">Ticket Updated Details</th>
                {/* <th className="px-4 py-2">Status</th> */}
                <th className="px-4 py-2">Updated By</th>
                <th className="px-4 py-2">Attachment</th>
                {/* <th className="px-4 py-2">Date</th> */}
                <th className="px-4 py-2">Edit</th>
                <th className="px-4 py-2">Delete</th>
              </tr>

              {!commentsLoading && commentsData?.comments?.length > 0 &&
                commentsData.comments.map((comment: any) => (
                  <tr key={comment.id} className='border-t px-4 py-2 text-left text-gray-500 bg-gray-50'>
                    <td className="px-4 py-2">{comment.commentText}</td>
                    {/* <td className="px-4 py-2">{ticketData.ticket.status}</td> */}
                    <td className="px-4 py-2">{comment.commenter?.firstname} {comment.commenter?.lastname}</td>
                    <td className="px-4 py-2">
                      {comment.attachment ? (
                        <button
                          onClick={() => handleCommentImageClick(comment.attachment)}
                          className="text-blue-500 hover:underline"
                        >
                          View
                        </button>
                      ) : (
                        'No Attachment'
                      )}
                    </td>
                    {/* <td className="px-4 py-2">{new Date(comment.updatedAt).toLocaleString()}</td> */}
                    <td className='px-4 py-2'>
                      <button
                        className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200'
                        onClick={() => handleEdit(comment.id)}
                      >Edit
                      </button></td>
                    <td className='px-4 py-2'>
                      <button
                        className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200'
                        onClick={() => handleDelete(comment.id)}
                      >Delete
                      </button></td>
                  </tr>

                ))
              }


            </tbody>
          </table>
        </div>
        <div>
          {deleteSuccess && <h4>Comment deleted Successfully..!</h4>}

        </div>
        <div className="mt-4">
          <table className="min-w-full table-auto border-t">
            <tbody className="border-t">
              <tr className="border-t px-4 py-2 text-left text-gray-600 bg-gray-100">
                <th className="px-4 py-2">Ticket Comments</th>
                <td className="px-4 py-2">
                  <div>
                    <Label htmlFor="description" className="text-xs font-medium">
                      Comments
                    </Label>
                    <textarea
                      id="commentText"
                      name="commentText"
                      onChange={handleChange}
                      value={commentData.commentText}
                      rows={4}
                      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </td>
              </tr>
              <tr className="border-t px-4 py-2 text-left">
                <th className="px-4 py-2">Attachment</th>
                <td className="px-4 py-2">
                  <div>
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
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {isCommentError && <h4 className='text-center'>{commentError}</h4>}
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 mt-4 rounded hover:bg-green-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>


        <Link
          to={backRoutes}
          className="bg-blue-500 text-white mx-3 px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Back
        </Link>

      </div>
    </div>
  );
};
