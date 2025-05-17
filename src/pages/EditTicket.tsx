import { Link, useParams } from 'react-router-dom'
import { useFetchTicketById } from '@/hooks/useFetchTicketById'
import { useFetchCategories } from '@/hooks/useFetchCategories'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useEffect } from 'react'
import { useUpdateTicket } from '@/hooks/useUpdateTicket'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { createTicketValidation } from '@/validation/createTicketValidation'
import { z } from 'zod'
import { useRef } from 'react'
import { AttachmentModal } from '@/components/AttachmentModal'

export const EditTicket = () => {
    const { id } = useParams<{ id?: string }>()
    const { ticketData } = useFetchTicketById(id || '')
    const [successMsg, setSuccessMsg] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
    const [newPreviews, setNewPreviews] = useState<string[]>([])
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [ticket, setTicket] = useState<any>({
        title: '',
        description: '',
        priority: 'Low',
        category: '',
    });

    const [existingAttachments, setExistingAttachments] = useState<string[]>([])
    const [newFiles, setNewFiles] = useState<File[]>([])

    useEffect(() => {
        if (ticketData?.ticket) {
            setTicket({
                title: ticketData.ticket.title,
                description: ticketData.ticket.description,
                priority: ticketData.ticket.priority,
                category: ticketData.ticket.category.name,
            });
            const urls = ticketData.ticket.attachments.map((a: any) => a.url)
            setExistingAttachments(urls)
        }
    }, [ticketData])
    const {
        categoriesLoading,
        categoriesData,
    } = useFetchCategories()



    const { mutate, updateTicketPending } = useUpdateTicket();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setTicket((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
        setFormErrors({})
        setErrMsg('')
        setSuccessMsg('')
    };

    const handleImageClick = () => {
        if (ticketData?.ticket?.attachments?.length) {
            const urls = ticketData.ticket.attachments.map((att: { url: any; }) => att.url)
            setExistingAttachments(urls)
            setIsModalOpen(true)
            setSuccessMsg('')
            setErrMsg('')
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

        setErrMsg('')
        setSuccessMsg('')
        setFormErrors({})
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        try {
            createTicketValidation.parse(ticket)
            if (!id) return console.error('Missing ticket ID')

            const formData = new FormData()
            formData.append('title', ticket.title)
            formData.append('description', ticket.description)
            formData.append('priority', ticket.priority)
            formData.append('category', ticket.category)

            newFiles.forEach(file => formData.append('attachments', file))

            console.log('Submitting ticket:', {
                ...ticket,
                attachments: newFiles.map(file => file.name),
            })

            mutate(
                { id, formData },
                {
                    onSuccess: (data: any) => {
                        setErrMsg('')
                        setFormErrors({})
                        setNewPreviews([])
                        setSuccessMsg(data?.message)
                        if (fileInputRef.current) {
                            fileInputRef.current.value = ''
                            setNewFiles([])
                            setNewPreviews([])
                        }
                    },
                    onError: (error: any) => {
                        if (axios.isAxiosError(error)) {
                            setSuccessMsg('')
                            setFormErrors({})
                            setErrMsg(error.response?.data?.message || error.response?.data?.errors)
                        } else {
                            console.error('An unexpected error occurred.', error)
                        }
                    }
                }
            )
        }
        catch (err: any) {
            if (err instanceof z.ZodError) {
                const errors: { [key: string]: string } = {}
                err.errors.forEach(error => {
                    errors[error.path[0]] = error.message
                });
                setFormErrors(errors)
            }
            else {
                console.error('Unknown error:', err)
            }
        }
    } 
    
    const closeModal = () => {
        setIsModalOpen(false)
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100 py-8 px-6">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Edit Ticket</h1>

                    <div>
                        <div>
                            <Label htmlFor="ticketName" className="text-xs font-medium">
                                Ticket Title
                            </Label>
                            <Input
                                type="text"
                                id="title"
                                name="title"
                                value={ticket.title}
                                onChange={handleChange}
                                required
                            />
                            {formErrors.title && (
                                <p className="text-error-red text-sm">{formErrors.title}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="description" className="text-xs font-medium">
                                Description
                            </Label>
                            <textarea
                                id="description"
                                name="description"
                                value={ticket.description}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            {formErrors.description && (
                                <p className="text-error-red text-sm">{formErrors.description}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="priority" className="text-xs font-medium">
                                Priority
                            </Label>
                            <select
                                id="priority"
                                name="priority"
                                value={ticket.priority}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                            {formErrors.priority && (
                                <p className="text-error-red text-sm">{formErrors.description}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="category" className="text-xs font-medium">
                                Category
                            </Label>
                            <select
                                id="category"
                                name="category"
                                value={ticket.category.name}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {!categoriesLoading ? (
                                    categoriesData?.map((category: any, index: any) => (
                                        <option key={index} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>
                                        Loading categories...
                                    </option>
                                )}
                            </select>
                            {formErrors.category && (
                                <p className="text-error-red text-sm">{formErrors.category}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <Label>Existing Attachments</Label>
                            {existingAttachments?.length > 0 ? (
                                <div className="flex gap-2 flex-wrap">

                                    <button
                                        type="button"
                                        onClick={handleImageClick}
                                        className="text-blue-500"
                                    >
                                        Click here to view attachments
                                    </button>
                                    {isModalOpen && <AttachmentModal urls={existingAttachments} onClose={closeModal} />}

                                </div>
                            ) : (
                                <p>No attachments available.</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="attachments">Upload New Attachments</Label>
                            <input
                                type="file"
                                id="attachments"
                                name="attachments"
                                onChange={handleFileChange}
                                multiple
                                ref={fileInputRef}
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {newFiles.length > 0 && (
                            <div className="mb-4 mt-2 flex gap-2 flex-wrap">

                                {newPreviews.length > 0 && (
                                    <div className="mt-2 flex gap-2 flex-wrap">
                                        {newPreviews.map((src, idx) => (
                                            <img key={idx} src={src} alt={`preview-${idx}`} className="w-24 h-24 object-cover rounded" />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {successMsg && (
                            <p className="text-green-500 text-sm mt-2">{successMsg}</p>
                        )}

                        {errMsg && (
                            <p className="text-red-500 text-sm mt-2">{errMsg}</p>)
                        }

                        <div className="flex gap-4 mt-6">
                            <Button
                                onClick={handleSubmit}
                                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out shadow-lg"
                                disabled={updateTicketPending}
                            >
                                {updateTicketPending ? 'Updating Ticket...' : 'Update Ticket'}
                            </Button>

                            <Link to={`/my-tickets/${ticketData?.ticket?.user?.id}`} className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition duration-300 ease-in-out shadow-lg">
                                Back
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};
