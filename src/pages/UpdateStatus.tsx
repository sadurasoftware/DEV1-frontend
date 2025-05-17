import { Link, useParams } from 'react-router-dom';
import { useFetchTicketById } from '@/hooks/useFetchTicketById';
import { useFetchCategories } from '@/hooks/useFetchCategories'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react';
import { useUpdateTicketStatus } from '@/hooks/useUpdateTicketStatus';
import axios from 'axios';
import { AttachmentModal } from '@/components/AttachmentModal'

export const UpdateStatus = () => {
    const { id } = useParams<{ id?: string }>();
    const { ticketData, isTicketError, ticketError } = useFetchTicketById(id || '');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const { mutate, isPending } = useUpdateTicketStatus();
    const [successMsg, setSuccessMsg] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string>('');
    const [attachmentsUrl, setAttachmentsUrl] = useState<string[]>([])
    const {
        categoriesLoading,
        categoriesData,
    } = useFetchCategories()

    const handleChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setTicket((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    }; 

    const [ticket, setTicket] = useState<any>({
        status: ticketData?.ticket?.status || 'Open',
    });


    const handleImageClick = () => {
        if (ticketData?.ticket?.attachments?.length) {
          const urls = ticketData.ticket.attachments.map((att: { url: any; }) => att.url)
          setAttachmentsUrl(urls)
          setIsModalOpen(true)
        }
      }

    const handleUpdateStatus = () => {
        if (id && ticket) {
            mutate({ id, status: ticket.status }, 
                {
                    onSuccess:(res)=>{
                        setErrMsg('')
                        setSuccessMsg(res?.message)
                    },
                    onError:(err:any)=>{
                        if(axios.isAxiosError(err))
                        {
                            setSuccessMsg('')
                            setErrMsg(err?.response?.data?.message || err?.response?.data?.errors)
                        }

                    }
                }
            )
        }

    }

    useEffect(() => {
        if (ticketData?.ticket) {
            setTicket({
                ...ticketData.ticket,
                status: ticketData.ticket.status,
            });
        }
    }, [ticketData]);

    const closeModal = () => {
        setIsModalOpen(false)
      };


    return (
        <>
            <div className="min-h-screen bg-gray-100 py-8 px-6">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Update status</h1>

                    <div>
                        <div>
                            <Label htmlFor="ticketName" className="text-xs font-medium">
                                Ticket Title
                            </Label>
                            <Input
                                type="text"
                                id="title"
                                name="title"
                                value={ticketData?.ticket?.title || ''}
                                readOnly
                            />
                        </div>
                        <div>
                            <Label htmlFor="description" className="text-xs font-medium">
                                Description
                            </Label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                value={ticketData?.ticket?.description || ''}
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                readOnly
                            />
                        </div>
                        <div>
                            <Label htmlFor="priority" className="text-xs font-medium">
                                Priority
                            </Label>
                            <select
                                id="priority"
                                name="priority"
                                value={ticketData?.ticket?.priority}
                                disabled
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>

                        </div>
                        <div>
                            <Label htmlFor="category" className="text-xs font-medium">
                                Category
                            </Label>
                            <select
                                id="category"
                                name="category"
                                value={ticketData?.ticket?.category.name}
                                disabled
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
                        </div>

                        <div>
                            <Label htmlFor="attachments" className="text-xs font-medium">
                                Attachments
                            </Label>
                            { ticketData?.ticket?.attachments?.length > 0  ? (
                                <div className="flex gap-2 flex-wrap">
             
                                <>
                                    <button
                                    type="button"
                                      onClick={handleImageClick}
                                      className="text-blue-500"
                                    >
                                      Click here to view attachments
                                    </button>
                                    {isModalOpen && <AttachmentModal urls={attachmentsUrl} onClose={closeModal} />}
                                  </>
                              
              
              
                            
                          </div>
                            ) : (
                                <p>No attachments available.</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="status" className="text-xs font-medium">
                                Status
                            </Label>
                            <select
                                id="status"
                                name="status"
                                value={ticket?.status}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Closed">Closed</option>
                                <option value="Pending">Pending</option>
                            </select>

                        </div>

                        {isTicketError && ticketError && (
                            <p className='text-error-red text-center mt-4'>
                                {(ticketError as Error).message}
                            </p>
                        )}

                        {successMsg && (
                            <p className='text-success-green text-center mt-4'>{successMsg}</p>
                        )}
                      
                        {errMsg && (
                            <p className='text-error-red text-center mt-4'>{errMsg}</p>
                            
                        )}


                        <div className='mt-5 text-center'>
                            <button
                                onClick={handleUpdateStatus}
                                className="bg-green-500 text-white px-4 py-2 mx-3 rounded-md hover:bg-green-600 transition duration-200"
                                disabled={isPending}
                            >
                                {isPending ? 'Updating Status...' : 'Update Status'}
                            </button>
                            <Link to="/tickets/1" className="bg-blue-500 text-white px-4 py-2  rounded-md hover:bg-blue-600 transition duration-200">
                                Back
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}