import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link, useParams } from 'react-router-dom'
import { useFetchCommentById } from '@/hooks/usefetchCommentById'
import { useState, useEffect } from 'react'
import { useEditComment } from '@/hooks/useEditComment'
import axios from 'axios'
import { commentValidation } from '@/validation/commentValidation'
import { z } from 'zod'
import ReactPlayer from 'react-player'
import { useRef } from 'react'
import { AttachmentModal } from '@/components/AttachmentModal'

export const EditComment = () => {
  const { ticketId, commentId } = useParams()
  const [success, setSuccess] = useState('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    commentLoading,
    commentData,
    isCommentError,
    commentError,
  } = useFetchCommentById(commentId)

  const {
    mutate,
    updateCommentData
  } = useEditComment()

  const [comment, setComment] = useState<any>({
    id: '',
    ticketId: '',
    commentText: '',
  })

  const [errorMsg, setErrorMsg] = useState('')

  const [zodErrorMsg, setZodErrorMsg] = useState('')

  const [existingAttachments, setExistingAttachments] = useState<string[]>([])
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [newPreviews, setNewPreviews] = useState<string[]>([])

  useEffect(() => {
    if (commentData?.comment) {
      setComment({
        id: commentData.comment.id,
        ticketId: commentData.comment.ticketId,
        commentText: commentData.comment.commentText,
      })

      const urls = commentData.comment.attachments?.map((att: { url: string }) => att.url) || []
      setExistingAttachments(urls)
    }
  }, [commentData])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setComment((prev: any) => ({
      ...prev,
      [name]: value,
    }))
    setErrorMsg('')
    setZodErrorMsg('')
  }

  const handleImageClick = () => {
    if (commentData?.comment?.attachments?.length) {
      const urls = commentData.comment.attachments.map((att: { url: any; }) => att.url)
      setExistingAttachments(urls)
      setIsModalOpen(true)
      setSuccess('')
      setErrorMsg('')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const selectedFiles = Array.from(files)
      setNewFiles(selectedFiles)

      const previews = selectedFiles.map((file) => URL.createObjectURL(file))
      setNewPreviews(previews)
    }
    setErrorMsg('')

  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (!commentId || !ticketId) {
        console.error("Missing ticket or comment ID")
        return
      }
      commentValidation.parse({ commentText: comment.commentText })
      const formData = new FormData()
      formData.append('commentText', comment.commentText)
      newFiles.forEach((file) => formData.append('attachments', file))

      mutate(
        { ticketId, commentId, formData },
        {
          onSuccess: () => {
            setErrorMsg('')
            setZodErrorMsg('')
            setNewPreviews([])
            setSuccess(updateCommentData?.message || 'Comment updated successfully...')
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
            setNewFiles([])
          },
          onError: (error: any) => {
            if (axios.isAxiosError(error)) {
              setSuccess('');
              setZodErrorMsg('')
              setErrorMsg(error.response?.data?.message || error.response?.data?.errors || 'An unexpected error occurred')
            } else {
              setErrorMsg('Something went wrong. Please try again.')
            }
          }
        }
      );
    }
    catch (err) {
      console.log("Caught error:", err);
      if (err instanceof z.ZodError) {
        setSuccess('');
        setErrorMsg('')
        setZodErrorMsg(err.errors[0]?.message || 'Invalid input');
      } else {
        setZodErrorMsg('An unknown error occurred');
      }
    }

  }

  if (commentLoading) {
    return <h4 className="text-center text-gray-500 mt-10">Loading....</h4>
  }

  if (isCommentError) {
    return <p className="text-red-500 text-center mt-10">{commentError?.message}</p>
  }

    const closeModal = () => {
    setIsModalOpen(false)
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-center text-indigo-600">Edit Comment</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          {zodErrorMsg && (
            <p className='text-error-red text-left mt-4'>{zodErrorMsg}</p>
          )}
        </div>

        <div className="mb-4">
          <Label>Existing Attachments</Label>
          {existingAttachments?.length > 0 ? (
            <div className="flex gap-2 flex-wrap">
             
                  <>
                      <button
                      type="button"
                        onClick={handleImageClick}
                        className="text-blue-500"
                      >
                        Click here to view attachments
                      </button>
                      {isModalOpen && <AttachmentModal urls={existingAttachments} onClose={closeModal} />}
                    </>
                


              
            </div>
          ) : (
            <p className="text-sm text-gray-500">No attachments available.</p>
          )}
        </div>

        <div>
          <Label htmlFor="attachments" className="text-xs font-medium text-gray-700">
            Upload New Attachments
          </Label>
          <input
            type="file"
            id="attachments"
            name="attachments"
            onChange={handleFileChange}
            multiple
            ref={fileInputRef}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {newPreviews.length > 0 && (
            <div className="mt-2 flex gap-2 flex-wrap">
              {newPreviews.map((src, idx) => {
                const isVideo = /\.(mp4|webm|ogg|mp4)$/i.test(src);
                return(
                  <div key={idx}>
                    {isVideo ? (
                      <ReactPlayer
                        url={src}
                        controls
                        width="100%"
                        height="auto"
                      />
                    ) : (
                      <img
                        key={idx}
                        src={src}
                        alt={`preview-${idx}`}
                        className="w-24 h-24 object-cover rounded"
                      />
                    )}
                  </div>
                )
              }
                
              )}
            </div>
          )}
        </div>




        {/* {isCommentUpdateError && updateCommentError && (
          <p className='text-error-red text-center mt-4'>
            {(updateCommentError instanceof AxiosError ? updateCommentError?.response?.data.message : 'An unexpected error occurred') || 'An unexpected error occurred'}
          </p>
        )}

        {isCommentError && commentError && (
          <p className='text-error-red text-center mt-4'>
            {(commentError instanceof AxiosError ? commentError.message : 'An unexpected error occurred') || 'An unexpected error occurred'}
          </p>
        )}

        {updateCommentSuccess && (
          <h2 className="text-center text-green-600 font-semibold">{success}</h2>
        )} */}

        {success && (
          <h2 className="text-center text-green-600 font-semibold">{success}</h2>)
        }

        {errorMsg && (
          <p className='text-error-red text-left mt-4'>{errorMsg}</p>
        )}



        <div className="pt-4 text-left">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Submit
          </button>
          <Link
            to={`/view-ticket/${comment.ticketId}`}
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition mx-3"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  )
}
