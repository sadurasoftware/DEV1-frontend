import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link, useParams } from 'react-router-dom'
import { useFetchCommentById } from '@/hooks/usefetchCommentById'
import { useState, useEffect } from 'react'
import { useEditComment } from '@/hooks/useEditComment'
import { AxiosError } from 'axios'
import { commentValidation } from '@/validation/commentValidation'
import { z } from 'zod'


export const EditComment = () => {
  const { ticketId, commentId } = useParams()
  const {
    commentLoading,
    commentData,
    isCommentError,
    commentError,
  } = useFetchCommentById(commentId)

  const {
    mutate,
    updateCommentSuccess,
    isCommentUpdateError,
    updateCommentError,
  } = useEditComment()

  const [comment, setComment] = useState<any>({
    id: '',
    ticketId: '',
    commentText: '',
  })

  const [errorMsg, setErrorMsg] = useState('')

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

      setExistingAttachments(commentData.comment.attachments.map((a: any) => a.url))
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
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const selectedFiles = Array.from(files)
      setNewFiles(selectedFiles)

      const previews = selectedFiles.map((file) => URL.createObjectURL(file))
      setNewPreviews(previews)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try
    {if (!commentId || !ticketId) {
      console.error("Missing ticket or comment ID")
      return
    }
    commentValidation.parse({ commentText: comment.commentText })
    const formData = new FormData()
    formData.append('commentText', comment.commentText)
    newFiles.forEach((file) => formData.append('attachments', file))

    mutate({
      ticketId,
      commentId,
      formData,
    })}
    catch (err) {
          if (err instanceof z.ZodError) {
            setErrorMsg(err.errors[0]?.message || 'Invalid input')
          }
        }
  }

  if (commentLoading) {
    return <h4 className="text-center text-gray-500 mt-10">Loading....</h4>
  }

  if (isCommentError) {
    return <p className="text-red-500 text-center mt-10">{commentError?.message}</p>
  }

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
          {errorMsg && errorMsg && (
          <p className='text-error-red text-left mt-4'>{errorMsg}</p>
        )}
        </div>

        <div className="mb-4">
          <Label>Existing Attachments</Label>
          {existingAttachments.length > 0 ? (
            <div className="flex gap-2 flex-wrap">
              {existingAttachments.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`attachment-${i}`}
                  className="w-32 h-32 object-cover mb-2 rounded"
                />
              ))}
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
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {newPreviews.length > 0 && (
            <div className="mt-2 flex gap-2 flex-wrap">
              {newPreviews.map((src, idx) => (
                <img key={idx} src={src} alt={`preview-${idx}`} className="w-24 h-24 object-cover rounded" />
              ))}
            </div>
          )}
        </div>

          


        {isCommentUpdateError && updateCommentError && (
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
          <h2 className="text-center text-green-600 font-semibold">Comment updated successfully!</h2>
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
