import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFetchTicketById } from '@/hooks/useFetchTicketById';
import { Label } from '@radix-ui/react-label';
import { useState } from 'react';
import { useCreateComment } from '@/hooks/useCreateComment';
// import { useUpdateTicketStatus } from '@/hooks/useUpdateTicketStatus';
import { useFetchCommentsByTicketId } from '@/hooks/useFetchCommentsByTicketId';
import { useDeleteComment } from '@/hooks/useDeleteComment';
import { viewBackStore } from '@/store/viewBackStore';
import axios, { AxiosError } from 'axios';
import { useGetTicketHistory } from '@/hooks/useGetTicketHistory';
import { commentValidation } from '@/validation/commentValidation';
import { z } from 'zod';
import { useLoginInfoStore } from '@/store/useLoginInfoStore';

import { useRef } from 'react';
import { AttachmentModal } from '@/components/AttachmentModal';

export const ViewTicket = () => {
  const { id } = useParams<{ id?: string }>()
  const [commentTextError, setCommentTextError] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [commentData, setCommentData] = useState<{
    ticketId: string,
    commentText: string,
    attachments: File[]
  }>({
    ticketId: '',
    commentText: '',
    attachments: [],
  });

  const { user } = useLoginInfoStore();
  const navigate = useNavigate()
  const { backRoutes } = viewBackStore();
  const { ticketData } = useFetchTicketById(id || '')
  const { createCommentMutation, isError, error, data } = useCreateComment()
  const [successMsg, setSuccessMsg] = useState('')
  const [errMsg, setErrMsg] = useState('')

  // const { mutate } = useUpdateTicketStatus()
  const { commentsLoading, commentsData } = useFetchCommentsByTicketId(id || '')
  // console.log('Comments data:', commentsData?.comments?.attachments?.length)
  const { commentDelete } = useDeleteComment()
  const { historyLoading, historyData, isHistoryError, historyError } = useGetTicketHistory(id || '')

  const [imageURLs, setImageURLs] = useState<string[]>([])
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
    setErrMsg('')
    setSuccessMsg('')

  }



  const handleSubmit = async () => {
    if (!id) return
    setIsSubmitting(true)

    try {

      commentValidation.parse({ commentText: commentData.commentText })
      setCommentTextError('')
      setCommentData({
        ticketId: '',
        commentText: '',
        attachments: [],
      })
      const formData = new FormData();
      formData.append('commentText', commentData.commentText)
      if (commentData.attachments && commentData.attachments.length > 0) {
        commentData.attachments.forEach(file => {
          formData.append('attachments', file)
        })
      }
      await createCommentMutation({ ticketId: id, data: formData },
        {
          onSuccess: () => {
            setErrMsg('')
            setCommentData({
              ticketId: '',
              commentText: '',
              attachments: [],
            })
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
            console.log('Response data', data)
            setSuccessMsg(data?.message)
          },
          onError: (error: any) => {
            if (axios.isAxiosError(error)) {
              setSuccessMsg('')
              setErrMsg(error?.response?.data?.message || error?.response?.data?.errors || 'An error occurred')
            }

          }
        }
      )
      setCommentData(
        {
          ticketId: '',
          commentText: '',
          attachments: [],
        }
      )
    } catch (err) {
      if (err instanceof z.ZodError) {
        setCommentTextError(err.errors[0]?.message || 'Invalid input')
      }
    } finally {
      setIsSubmitting(false)
    }
  };

  const handleImageClick = () => {
    if (ticketData?.ticket?.attachments?.length) {
      const urls = ticketData.ticket.attachments.map((att: { url: any; }) => att.url)
      setImageURLs(urls)
      setIsModalOpen(true)
    }
  }

  const handleCommentImageClick = (attachments: { url: string }[]) => {
    if (attachments?.length) {
      const urls = attachments.map(att => att.url)
      setImageURLs(urls)
      setIsModalOpen(true)
    }
  }


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setCommentData(prevData => ({
        ...prevData,
        attachments: Array.from(files),
      }))
    }
  }


  const handleEdit = (commentId: string) => {
    navigate(`/comments/${id}/${commentId}`)
  }

  const handleDelete = (id: any) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Comment?");
    if (!confirmDelete) return;
    commentDelete(id, {
      onSuccess: (response: any) => {
        setErrMsg('')
        setSuccessMsg(response?.message || 'An unexpected error error.')
      },
      onError: (error: any) => {
        if (axios.isAxiosError(error)) {
          setSuccessMsg('')
          setErrMsg(error.response?.data?.message || error.response?.data?.errors || 'An unexpected error occured.')
        }
      }
    })
  }

  const closeModal = () => {
    setIsModalOpen(false)
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6">
      {/* Ticket Details Display */}
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
                <td className="px-4 py-2">{ticketData?.ticket?.category?.name || 'N/A'}</td>
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
                <td className="px-4 py-2">
                  {ticketData?.ticket?.attachments?.length > 0 ? (
                    <>
                      <button
                        onClick={handleImageClick}
                        className="text-blue-500"
                      >
                        Click here to view attachment
                      </button>
                      {isModalOpen && <AttachmentModal urls={imageURLs} onClose={closeModal} />}
                    </>
                  ) : (
                    "No Attachments"
                  )}
                </td>
                <th className="px-4 py-2">Assigned to:</th>
                <td className="px-4 py-2">{(ticketData?.ticket?.assignedUser?.firstname) ? ticketData?.ticket?.assignedUser?.firstname : "Unassigned"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* If comments available show comments table */}

        <div>
          {!commentsLoading && commentsData?.comments?.length > 0 ? (
            <table className="min-w-full table-auto border-t mt-5">
              <thead>
                <tr>
                  <td colSpan={5} className="px-4 py-2 text-gray-800 bg-gray-300">Comments</td>
                </tr>
                <tr className='border-t px-4 py-2 text-left text-gray-600 bg-gray-100'>
                  <th className="px-4 py-2">Ticket Updated Details</th>
                  <th className="px-4 py-2">Updated By</th>
                  <th className="px-4 py-2">Attachment</th>
                  <th className="px-4 py-2">Edit</th>
                  <th className="px-4 py-2">Delete</th>
                </tr>
              </thead>
              <tbody className="border-t">
                {commentsData.comments.map((comment: any) => (
                  <tr key={comment.id} className='border-t px-4 py-2 text-left text-gray-500 bg-gray-50'>
                    <td className="px-4 py-2">{comment.commentText}</td>
                    <td className="px-4 py-2">{comment.commenter?.firstname} {comment.commenter?.lastname}</td>
                    <td className="px-4 py-2">
                      <tr className="border-t px-4 py-2 text-left text-gray-600 bg-gray-100">

                        <td className="px-4 py-2" >


                          {comment?.attachments?.length > 0 ?
                            (<>
                              <button
                                onClick={() => handleCommentImageClick(comment.attachments || [])}

                                className="text-blue-500 hover:underline"
                              >
                                Click here to view attachment
                              </button>

                              {isModalOpen && <AttachmentModal urls={imageURLs} onClose={closeModal} />}
                            </>) : ('No attachments')}


                        </td>
                      </tr>
                    </td>
                    {(comment?.commenter?.id === user?.id) ? (
                      <>
                        <td className='px-4 py-2'>
                          <button
                            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200'
                            onClick={() => handleEdit(comment.id)}
                          >
                            Edit
                          </button>
                        </td>
                        <td className='px-4 py-2'>
                          <button
                            className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200'
                            onClick={() => handleDelete(comment.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </>

                    ) : (
                      <td className='text-blue-500' colSpan={2}>You can not edit or delete this comment</td>
                    )}


                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </div>

        <div>


        </div>

        {/* Ticket comments Post */}
        {(
          user?.department === 'Support team department' ||
          user?.id === ticketData?.ticket?.user?.id ||
          user?.id === ticketData?.ticket?.assignedUser?.id
        ) &&
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
                    {commentTextError && <h3 className='text-error-red'>{commentTextError}</h3>}
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
                        multiple
                        ref={fileInputRef}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            {successMsg && <h3 className='text-green font-bold'>{successMsg}</h3>}
            {errMsg && <h3 className='text-red font-bold'>{errMsg}</h3>}
          </div>
        }
        {isError && (
          <h3 className="text-red font-bold">
            {Array.isArray(error?.response?.data?.errors)
              ? error.response.data.errors[0]
              : error?.response?.data?.message || 'An unexpected error occurred'}
          </h3>
        )}

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
      <div>
        {!historyLoading && historyData?.history?.length > 0 ? (
          <>
            <table className="min-w-full table-auto border-t mt-5">
              <thead>
                <tr>
                  <td colSpan={5} className="px-4 py-2 text-gray-800 bg-gray-300">
                    Ticket History
                  </td>
                </tr>
              </thead>
              <tbody className="border-t">
                <tr className="border-t px-4 py-2 text-left text-gray-600 bg-gray-100">
                  <th className="px-4 py-2">Ticket Updated Details</th>
                  <th className="px-4 py-2">Updated By</th>
                  <th className="px-4 py-2">Old Content</th>
                  <th className="px-4 py-2">Updated Content</th>
                  <th className="px-4 py-2">Updated at</th>
                </tr>
                {historyData.history.map((his: any) => (
                  <tr key={his.id} className="border-t px-4 py-2 text-left text-gray-500 bg-gray-50">
                    <td className="px-4 py-2">{his.action}</td>
                    <td className="px-4 py-2">{his.changedBy}</td>
                    <td className="px-4 py-2">
                      {typeof his.oldValue === 'object'
                        ? JSON.stringify(his.oldValue)
                        : his.oldValue}
                    </td>
                    <td className="px-4 py-2">
                      {typeof his.newValue === 'object'
                        ? JSON.stringify(his.newValue)
                        : his.newValue}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(his.changedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : null}

        {isHistoryError && (
          <h3>
            {historyError instanceof AxiosError
              ? historyError.response?.data.message
              : 'An unexpected error occurred'}
          </h3>
        )}
      </div>



    </div>
  );
};
